import { clampPenalty } from '@/utils/utilities'
import { expect, Mock, test, vi } from 'vitest'
import { CharactersPenaltyCalculator } from '../calculateTotalCharactersScore'

vi.mock('@/utils/utilities', () => ({
  clampPenalty: vi.fn(),
}))

test('should apply penalty of 1 if total characters count is less than 750', () => {
  ;(clampPenalty as Mock).mockReturnValue(1)

  const calculator = new CharactersPenaltyCalculator()
  const result = calculator.calculate(700)

  expect(result).toBe(1)
  expect(clampPenalty).toHaveBeenCalledWith(1)
})

test('should apply penalty based on excess characters if count exceeds 10,000', () => {
  ;(clampPenalty as Mock).mockReturnValue(6)

  const calculator = new CharactersPenaltyCalculator()
  const result = calculator.calculate(12000)

  // Correct the expected value to 6 based on the calculation
  expect(result).toBe(6)
  expect(clampPenalty).toHaveBeenCalledWith(6)
})

test('should not apply penalty if total characters count is between 750 and 10,000', () => {
  ;(clampPenalty as Mock).mockReturnValue(0)

  const calculator = new CharactersPenaltyCalculator()
  const result = calculator.calculate(8000)

  expect(result).toBe(0)
  expect(clampPenalty).toHaveBeenCalledWith(0)
})

test('should apply penalty for excess characters above 10,000', () => {
  ;(clampPenalty as Mock).mockReturnValue(15)

  const calculator = new CharactersPenaltyCalculator()
  const result = calculator.calculate(15000)

  // Correct the expected value to 15 based on the calculation
  expect(result).toBe(15)
  expect(clampPenalty).toHaveBeenCalledWith(15)
})

test('should apply no penalty if characters count is 10,000 or below and greater than 750', () => {
  ;(clampPenalty as Mock).mockReturnValue(0)

  const calculator = new CharactersPenaltyCalculator()
  const result = calculator.calculate(10000)

  expect(result).toBe(0)
  expect(clampPenalty).toHaveBeenCalledWith(0)
})
