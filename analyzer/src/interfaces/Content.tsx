import { Image } from './Image'
import { Link } from './Link'

export default interface Content {
  headings: string[]
  paragraphs: string[]
  images: Image[]
  links: Link[]
}
