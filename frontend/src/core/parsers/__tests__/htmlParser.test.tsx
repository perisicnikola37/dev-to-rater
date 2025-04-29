/* eslint-disable @typescript-eslint/no-explicit-any */
import { FinalResponse } from '@/core/types/FinalResponse'
import createFetchInstance from '@/utils/instance/instance'
import { AxiosResponse } from 'axios'
import { expect, test, vi } from 'vitest'
import { parseHTMLContent } from '../htmlParser'
import { htmlNestedListResponseMock } from './mocks/html-nested-list-mock'
import { htmlResponseMock } from './mocks/html-response-mock'

vi.mock('@/utils/instance/instance', () => ({
  default: vi.fn(),
}))

vi.mock('@/utils/utilities', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...(actual as object),
    clampPenalty: vi.fn((val) => val),
  }
})

const createMockAxiosResponse = (mockHtmlResponse: string): AxiosResponse => ({
  data: mockHtmlResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {
    headers: {},
  } as any,
})

const mockFetchInstance = (reactionsData: {
  article_reaction_counts: any[]
}) => {
  vi.mocked(createFetchInstance).mockReturnValue({
    instance: vi.fn().mockResolvedValue({
      data: reactionsData,
    }),
  })
}

test('parseHTMLContent should parse HTML to markdown', async () => {
  mockFetchInstance({
    article_reaction_counts: [
      { reaction: 'like', count: 10 },
      { reaction: 'love', count: 5 },
    ],
  })

  const result: FinalResponse = await parseHTMLContent(
    'http://test.com/article/12345',
    createMockAxiosResponse(htmlResponseMock),
  )

  expect(result.markdown).toContain('Test Heading')
  expect(result.markdown).toContain('Test paragraph with some content.')

  expect(result.reactions.article_reaction_counts).toHaveLength(2)
  expect(result.reactions.article_reaction_counts[0].percentage).toBe(67)
  expect(result.reactions.article_reaction_counts[0].count).toBe(10)
  expect(result.reactions.article_reaction_counts[1].percentage).toBe(33)
  expect(result.reactions.article_reaction_counts[1].count).toBe(5)
})

test('parseHTMLContent should handle empty reactions gracefully', async () => {
  mockFetchInstance({ article_reaction_counts: [] })

  const result: FinalResponse = await parseHTMLContent(
    'http://test.com/article/12345',
    createMockAxiosResponse(htmlResponseMock),
  )

  expect(result.reactions.article_reaction_counts).toEqual([])
})

test('parseHTMLContent should correctly calculate markdown for nested lists', async () => {
  mockFetchInstance({ article_reaction_counts: [] })

  const result: FinalResponse = await parseHTMLContent(
    'http://test.com/article/12345',
    createMockAxiosResponse(htmlNestedListResponseMock),
  )

  expect(result.markdown).toContain('Second Item')
  expect(result.markdown).toContain('- Nested Item 1')
  expect(result.markdown).toContain('- Nested Item 2')
})
