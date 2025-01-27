import { clampPenalty } from '../../utils/globals'
import { PenaltyCalculationFunction } from '../interface/PenaltyCalculationFunction'

export const calculateSentencesScore: PenaltyCalculationFunction<string[]> = (
  sentences,
) => {
  let penalty = 0
  const WORDS_LIMIT_PER_SENTENCE = 20

  const rules = [
    {
      condition: sentences.length === 0,
      apply: () => {
        penalty += 1
      },
    },
    {
      condition: true, // Always run this rule for each sentence
      apply: () => {
        sentences.forEach((sentence) => {
          const wordCount = sentence.split(/\s+/).filter(Boolean).length

          // If the sentence has more than WORDS_LIMIT words, subtract points
          if (wordCount > WORDS_LIMIT_PER_SENTENCE) {
            const excessWords = wordCount - WORDS_LIMIT_PER_SENTENCE
            penalty += Math.round(excessWords * 0.025 * 100) / 100
          }
        })
      },
    },
  ]

  rules.forEach((rule) => {
    if (rule.condition) {
      rule.apply()
    }
  })

  // Clamp the penalty in range between 0 and ${POST_MAX_SCORE}
  return clampPenalty(penalty)
}
