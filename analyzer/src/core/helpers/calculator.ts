import { POST_MAX_SCORE } from '../../utils/constants/configuration'
import { HeadingsPenaltyCalculator } from '../implementations/calculateHeadingsScore'
import { LinksPenaltyCalculator } from '../implementations/calculateLinksScore'
import { ReadingTimePenaltyCalculator } from '../implementations/calculateReadingTimeScore'
import { RepeatingWordsPenaltyCalculator } from '../implementations/calculateRepeatingWordsScore'
import { SentencesPenaltyCalculator } from '../implementations/calculateSentencesScore'
import { CharactersPenaltyCalculator } from '../implementations/calculateTotalCharactersScore'
import { FinalResponse } from '../types/FinalResponse'
import { ReactionMap } from '../types/ReactionMap'

export const calculateScore = (
  headings: string[],
  sentences: string[],
  words: string[],
  totalPostCharactersCount: number,
  links: { href: string; text: string }[],
  reactions: ReactionMap,
  readingTime: number,
): FinalResponse => {
  let max_score = POST_MAX_SCORE

  const headingsPenalty = new HeadingsPenaltyCalculator().calculate(headings)
  const sentencesResult = new SentencesPenaltyCalculator().calculate(sentences)
  const charactersPenalty = new CharactersPenaltyCalculator().calculate(
    totalPostCharactersCount,
  )
  const linksPenalty = new LinksPenaltyCalculator().calculate(links)
  const wordsResult = new RepeatingWordsPenaltyCalculator().calculate(words)
  const readingPenalty = new ReadingTimePenaltyCalculator().calculate(
    readingTime,
  )

  console.log({
    headingsPenalty,
    sentencesResult,
    charactersPenalty,
    linksPenalty,
    wordsResult,
    readingPenalty,
  })

  console.log({
    headingsPenalty,
    sentencesResult,
    charactersPenalty,
    linksPenalty,
    wordsResult,
  })

  max_score -=
    headingsPenalty +
    sentencesResult.penalty +
    charactersPenalty +
    linksPenalty +
    wordsResult.penalty +
    readingPenalty
  max_score = Math.max(0, Math.min(max_score, 10))

  return {
    totalScore: max_score,
    headingsPenalty,
    sentencesPenalty: sentencesResult.penalty,
    charactersPenalty,
    wordsPenalty: wordsResult.penalty,
    headings,
    sentences,
    words,
    links,
    exceeded: {
      exceededSentences: sentencesResult.exceededSentences,
      repeatedWords: wordsResult.repeatedWords,
    },
    reactions,
    readingTime,
  }
}
