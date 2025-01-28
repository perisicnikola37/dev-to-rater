import { POST_MAX_SCORE } from '../../utils/constants/configuration'
import { calculateHeadingsScore } from '../implementations/calculateHeadingsScore'
import { calculateLinksScore } from '../implementations/calculateLinksScore'
import { calculateRepeatingWordsScore } from '../implementations/calculateRepeatingWordsScore'
import { calculateSentencesScore } from '../implementations/calculateSentencesScore'
import { calculateTotalCharactersCountScore } from '../implementations/calculateTotalCharactersScore'
import { FinalResponse } from '../types/FinalResponse'

export const calculateScore = (
  headings: string[],
  sentences: string[],
  words: string[],
  totalPostCharactersCount: number,
  links: { href: string; text: string }[],
): FinalResponse => {
  let max_score = POST_MAX_SCORE

  // Calculate heading structure score
  const headingsPenalty = calculateHeadingsScore(headings)
  // Calculate sentences score
  const sentencesPenalty = calculateSentencesScore(sentences)
  // Calculate characters count score
  const charactersPenalty = calculateTotalCharactersCountScore(
    totalPostCharactersCount,
  )
  // Calculate links score
  const linksPenalty = calculateLinksScore(links)
  // Calculate words score
  const wordsPenalty = calculateRepeatingWordsScore(words)

  console.log('Headings Penalty:', headingsPenalty)
  console.log('Sentences Penalty:', sentencesPenalty.penalty)
  console.log('Characters Penalty:', charactersPenalty)
  console.log('Links Penalty:', linksPenalty)
  console.log('Words Penalty:', wordsPenalty.penalty)
  console.log('Repeated Words:', wordsPenalty.repeatedWords)

  max_score -=
    headingsPenalty +
    sentencesPenalty.penalty +
    wordsPenalty.penalty +
    charactersPenalty +
    linksPenalty
  max_score = Math.max(0, Math.min(max_score, 10))

  return {
    totalScore: max_score,
    headingsPenalty,
    sentencesPenalty: sentencesPenalty.penalty,
    wordsPenalty: wordsPenalty.penalty,
    charactersPenalty,
    headings,
    sentences,
    words,
    links: links,
    exceeded: {
      exceededSentences: sentencesPenalty.exceededSentences || [],
      repeatedWords: wordsPenalty.repeatedWords || [],
    },
  }
}
