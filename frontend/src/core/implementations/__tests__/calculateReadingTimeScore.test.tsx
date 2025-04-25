import { clampPenalty } from '@/utils/utilities'
import { expect, Mock, test, vi } from 'vitest'
import { ReadingTimePenaltyCalculator } from '../calculateReadingTimeScore'

vi.mock('@/utils/utilities', () => ({
  clampPenalty: vi.fn(),
}))

test('should apply 0.2 penalty if reading time is between 0 and 2 minutes', () => {
  ;(clampPenalty as Mock).mockReturnValue(0.2)

  const calculator = new ReadingTimePenaltyCalculator()
  const result = calculator.calculate(1)

  expect(result).toBe(0.2)
  expect(clampPenalty).toHaveBeenCalledWith(0.2)
})

test('should apply 0.1 penalty if reading time is between 3 and 4 minutes', () => {
  ;(clampPenalty as Mock).mockReturnValue(0.1)

  const calculator = new ReadingTimePenaltyCalculator()
  const result = calculator.calculate(3.5)

  expect(result).toBe(0.1)
  expect(clampPenalty).toHaveBeenCalledWith(0.1)
})

test('should apply 0 penalty if reading time is between 5 and 12 minutes', () => {
  ;(clampPenalty as Mock).mockReturnValue(0)

  const calculator = new ReadingTimePenaltyCalculator()
  const result = calculator.calculate(6)

  expect(result).toBe(0)
  expect(clampPenalty).toHaveBeenCalledWith(0)
})

test('should apply 1.2 penalty if reading time is greater than 12 minutes', () => {
  ;(clampPenalty as Mock).mockReturnValue(1.2)

  const calculator = new ReadingTimePenaltyCalculator()
  const result = calculator.calculate(15)

  expect(result).toBe(1.2)
  expect(clampPenalty).toHaveBeenCalledWith(1.2)
})

test('should return 0 penalty if the reading time is exactly 0 minutes', () => {
  ;(clampPenalty as Mock).mockReturnValue(0)

  const calculator = new ReadingTimePenaltyCalculator()
  const result = calculator.calculate(0)

  expect(result).toBe(0)
  expect(clampPenalty).toHaveBeenCalledWith(0)
})
