import messages from '../core/data/messages.json'
import { FinalResponse } from '@/core/types/FinalResponse'
import { MessageCategories } from '@/core/types/MessageCategories'
import { ErrorMessages } from './constants/messages'
import {
  BASE_URLS,
  LOCAL_STORAGE_KEY,
  POST_MAX_SCORE,
} from './constants/configuration'
import { SourceType } from '@/core/types/SourceType'
import { ENVIRONMENT } from './constants/envExpose'
import { Environments } from './constants/globalWeb'

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

export const getPostHistory = (): FinalResponse[] => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')
}

export const savePostToHistory = (post: FinalResponse) => {
  const history = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')

  const isDuplicate = history.some(
    (existingPost: FinalResponse) => existingPost.imageUrl === post.imageUrl,
  )

  if (!isDuplicate) {
    history.unshift(post)
    if (history.length > 10) {
      // TODO: Check this "10" number
      history.pop()
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history))
  }
}

/**
 * Returns the appropriate documentation URL based on the current environment.
 *
 * @returns {string} The URL of the documentation.
 */
export const getDocumentationURL = (): string => {
  return ENVIRONMENT === Environments.PRODUCTION
    ? BASE_URLS.DOCUMENTATION
    : BASE_URLS.DOCUMENTATION_LOCAL
}
