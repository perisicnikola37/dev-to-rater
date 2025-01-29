import { clampPenalty } from '../../utils/utilities'
import IGNORED_FREQUENT_WORDS from '../data/ignored_frequent_words.json'
import { PenaltyCalculator } from '../interfaces/PenaltyCalculator'

const WORDS_REPEAT_LIMIT = 5

export class RepeatingWordsPenaltyCalculator implements PenaltyCalculator {
  calculate(words: string[]): {
    penalty: number
    repeatedWords: { word: string; count: number }[]
  } {
    let penalty = 0
    const wordCount: { [key: string]: number } = {}
    const repeatedWords: { word: string; count: number }[] = []

    words.forEach((word) => {
      if (IGNORED_FREQUENT_WORDS.includes(word.toLowerCase())) return
      wordCount[word] = (wordCount[word] || 0) + 1
      if (wordCount[word] > WORDS_REPEAT_LIMIT) {
        penalty += 0.01
        if (!repeatedWords.find((rw) => rw.word === word)) {
          repeatedWords.push({ word, count: wordCount[word] })
        } else {
          repeatedWords.forEach((rw) => {
            if (rw.word === word) rw.count = wordCount[word]
          })
        }
      }
    })

    return { penalty: clampPenalty(penalty), repeatedWords }
  }
}
