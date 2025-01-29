import { clampPenalty } from '@/utils/utilities'
import { PenaltyCalculator } from '../interfaces/PenaltyCalculator'

export class ReadingTimePenaltyCalculator implements PenaltyCalculator<number> {
  calculate(readingTime: number): number {
    let penalty = 0

    const rules = [
      {
        condition: readingTime >= 0 && readingTime <= 2,
        apply: () => {
          penalty += 0.2
        },
      },
      {
        condition: readingTime >= 3 && readingTime <= 4,
        apply: () => {
          penalty = 0.1
        },
      },
      {
        condition: readingTime > 4 && readingTime <= 12,
        apply: () => {
          penalty = 0
        },
      },
      {
        condition: readingTime > 12,
        apply: () => {
          penalty = 1.2
        },
      },
    ]
    rules.forEach((rule) => rule.condition && rule.apply())

    // Clamp the penalty in range between 0 and ${POST_MAX_SCORE}
    return clampPenalty(penalty)
  }
}
