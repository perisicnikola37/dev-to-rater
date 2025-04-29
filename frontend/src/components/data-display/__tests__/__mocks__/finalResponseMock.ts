import { FinalResponse } from '@/core/types/FinalResponse'

export const finalResponseMock: FinalResponse = {
  totalScore: 85,
  headingsPenalty: 5,
  sentencesPenalty: 3,
  charactersPenalty: 2,
  wordsPenalty: 1,
  headings: ['Heading 1', 'Heading 2'],
  sentences: ['This is a test sentence.', 'Another example sentence.'],
  words: ['test', 'example', 'sample', 'repeated'],
  links: [{ href: 'https://example.com', text: 'Example Link' }],
  exceeded: {
    exceededSentences: ['This is a very long sentence that exceeds the limit.'],
    repeatedWords: [
      { word: 'test', count: 1 },
      { word: 'example', count: 2 },
      { word: 'sample', count: 10 },
      { word: 'repeated', count: 15 },
    ],
  },
  reactions: {
    article_reaction_counts: [
      { category: 'like', count: 10, percentage: 50 },
      { category: 'unicorn', count: 5, percentage: 25 },
      { category: 'raised_hands', count: 3, percentage: 15 },
      { category: 'readinglist', count: 2, percentage: 10 },
    ],
  },
  readingTime: 4,
  markdown: '# Sample Markdown',
  changedWords: [{ original: 'test', changed: 'exam' }],
}
