import { clampPenalty } from '@/utils/utilities'
import { expect, Mock, test, vi } from 'vitest'
import { RepeatingWordsPenaltyCalculator } from '../calculateRepeatingWordsScore'

vi.mock('@/utils/utilities', () => ({
  clampPenalty: vi.fn(),
}))

vi.mock('../data/ignored_frequent_words.json', () => [
  'the',
  'and',
  'is',
  'to',
  'of',
  'a',
  'in',
  'that',
  'it',
  'with',
])

test('should ignore frequent words and not apply penalty', () => {
  ;(clampPenalty as Mock).mockReturnValue(0)

  const calculator = new RepeatingWordsPenaltyCalculator()
  const result = calculator.calculate([
    'the',
    'and',
    'is',
    'to',
    'of',
    'the',
    'to',
  ])

  expect(result.penalty).toBe(0)
  expect(result.repeatedWords).toEqual([])
  expect(clampPenalty).toHaveBeenCalledWith(0)
})

test('should not apply penalty if repeated words are within the limit', () => {
  ;(clampPenalty as Mock).mockReturnValue(0)

  const calculator = new RepeatingWordsPenaltyCalculator()
  const result = calculator.calculate([
    'hello',
    'world',
    'hello',
    'world',
    'hello',
  ])

  expect(result.penalty).toBe(0)
  expect(result.repeatedWords).toEqual([])
  expect(clampPenalty).toHaveBeenCalledWith(0)
})
