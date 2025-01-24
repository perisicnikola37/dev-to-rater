import { calculateParagraphScore } from '../core/paragraphLength'

export const calculateScore = (paragraphs: string[]): number => {
  let score = 10

  const paragraphPenalty = calculateParagraphScore(paragraphs)
  score -= paragraphPenalty

  score = Math.max(0, Math.min(score, 10))

  return score
}
