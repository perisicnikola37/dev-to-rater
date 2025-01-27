import { POST_MAX_SCORE } from './constants'
import { SourceType } from './constants/sources'
import { ErrorMessages } from './messages'

export const isValidProvidedSourceURL = <T extends SourceType>(
  url: string,
  source: T,
): boolean => {
  try {
    const isValid = url.includes(source.url)

    return isValid
  } catch (error) {
    console.error(ErrorMessages.INVALID_URL, error)
    return false
  }
}

// Make sure that penalty is between 0 and POST_MAX_SCORE
export function clampPenalty(penalty: number): number {
  return Math.max(0, Math.min(penalty, POST_MAX_SCORE))
}
