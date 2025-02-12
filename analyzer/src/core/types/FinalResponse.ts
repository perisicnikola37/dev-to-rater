import { ReactionMap } from './ReactionMap'

export type FinalResponse = {
  id?: number
  title?: string
  imageUrl?: string
  postUrl?: string
  totalScore: number
  headingsPenalty: number
  sentencesPenalty: number
  charactersPenalty: number
  wordsPenalty: number
  headings: string[]
  sentences: string[]
  words: string[]
  links: { href: string; text: string }[]
  exceeded: {
    exceededSentences: string[]
    repeatedWords: { word: string; count: number }[]
  }
  reactions: ReactionMap
  readingTime: number
}
