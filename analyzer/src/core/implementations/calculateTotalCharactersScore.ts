import { clampPenalty } from '../../utils/globals'
import { PenaltyCalculationFunction } from '../interfaces/PenaltyCalculationFunction'

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
      // Applies a penalty if the reading time exceeds 10 minutes calculated by average (300 WPM) speed
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
