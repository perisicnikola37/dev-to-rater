import { API_URL, FRONTEND_APPLICATION_PORT } from './envExpose'
import { Protocols } from './globalWeb'
import { socialImages } from './images'

export const BASE_URLS = {
  APPLICATION: `${Protocols.HTTPS}://dev-to-rater.xyz`,
  APPLICATION_LOCAL: `${Protocols.HTTP}://localhost:${FRONTEND_APPLICATION_PORT}`,
  DOCUMENTATION: `${Protocols.HTTPS}://docs.dev-to-rater.xyz`,
  DOCUMENTATION_LOCAL: `${Protocols.HTTP}://localhost:3000`,
  API_URL: API_URL,
  API_URL_LOCAL: `${Protocols.HTTP}://localhost:2560/api`,
  REPOSITORY: `${Protocols.HTTPS}://github.com/perisicnikola37/dev-to-rater`,
  DEV_TO: `${Protocols.HTTPS}://dev.to/`,
  MEDIUM: `${Protocols.HTTPS}://medium.com`,
} as const

export const APPLICATION_VERSION = 'v2'

export const DEV_TO_ARTICLE_BODY_CLASS = '.crayons-article__body'
export const DEV_TO_ARTICLE_COVER_IMAGE_CLASS = '.crayons-article__cover__image'
export const DEV_TO_ARTICLE_ID_ATTRIBUTE = 'data-article-id'

export const POST_MAX_SCORE = 10
export const MAX_VISIBLE_EXCEEDED_SENTENCES = 3
export const MAX_VISIBLE_REPEATED_WORDS = 15
export const AVERAGE_READING_SPEED = 250
export const MAX_SCANNED_VISIBLE_POSTS = 3

export const LOCAL_STORAGE_KEY = 'scannedPostsHistory'

export const ourSocials = [
  {
    imgSrc: socialImages.devTo,
    url: 'https://dev.to/dev-to-rater-org',
  },
  {
    imgSrc: socialImages.gitHub,
    url: 'https://github.com/perisicnikola37/dev-to-rater/',
  },
  {
    imgSrc: socialImages.youTube,
    url: 'https://www.youtube.com/@Dev.toRater',
  },
  {
    imgSrc: socialImages.productHunt,
    url: 'https://www.producthunt.com/posts/dev-to-rater-2?utm_source=other&utm_medium=social',
  },
]
