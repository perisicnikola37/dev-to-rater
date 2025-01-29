import { POST_MAX_SCORE } from '@/utils/constants/configuration'
import { calculateHeadingsScore } from '../implementations/calculateHeadingsScore'
import { calculateTotalCharactersCountScore } from '../implementations/calculateTotalCharactersScore'
import { calculateLinksScore } from '../implementations/calculateLinksScore'
import { calculateRepeatingWordsScore } from '../implementations/calculateRepeatingWordsScore'
import { calculateSentencesScore } from '@/core/implementations/calculateSentencesScore'
import { calculateReadingTimeScore } from '../implementations/calculateReadingTimeScore'
import { FinalResponse } from '../types/FinalResponse'
import { ReactionMap } from '../types/ReactionMap'

export const calculateScore = (
  id: number,
  headings: string[],
  sentences: string[],
  words: string[],
  totalPostCharactersCount: number,
  links: { href: string; text: string }[],
  reactions: ReactionMap,
  readingTime: number,
): FinalResponse => {
  let max_score = POST_MAX_SCORE

  // Calculate heading structure score
  const headingsPenalty = calculateHeadingsScore(headings)
  // Calculate sentences score
  const sentencesPenalty = calculateSentencesScore(sentences)
  // Calculate characters count score
  const charactersPenalty = calculateTotalCharactersCountScore(
    totalPostCharactersCount,
  )
  // Calculate links score
  const linksPenalty = calculateLinksScore(links)
  // Calculate words score
  const wordsPenalty = calculateRepeatingWordsScore(words)
  // Calculate reading time score
  const timePenalty = calculateReadingTimeScore(readingTime)

  console.log('Headings Penalty:', headingsPenalty)
  console.log('Sentences Penalty:', sentencesPenalty.penalty)
  console.log('Characters Penalty:', charactersPenalty)
  console.log('Links Penalty:', linksPenalty)
  console.log('Words Penalty:', wordsPenalty.penalty)
  console.log('Reading Time Penalty:', timePenalty)
  console.log('Repeated Words:', wordsPenalty.repeatedWords)
  console.log('Reactions:', reactions.article_reaction_counts)

  max_score -=
    headingsPenalty +
    sentencesPenalty.penalty +
    wordsPenalty.penalty +
    charactersPenalty +
    linksPenalty +
    timePenalty
  max_score = Math.max(0, Math.min(max_score, 10))

  return {
    id: id,
    totalScore: max_score,
    headingsPenalty,
    sentencesPenalty: sentencesPenalty.penalty,
    wordsPenalty: wordsPenalty.penalty,
    charactersPenalty,
    headings,
    sentences,
    words,
    links: links,
    reactions,
    exceeded: {
      exceededSentences: sentencesPenalty.exceededSentences || [],
      repeatedWords: wordsPenalty.repeatedWords || [],
    },
    readingTime,
  }
}
