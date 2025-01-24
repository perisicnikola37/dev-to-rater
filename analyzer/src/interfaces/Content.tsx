import { Link } from './Link'

export default interface Content {
  headings: string[]
  paragraphs: string[]
  links: Link[]
  score: GLfloat
}
