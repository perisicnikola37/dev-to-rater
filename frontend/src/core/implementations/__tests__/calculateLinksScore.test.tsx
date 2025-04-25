import { clampPenalty } from '@/utils/utilities'
import { expect, Mock, test, vi } from 'vitest'
import { LinksPenaltyCalculator } from '../calculateLinksScore'

vi.mock('@/utils/utilities', () => ({
  clampPenalty: vi.fn(),
}))

test('should apply 0.2 penalty if no links are present', () => {
  ;(clampPenalty as Mock).mockReturnValue(0.2)

  const calculator = new LinksPenaltyCalculator()
  const result = calculator.calculate([])

  expect(result).toBe(0.2)
  expect(clampPenalty).toHaveBeenCalledWith(0.2)
})

test('should apply 0.15 penalty if more than 20 links are present', () => {
  ;(clampPenalty as Mock).mockReturnValue(0.15)

  const calculator = new LinksPenaltyCalculator()
  const result = calculator.calculate(
    new Array(21).fill({ href: '', text: '' }),
  )

  expect(result).toBe(0.15)
  expect(clampPenalty).toHaveBeenCalledWith(0.15)
})

test('should return 0 penalty if links count is between 1 and 20', () => {
  ;(clampPenalty as Mock).mockReturnValue(0)

  const calculator = new LinksPenaltyCalculator()
  const result = calculator.calculate(
    new Array(10).fill({ href: '', text: '' }),
  )

  expect(result).toBe(0)
  expect(clampPenalty).toHaveBeenCalledWith(0)
})
