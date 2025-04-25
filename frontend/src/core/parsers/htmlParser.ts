import { AxiosResponse } from 'axios'
import {
  AVERAGE_READING_SPEED,
  BASE_URLS,
  DEV_TO_ARTICLE_BODY_CLASS,
} from '@/utils/constants/configuration'
import { ErrorMessages } from '@/utils/constants/messages'
import { HttpMethods } from '@/utils/constants/globalWeb'
import createFetchInstance from '@/utils/instance/instance'
import { FinalResponse } from '../types/FinalResponse'
import { ReactionMap } from '../types/ReactionMap'
import { RepeatingWordsPenaltyCalculator } from '../implementations/calculateRepeatingWordsScore'
import { wordReplacements } from '../data/word_replacements.json'
import { replaceRepeatedWords } from '../helpers/transformer'
import { calculateScore } from '../helpers/calculator'

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
        let listItemContent = li.textContent?.trim() || ''

        // Handle <code> inside list items
        const codeElements = li.querySelectorAll('code')
        codeElements.forEach((codeElement) => {
          const codeText = codeElement.textContent?.trim() || ''
          listItemContent = listItemContent.replace(codeText, `\`${codeText}\``)
        })

        markdown += `${prefix}${listItemContent}\n`

        const nestedList = li.querySelector('ul, ol')
        if (nestedList) {
          processList(nestedList, depth + 1)
        }
      })
  }

  const processOrderedList = (
    list: { querySelectorAll: (arg0: string) => NodeListOf<HTMLLIElement> },
    depth = 0,
  ) => {
    let index = 1 // Start the index for the ordered list
    list.querySelectorAll(':scope > li').forEach((li: HTMLLIElement) => {
      const link = li.querySelector('a')
      const linkText = link ? link.textContent?.trim() : ''
      const linkHref = link ? link.getAttribute('href') : ''

      // We only add space if depth > 0 and if it's not the first item
      const indentation = depth > 0 ? ' '.repeat(depth) : ''

      if (linkText && linkHref) {
        markdown += `&nbsp;${indentation}${index}. [${linkText}](${linkHref.trim()})\n`
        index++
      }

      // Handle nested lists recursively
      const nestedList = li.querySelector('ul, ol')
      if (nestedList) {
        processOrderedList(nestedList, depth + 1)
      }
    })
  }

  articleBody.childNodes.forEach((node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      markdown += node.textContent?.trim() + ' '
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      switch ((node as Element).tagName.toLowerCase()) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6': {
          const level = parseInt((node as Element).tagName.charAt(1))
          let textContent = node.textContent?.trim() || ''

          // Detect and mark <code> inside headings
          const codeElements = (node as Element).querySelectorAll('code')
          codeElements.forEach((codeElement) => {
            const codeText = codeElement.textContent?.trim() || ''
            textContent = textContent.replace(codeText, `\`${codeText}\``)
          })

          markdown += `\n${'#'.repeat(level)} ${textContent}\n\n`

          break
        }

        case 'div': {
          const divElement = node as Element

          if (divElement.classList.contains('highlight')) {
            const preBlock = divElement.querySelector('pre')

            if (preBlock) {
              const languageMatch = preBlock.className.match('highlight')
              const language = languageMatch
                ? languageMatch?.input?.split(' ')[1] || 'plaintext'
                : 'plaintext'

              const preContent = preBlock.textContent || ''

              markdown += `\`\`\`${language}\n${preContent}\`\`\``
            }
          }
          break
        }

        case 'strong': {
          const strongText = node.textContent?.trim() || ''
          markdown += ` **${strongText}** `
          break
        }

        case 'b': {
          const boldText = node.textContent?.trim() || ''
          markdown += ` **${boldText}** `
          break
        }

        case 'em':
        case 'i': {
          const italicText = node.textContent?.trim() || ''
          markdown += ` *${italicText}* `
          break
        }

        case 'pre': {
          const codeBlock = (node as Element).querySelector('code')
          if (codeBlock) {
            const languageClass = (node as Element).className.match(
              /(?:language|lang|highlight)-(\w+)/,
            )

            const language = languageClass ? languageClass[1] : 'plaintext'
            const codeText = codeBlock.textContent
              ? codeBlock.textContent.trim()
              : ''
            markdown += `\n\n\`\`\`${language}\n${codeText}\n\`\`\`\n\n`
          } else {
            markdown += `\n\n\`\`\`\n${(node as Element).textContent?.trim()}\n\`\`\`\n\n`
          }
          break
        }

        case 'p': {
          const paragraphElement = node as Element
          const paragraphContent = paragraphElement.innerHTML
            // Handle inline <code> inside <p> tag
            .replace(/<code>(.*?)<\/code>/gi, (_match, codeContent) => {
              return `\` ${codeContent} \``
            })
            // remove <br> nested inside <p>
            .replace(/<br\s*\/?>/gi, '\n')
            .trim()

          markdown += `\n${paragraphContent}\n\n`
          break
        }

        case 'ul': {
          processList(
            node as unknown as {
              querySelectorAll: (arg0: string) => NodeListOf<HTMLLIElement>
            },
          )
          markdown += `\n`
          break
        }

        case 'ol': {
          processOrderedList(
            node as unknown as {
              querySelectorAll: (arg0: string) => NodeListOf<HTMLLIElement>
            },
          )
          break
        }

        case 'hr': {
          markdown += `\n---\n\n`
          break
        }

        case 'blockquote': {
          const blockquoteText = node.textContent ? node.textContent.trim() : ''
          markdown += `\n> ${blockquoteText}\n\n`
          break
        }

        case 'a': {
          const linkText = node.textContent ? node.textContent.trim() : 'Link'
          markdown += ` [${linkText}](${(node as HTMLAnchorElement).href.trim()}) `
          break
        }

        case 'img': {
          const altText = (node as HTMLImageElement).alt || 'Image'
          const src = (node as HTMLImageElement).src.trim()
          markdown += `\n\n![${altText}](${src})\n\n`
          break
        }

        default: {
          markdown += node.textContent ? node.textContent.trim() + ' ' : ''
          break
        }
      }
    }
  })

  return markdown.trim()
}

export const parseHTMLContent = async (
  postUrl: string,
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

  const { markdown: updatedMarkdown, changes: changedWords } =
    replaceRepeatedWords(markdownContent, repeatedWords, wordReplacements)

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
  finalResponse.postUrl = postUrl
  finalResponse.markdown = updatedMarkdown
  finalResponse.changedWords = changedWords

  return finalResponse
}
