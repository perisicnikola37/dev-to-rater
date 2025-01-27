import { Link } from './Link'

export default interface Content {
  headings: string[]
  sentences: string[]
  links: Link[]
  score: GLfloat
}
