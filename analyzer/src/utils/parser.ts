import Content from '../interfaces/Content'

export const parseHTMLContent = (htmlString: string): Content => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  const articleBody = doc.querySelector('.crayons-article__body')

  if (!articleBody) {
    throw new Error('Article body not found in the HTML.')
  }

  const headings = Array.from(articleBody.querySelectorAll('h2')).map(
    (h2) => h2.textContent?.trim() || '',
  )

  const paragraphs = Array.from(articleBody.querySelectorAll('p')).map(
    (p) => p.textContent?.trim() || '',
  )

  const images = Array.from(articleBody.querySelectorAll('img')).map((img) => ({
    src: img.src,
    alt: img.alt || '',
    width: img.width || 0,
    height: img.height || 0,
  }))

  const links = Array.from(articleBody.querySelectorAll('a')).map((a) => ({
    href: a.href,
    text: a.textContent?.trim() || '',
  }))

  return { headings, paragraphs, images, links }
}
