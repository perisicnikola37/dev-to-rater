import { clampPenalty } from '../../utils/globals'
import { PenaltyCalculationFunction } from '../interface/PenaltyCalculationFunction'

export const calculateTotalCharactersCountScore: PenaltyCalculationFunction<
  number
> = (totalPostCharactersCount) => {
  let penalty = 0

  const rules = [
    {
      condition: totalPostCharactersCount < 750,
      apply: () => {
        penalty += 1
      },
    },
    {
      condition: totalPostCharactersCount > 10000,
      apply: () => {
        penalty += Math.round((totalPostCharactersCount - 10000) * 0.003)
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
