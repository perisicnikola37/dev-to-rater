import { AxiosResponse } from 'axios'
import {
  AVERAGE_READING_SPEED,
  DEV_TO_ARTICLE_BODY_CLASS,
  DEV_TO_URL,
} from '@/utils/constants/configuration'
import { ErrorMessages } from '@/utils/constants/messages'
import { HttpMethods } from '@/utils/constants/globalWeb'
import createFetchInstance from '@/utils/instance/instance'
import { calculateScore } from './calculator'
import { FinalResponse } from '../types/FinalResponse'
import { ReactionMap } from '../types/ReactionMap'

export const parseHTMLContent = async (
  htmlString: AxiosResponse,
): Promise<FinalResponse> => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString.data, 'text/html')

  // TODO: Currently, only DEV.to articles are supported. Change this as needed.
  const articleBody = doc.querySelector(DEV_TO_ARTICLE_BODY_CLASS)

  if (!articleBody) {
    throw new Error(ErrorMessages.ParseError)
  }

  const articleId = parseInt(
    doc.querySelector('article')?.getAttribute('data-article-id') || '0',
    10,
  )

  // Fetch reactions data
  const { instance } = createFetchInstance()

  let reactionData: ReactionMap = { article_reaction_counts: [] }
  try {
    const reactionResponse: AxiosResponse<ReactionMap> = await instance(
      `${DEV_TO_URL}/reactions?article_id=${articleId}`,
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

  // Process content
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

  const links = Array.from(articleBody.querySelectorAll('a'))
    .map((a) => ({
      href: a.href,
      text: a.textContent?.trim() || 'No text',
    }))
    .filter((link) => link.text !== 'No text')

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
    articleId,
    headings,
    sentences,
    words,
    totalPostCharactersCount,
    links,
    reactionData,
    readingTime,
  )

  return finalResponse
}
