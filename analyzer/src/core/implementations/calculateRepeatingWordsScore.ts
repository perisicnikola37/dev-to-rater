import { clampPenalty } from '../../utils/utilities'
import ignoredWords from '../data/ignored_frequent_words.json'
import { PenaltyCalculationFunctionWithES } from '../types/PenaltyCalculationFunctionWithES'

const WORDS_REPEAT_LIMIT = 5

export const calculateRepeatingWordsScore: PenaltyCalculationFunctionWithES = (
  words: string[],
) => {
  let penalty = 0
  const wordCount: { [key: string]: number } = {}
  const repeatedWords: { word: string; count: number }[] = []

  words.forEach((word) => {
    if (ignoredWords.includes(word.toLowerCase())) {
      return
    }
    wordCount[word] = (wordCount[word] || 0) + 1
    if (wordCount[word] > WORDS_REPEAT_LIMIT) {
      penalty += 0.01 // Subtract 0.01 points for each repetition beyond the allowed limit
      if (!repeatedWords.find((rw) => rw.word === word)) {
        repeatedWords.push({ word, count: wordCount[word] })
      } else {
        repeatedWords.forEach((rw) => {
          if (rw.word === word) {
            rw.count = wordCount[word]
          }
        })
      }
    }
  })

  return {
    // Clamp the penalty in range between 0 and ${POST_MAX_SCORE}
    penalty: clampPenalty(penalty),
    repeatedWords: repeatedWords,
  }
}
