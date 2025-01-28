import { POST_MAX_SCORE } from '../../utils/constants'
import { calculateHeadingsScore } from '../implementations/calculateHeadingsScore'
import { calculateLinksScore } from '../implementations/calculateLinksScore'
import { calculateSentencesScore } from '../implementations/calculateSentencesScore'
import { calculateTotalCharactersCountScore } from '../implementations/calculateTotalCharactersScore'
import { FinalResponse } from '../types/FinalResponse'

export const calculateScore = (
  headings: string[],
  sentences: string[],
  totalPostCharactersCount: number,
  links: { href: string; text: string }[],
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

  console.log('Headings Penalty:', headingsPenalty)
  console.log('Sentences Penalty:', sentencesPenalty.penalty)
  console.log('Characters Penalty:', charactersPenalty)
  console.log('Links Penalty:', linksPenalty)

  max_score -=
    headingsPenalty +
    sentencesPenalty.penalty +
    charactersPenalty +
    linksPenalty
  max_score = Math.max(0, Math.min(max_score, 10))

  return {
    totalScore: max_score,
    headingsPenalty,
    sentencesPenalty: sentencesPenalty.penalty,
    charactersPenalty,
    headings,
    sentences,
    links: links,
    exceeded: {
      exceededSentences: sentencesPenalty.exceededSentences,
    },
  }
}
