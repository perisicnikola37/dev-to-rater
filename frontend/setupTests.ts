import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('@/utils/constants/configuration', () => ({
  DEV_TO_ARTICLE_BODY_CLASS: '.crayons-article__body',
  BASE_URLS: {
    REPOSITORY: 'https://github.com/repository',
  },
  APPLICATION_VERSION: '1.2.3',
  POST_MAX_SCORE: 10,
  MAX_VISIBLE_REPEATED_WORDS: 15,
  AVERAGE_READING_SPEED: 250,
}))

vi.mock('@/utils/utilities', () => ({
  getDocumentationURL: () => 'https://docs.example.com',
}))

vi.mock('@/core/data/recent_blogs.json', () => ({
  default: [
    {
      title: 'Intro to React',
      url: '/react',
      tags: ['Frontend'],
      image: 'react.png',
    },
    {
      title: 'Blockchain Basics',
      url: '/blockchain',
      tags: ['Crypto Industry'],
      image: 'crypto.png',
    },
  ],
}))
