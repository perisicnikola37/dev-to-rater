import { clampPenalty } from '../../utils/utilities'
import { PenaltyCalculator } from '../interfaces/PenaltyCalculator'

export class LinksPenaltyCalculator implements PenaltyCalculator {
  calculate(links: { href: string; text: string }[]): number {
    let penalty = 0
    const rules = [
      {
        condition: links.length === 0,
        apply: () => {
          penalty += 0.2
        },
      },
      {
        condition: links.length > 20,
        apply: () => {
          penalty += 0.15
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
