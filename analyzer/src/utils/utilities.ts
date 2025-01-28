import { FinalResponse } from '../core/types/FinalResponse'
import { SourceType } from '../core/types/SourceType'
import { POST_MAX_SCORE } from './constants/configuration'
import { ErrorMessages } from './constants/messages'
import messages from '../core/data/messages.json'
import { MessageCategories } from '../core/types/MessageCategories'

export const isValidProvidedSourceURL = <T extends SourceType>(
  url: string,
  source: T,
): boolean => {
  try {
    const isValid = url.includes(source.url)

    return isValid
  } catch (error) {
    console.error(ErrorMessages.InvalidURL, error)
    return false
  }
}

// Make sure that penalty is between 0 and POST_MAX_SCORE
export function clampPenalty(penalty: number): number {
  return Math.max(0, Math.min(penalty, POST_MAX_SCORE))
}

export const calculateFullMark = (content: FinalResponse) => {
  const totalItems =
    content?.headings.length + content?.links.length + content?.sentences.length

  const adjustedTotalItems =
    content?.sentences.length < content?.headings.length
      ? totalItems - content?.sentences.length
      : totalItems

  const average = adjustedTotalItems / 3
  return Math.min(average, 10)
}

export const getRandomMessage = (category: MessageCategories): string => {
  const categoryMessages = messages[category]

  if (categoryMessages && categoryMessages.length > 0) {
    const randomIndex = Math.floor(Math.random() * categoryMessages.length)
    return categoryMessages[randomIndex]
  }

  return ''
}
