import { clampPenalty } from '../../utils/utilities'
import { PenaltyCalculator } from '../interfaces/PenaltyCalculator'

export class HeadingsPenaltyCalculator implements PenaltyCalculator {
  calculate(headings: string[]): number {
    let penalty = 0
    const rules = [
      {
        condition: headings.length === 0,
        apply: () => {
          penalty += 1
        },
      },
    ]
    rules.forEach((rule) => {
      if (rule.condition) {
        rule.apply()
      }
    })

    return clampPenalty(penalty)
  }
}
