import { clampPenalty } from '../../utils/globals'
import { PenaltyCalculationFunction } from '../interface/PenaltyCalculationFunction'

export const calculateHeadingsScore: PenaltyCalculationFunction<string[]> = (
  headings,
) => {
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

  // Clamp the penalty in range between 0 and ${POST_MAX_SCORE}
  return clampPenalty(penalty)
}
