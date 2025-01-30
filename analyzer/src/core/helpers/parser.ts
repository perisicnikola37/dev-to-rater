import { AxiosResponse } from 'axios'
import {
  AVERAGE_READING_SPEED,
  BASE_URLS,
  DEV_TO_ARTICLE_BODY_CLASS,
} from '@/utils/constants/configuration'
import { ErrorMessages } from '@/utils/constants/messages'
import { HttpMethods } from '@/utils/constants/globalWeb'
import createFetchInstance from '@/utils/instance/instance'
import { calculateScore } from './calculator'
import { FinalResponse } from '../types/FinalResponse'
import { ReactionMap } from '../types/ReactionMap'
import { RepeatingWordsPenaltyCalculator } from '../implementations/calculateRepeatingWordsScore'

const convertToMarkdown = (articleBody: Element) => {
  let markdown = ''

  const processList = (
    list: { querySelectorAll: (arg0: string) => NodeListOf<HTMLLIElement> },
    depth = 0,
  ) => {
    list
      .querySelectorAll(':scope > li')
      .forEach((li: HTMLLIElement, index: number) => {
        const prefix = ' '.repeat(depth) + (index === 0 ? '' : ' ') + '- '
        markdown += `${prefix}${li.textContent?.trim() || ''}\n`

        const nestedList = li.querySelector('ul, ol')
        if (nestedList) {
          processList(nestedList, depth + 1)
        }
      })
  }

  articleBody.childNodes.forEach((node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent) {
        markdown += node.textContent.trim() + ' '
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      switch ((node as Element).tagName.toLowerCase()) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6': {
          const level = parseInt((node as Element).tagName.charAt(1))
          const textContent = node.textContent?.trim() || ''
          markdown += `\n${'#'.repeat(level)} ${textContent}\n\n`
          break
        }

        case 'strong': {
          const strongText = node.textContent?.trim() || ''
          markdown += `**${strongText}**`
          break
        }

        case 'b': {
          const boldText = node.textContent?.trim() || ''
          markdown += `**${boldText}**`
          break
        }

        case 'em':
        case 'i': {
          const italicText = node.textContent?.trim() || ''
          markdown += `*${italicText}*`
          break
        }

        case 'code': {
          if (node.parentElement && node.parentElement.tagName !== 'PRE') {
            markdown += `\`${node.textContent?.trim() || ''}\``
          }
          break
        }

        case 'pre': {
          const codeBlock = (node as Element).querySelector('code')
          if (codeBlock) {
            const languageClass = (node as Element).className.match(
              /language-(\w+)/,
            )
            const language = languageClass ? languageClass[1] : ''
            const codeText = codeBlock.textContent
              ? codeBlock.textContent.trim()
              : ''
            markdown += `\n\`\`\`${language}\n${codeText}\n\`\`\`\n\n`
          }
          break
        }

        case 'p': {
          markdown += `\n${(node as Element).innerHTML.trim()}\n\n`
          break
        }

        case 'ul':
        case 'ol': {
          processList(
            node as unknown as {
              querySelectorAll: (arg0: string) => NodeListOf<HTMLLIElement>
            },
          )
          markdown += `\n`
          break
        }

        case 'hr': {
          markdown += `\n---\n\n`
          break
        }

        case 'blockquote': {
          const blockquoteText = node.textContent ? node.textContent.trim() : ''
          markdown += `> ${blockquoteText}\n\n`
          break
        }

        case 'a': {
          const linkText = node.textContent ? node.textContent.trim() : 'Link'
          markdown += `[${linkText}](${(node as HTMLAnchorElement).href.trim()})`
          break
        }

        case 'img': {
          const altText = (node as HTMLImageElement).alt || 'Image'
          const src = (node as HTMLImageElement).src.trim()
          markdown += `![${altText}](${src})\n\n`
          break
        }

        default: {
          markdown += node.textContent ? node.textContent.trim() : ''
          break
        }
      }
    }
  })

  return markdown.trim()
}

const replaceRepeatedWords = (
  markdown: string,
  repeatedWords: { word: string; count: number }[],
  wordReplacements2: { word: string; replacement: string }[],
): { markdown: string; wordReplacements: { [key: string]: string } } => {
  const wordReplacements: { [key: string]: string } = {}

  repeatedWords.forEach(({ word }) => {
    const replacement = word.toUpperCase()
    wordReplacements[word] = replacement

    // Replace the word in the markdown
    const wordRegex = new RegExp(`\\b${word}\\b`, 'g')
    markdown = markdown.replace(wordRegex, replacement)
  })

  wordReplacements2.forEach(({ word, replacement }) => {
    wordReplacements[word] = replacement

    const wordRegex = new RegExp(`\\b${word}\\b`, 'g')
    markdown = markdown.replace(wordRegex, replacement)
  })

  return { markdown, wordReplacements }
}

