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

  const images = Array.from(articleBody.querySelectorAll('img'))
    .map((img) => ({
      src: img.src,
      alt: img.alt || '',
      width: img.width || 0,
      height: img.height || 0,
    }))
    .filter((img) => img.src !== '')

  const links = Array.from(articleBody.querySelectorAll('a'))
    .map((a) => ({
      href: a.href,
      text: a.textContent?.trim() || 'No text',
    }))
    .filter((link) => link.text !== 'No text')

  const score = calculateScore(headings, paragraphs, images, links)

  return { headings, paragraphs, images, links, score }
}
