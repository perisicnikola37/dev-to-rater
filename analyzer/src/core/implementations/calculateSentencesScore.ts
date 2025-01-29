import { clampPenalty } from '../../utils/utilities'
import { PenaltyCalculator } from '../interfaces/PenaltyCalculator'

export const WORDS_LIMIT_PER_SENTENCE = 25

export class SentencesPenaltyCalculator implements PenaltyCalculator {
  calculate(sentences: string[]): {
    penalty: number
    exceededSentences: string[]
  } {
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

    return { penalty: clampPenalty(penalty), exceededSentences }
  }
}
