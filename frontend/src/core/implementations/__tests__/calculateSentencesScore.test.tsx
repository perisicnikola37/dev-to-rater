import { clampPenalty } from '@/utils/utilities'
import { expect, Mock, test, vi } from 'vitest'
import { SentencesPenaltyCalculator } from '../calculateSentencesScore'

vi.mock('@/utils/utilities', () => ({
  clampPenalty: vi.fn(),
}))

test('should apply penalty of 1 if no sentences are present', () => {
  ;(clampPenalty as Mock).mockReturnValue(1)

  const calculator = new SentencesPenaltyCalculator()
  const result = calculator.calculate([])

  expect(result.penalty).toBe(1)
  expect(result.exceededSentences).toEqual([])
  expect(clampPenalty).toHaveBeenCalledWith(1)
})

test('should not apply penalty for sentences within the word limit', () => {
  ;(clampPenalty as Mock).mockReturnValue(0)

  const sentences = [
    'This sentence is under the word limit.',
    'Another sentence that is perfectly fine.',
  ]

  const calculator = new SentencesPenaltyCalculator()
  const result = calculator.calculate(sentences)

  expect(result.penalty).toBe(0)
  expect(result.exceededSentences).toEqual([])
  expect(clampPenalty).toHaveBeenCalledWith(0)
})
