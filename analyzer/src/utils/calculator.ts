import { calculateHeadingsScore } from '../core/implementation/calculateHeadingsScore'
import { calculateSentencesScore } from '../core/implementation/calculateSentencesScore'
import { calculateTotalCharactersCountScore } from '../core/implementation/calculateTotalCharactersScore'
import { POST_MAX_SCORE } from './constants'

export const calculateScore = (
  headings: string[],
  sentences: string[],
  totalPostCharactersCount: number,
): number => {
  let max_score = POST_MAX_SCORE

  // Calculate heading structure score
  const headingsPenalty = calculateHeadingsScore(headings)
  // Calculate sentences score
  const sentencesPenalty = calculateSentencesScore(sentences)
  // Calculate characters count score
  const charactersPenalty = calculateTotalCharactersCountScore(
    totalPostCharactersCount,
  )

  console.log('Penalties:', {
    headingsPenalty,
    sentencesPenalty,
    charactersPenalty,
  })

  max_score -= headingsPenalty + sentencesPenalty + charactersPenalty

  max_score = Math.max(0, Math.min(max_score, 10))

  return max_score
}
