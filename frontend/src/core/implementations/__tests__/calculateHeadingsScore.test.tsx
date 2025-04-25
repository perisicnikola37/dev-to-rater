import { clampPenalty } from '@/utils/utilities'
import { expect, Mock, test, vi } from 'vitest'
import { HeadingsPenaltyCalculator } from '../calculateHeadingsScore'

vi.mock('@/utils/utilities', () => ({
  clampPenalty: vi.fn(),
}))

test('should return penalty of 1 if headings array is empty', () => {
  ;(clampPenalty as Mock).mockReturnValue(1)

  const calculator = new HeadingsPenaltyCalculator()
  const result = calculator.calculate([])

  expect(result).toBe(1)
  expect(clampPenalty).toHaveBeenCalledWith(1)
})

test('should return penalty of 0 if headings array has elements', () => {
  ;(clampPenalty as Mock).mockReturnValue(0)

  const calculator = new HeadingsPenaltyCalculator()
  const result = calculator.calculate(['Heading 1', 'Heading 2'])

  expect(result).toBe(0)
  expect(clampPenalty).toHaveBeenCalledWith(0)
})

test('should apply penalty rule if headings array is empty and return 1 after clamping', () => {
  ;(clampPenalty as Mock).mockReturnValue(1)

  const calculator = new HeadingsPenaltyCalculator()
  const result = calculator.calculate([])

  expect(result).toBe(1)
  expect(clampPenalty).toHaveBeenCalledWith(1)
})

test('should not apply penalty rule if headings array is not empty', () => {
  ;(clampPenalty as Mock).mockReturnValue(0)

  const calculator = new HeadingsPenaltyCalculator()
  const result = calculator.calculate(['Heading 1'])

  expect(result).toBe(0)
  expect(clampPenalty).toHaveBeenCalledWith(0)
})
