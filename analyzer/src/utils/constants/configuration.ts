import heart from '../../assets/heart.svg'
import unicorn from '../../assets/unicorn.svg'
import exploding_head from '../../assets/exploding_head.svg'
import raised_hands from '../../assets/raised_hands.svg'
import fire from '../../assets/fire.svg'
import readinglist from '../../assets/readinglist.svg'

export const DEV_TO_URL = 'https://dev.to/'
export const DEV_TO_ARTICLE_BODY_CLASS = '.crayons-article__body'
export const MEDIUM_URL = 'https://medium.com/'
export const POST_MAX_SCORE = 10
export const MAX_VISIBLE_EXCEEDED_SENTENCES = 3
export const MAX_VISIBLE_REPEATED_WORDS = 15
export const AVERAGE_READING_SPEED = 250
export const MAX_SCANNED_VISIBLE_POSTS = 3

export const CORE_LOGIC_DOCUMENTATION_URL =
  'https://docs.dev-to-rater.xyz/versions/v2/essentials/paragraphs'
export const DOCUMENTATION_URL = 'https://docs.dev-to-rater.xyz'
export const REPOSITORY_URL = 'https://github.com/perisicnikola37/dev-to-rater'

export const reactionEmojis = {
  like: heart,
  unicorn: unicorn,
  exploding_head: exploding_head,
  raised_hands: raised_hands,
  fire: fire,
  readinglist: readinglist,
}

export const localStorageKey = 'scannedPostsHistory'
