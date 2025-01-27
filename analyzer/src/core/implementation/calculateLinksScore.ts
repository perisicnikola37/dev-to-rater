import { clampPenalty } from '../../utils/globals'
import { PenaltyCalculationFunction } from '../interface/PenaltyCalculationFunction'

export const calculateLinksScore: PenaltyCalculationFunction<
  { href: string; text: string }[]
> = (links: { href: string; text: string }[]) => {
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

  // Clamp the penalty in range between 0 and ${POST_MAX_SCORE}
  return clampPenalty(penalty)
}
