import Content from '../interfaces/Content'
import { calculateScore } from './calculator'

export const parseHTMLContent = (htmlString: string): Content => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  const articleBody = doc.querySelector('.crayons-article__body')

  if (!articleBody) {
    throw new Error('Article body not found in the HTML.')
  }

  const headings = Array.from(articleBody.querySelectorAll('h2'))
    .map((h2) => h2.textContent?.trim() || '')
    .filter((text) => text !== '')

  const paragraphs = Array.from(articleBody.querySelectorAll('p'))
    .map((p) => p.textContent?.trim() || '')
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
  const totalParagraphChars = paragraphs.reduce(
    (acc, paragraph) => acc + paragraph.length,
    0,
  )
  const totalLinkChars = links.reduce((acc, link) => acc + link.text.length, 0)

  const charactersCount =
    totalHeadingChars + totalParagraphChars + totalLinkChars

  const score = calculateScore(headings, paragraphs, charactersCount)

  return { headings, paragraphs, links, score }
}
