import { clampPenalty } from '../../utils/globals'

export type PenaltyCalculationFunction2 = (sentences: string[]) => {
  penalty: number
  exceededSentences: string[]
}

export const WORDS_LIMIT_PER_SENTENCE = 20

export const calculateSentencesScore: PenaltyCalculationFunction2 = (
  sentences: string[],
) => {
  let penalty = 0

  const exceededSentences: string[] = []

  const rules = [
    {
      condition: sentences.length === 0,
      apply: () => {
        penalty += 1
      },
    },
    {
      condition: true,
      apply: () => {
        sentences.forEach((sentence) => {
          const wordCount = sentence.split(/\s+/).filter(Boolean).length

          if (wordCount > WORDS_LIMIT_PER_SENTENCE) {
            const excessWords = wordCount - WORDS_LIMIT_PER_SENTENCE
            penalty += Math.round(excessWords * 0.025 * 100) / 100

            exceededSentences.push(sentence)
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

  return {
    // Clamp the penalty in range between 0 and ${POST_MAX_SCORE}
    penalty: clampPenalty(penalty),
    exceededSentences,
  }
}
