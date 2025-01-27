export type FinalResponse = {
  totalScore: number
  headingsPenalty: number
  sentencesPenalty: number
  charactersPenalty: number
  headings: string[]
  sentences: string[]
  links: { href: string; text: string }[]
  exceeded: {
    exceededSentences: string[]
  }
}
