import { DEV_TO_ARTICLE_BODY_CLASS } from '../../utils/constants/configuration'
import { ErrorMessages } from '../../utils/constants/messages'
import { FinalResponse } from '../types/FinalResponse'
import { calculateScore } from './calculator'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const parseHTMLContent = (htmlString: any): FinalResponse => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString.data, 'text/html')

  // TODO: Currently, only DEV.to articles are supported. Change this as needed.
  const articleBody = doc.querySelector(DEV_TO_ARTICLE_BODY_CLASS)

  if (!articleBody) {
    throw new Error(ErrorMessages.ParseError)
  }
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

  const finalResponse: FinalResponse = calculateScore(
    headings,
    sentences,
    words,
    totalPostCharactersCount,
    links,
  )

  return finalResponse
}
