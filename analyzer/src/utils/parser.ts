import Content from '../interfaces/Content'
import { calculateScore } from './calculator'
import { ErrorMessages } from './messages'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const parseHTMLContent = (htmlString: any): Content => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString.data, 'text/html')

  const articleBody = doc.querySelector('.crayons-article__body')

  if (!articleBody) {
    throw new Error(ErrorMessages.PARSE_ERROR)
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

  const score = calculateScore(headings, sentences, totalPostCharactersCount)

  return { headings, sentences, links, score }
}
