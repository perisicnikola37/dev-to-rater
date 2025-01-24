import { calculateHeadingStructureScore } from '../core/calculateHeadingStructureScore'
import { calculateParagraphScore } from '../core/calculateParagraphLengthScore'

export const calculateScore = (
  headings: string[],
  paragraphs: string[],
): number => {
  let score = 10

  const paragraphPenalty = calculateParagraphScore(paragraphs)
  score -= paragraphPenalty

  const headingPenalty = calculateHeadingStructureScore(headings)
  score -= headingPenalty

  score = Math.max(0, Math.min(score, 10))

  return score
}