export const parseHTMLContent = async (
  htmlString: AxiosResponse,
): Promise<FinalResponse> => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString.data, 'text/html')

  const articleBody = doc.querySelector(DEV_TO_ARTICLE_BODY_CLASS)
  if (!articleBody) {
    throw new Error(ErrorMessages.ParseError)
  }

  const markdownContent = convertToMarkdown(articleBody)

  const articleId = parseInt(
    doc.querySelector('article')?.getAttribute('data-article-id') || '0',
    10,
  )

  // Extract title and image URL
  const titleElement = doc.querySelector('meta[property="og:title"]')
  const title = titleElement ? titleElement.getAttribute('content') || '' : ''

  const imageElement = doc.querySelector('.crayons-article__cover__image')
  const imageUrl = imageElement ? imageElement.getAttribute('src') || '' : ''

  // Fetch reactions data
  const { instance } = createFetchInstance()
  let reactionData: ReactionMap = { article_reaction_counts: [] }
  try {
    const reactionResponse: AxiosResponse<ReactionMap> = await instance(
      `${BASE_URLS.DEV_TO}/reactions?article_id=${articleId}`,
      HttpMethods.GET,
    )
    reactionData = reactionResponse.data
  } catch (reactionError) {
    console.error(
      `Failed to fetch reactions: ${(reactionError as Error).message}`,
    )
  }

  const totalReactions = reactionData.article_reaction_counts.reduce(
    (acc, reaction) => acc + reaction.count,
    0,
  )

  // Appending custom calculated percentage
  reactionData.article_reaction_counts =
    reactionData.article_reaction_counts.map((reaction) => ({
      ...reaction,
      percentage:
        totalReactions > 0
          ? Math.round((reaction.count / totalReactions) * 100)
          : 0,
    }))

  // Extract content (headings, sentences, words, links)
  const headings = Array.from(articleBody.querySelectorAll('h2'))
    .map((h2) => h2.textContent?.trim() || '')
    .filter((text) => text !== '')

  const sentences = Array.from(articleBody.querySelectorAll('p'))
    .flatMap((p) =>
      (p.textContent?.trim() || '').split(
        /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/,
      ),
    )
    .map((sentence) => sentence.trim())
    .filter((text) => text !== '')

  const words = sentences
    .flatMap((sentence) => sentence.split(/\s+/))
    .filter((word) => word !== '')

  const penaltyCalculator = new RepeatingWordsPenaltyCalculator()
  const { repeatedWords } = penaltyCalculator.calculate(words)

  console.log(repeatedWords)
  const wordReplacements2 = [
    { word: 'Project', replacement: 'Project 2' },
    { word: 'GitLab', replacement: 'GitLab 2' },
    { word: 'javascript', replacement: 'JavaScript' },
  ]

  const { markdown: updatedMarkdown } = replaceRepeatedWords(
    markdownContent,
    repeatedWords,
    wordReplacements2,
  )

  const links = Array.from(articleBody.querySelectorAll('a'))
    .map((a) => ({
      href: a.href,
      text: a.textContent?.trim() || 'No text',
    }))
    .filter((link) => link.text !== 'No text')

  // Calculate character counts
  const totalHeadingChars = headings.reduce(
    (acc, heading) => acc + heading.length,
    0,
  )
  const totalParagraphChars = sentences.reduce(
    (acc, paragraph) => acc + paragraph.length,
    0,
  )
  const totalLinkChars = links.reduce((acc, link) => acc + link.text.length, 0)

  const totalPostCharactersCount =
    totalHeadingChars + totalParagraphChars + totalLinkChars
  const wordsCount = words.length
  const readingTime = Math.round(wordsCount / AVERAGE_READING_SPEED)

  const finalResponse: FinalResponse = calculateScore(
    headings,
    sentences,
    words,
    totalPostCharactersCount,
    links,
    reactionData,
    readingTime,
  )

  finalResponse.title = title
  finalResponse.imageUrl = imageUrl
  finalResponse.markdown = updatedMarkdown

  return finalResponse
}
