/* eslint-disable @typescript-eslint/no-explicit-any */
import messages from '@/core/data/messages.json'
import { POST_MAX_SCORE } from '@/utils/constants/configuration'
import {
  clampPenalty,
  cn,
  getDocumentationURL,
  getPostHistory,
  getRadarData,
  getRandomMessage,
  isValidProvidedSourceURL,
  savePostToHistory,
} from '@/utils/utilities'
import { toast } from 'sonner'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}))

vi.mock('@/utils/utilities', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...(typeof actual === 'object' && actual !== null ? actual : {}),
    copyBlogMarkdownToClipboard: vi.fn(),
  }
})

vi.mock('@/utils/constants/configuration', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...(typeof actual === 'object' && actual !== null ? actual : {}),
    POST_MAX_SCORE: 50,
  }
})

describe('utils', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.resetAllMocks()
  })

  it('isValidProvidedSourceURL returns true if url includes source.url', () => {
    return expect(
      isValidProvidedSourceURL('https://example.com', {
        url: 'example.com',
        name: '',
      }),
    ).toBe(true)
  })

  it('isValidProvidedSourceURL returns false on error', () => {
    expect(isValidProvidedSourceURL('https://example.com', null as any)).toBe(
      false,
    )
  })

  it('clampPenalty clamps values between 0 and POST_MAX_SCORE', () => {
    expect(clampPenalty(-10)).toBe(0)
    expect(clampPenalty(50)).toBe(50)
    expect(clampPenalty(POST_MAX_SCORE + 10)).toBe(POST_MAX_SCORE)
  })

  it('getRadarData maps values correctly', () => {
    const content = {
      headings: [1, 2],
      links: [1],
      sentences: [1, 2, 3],
    }
    const data = getRadarData(content, 10)

    expect(data).toEqual([
      { subject: 'Headings', A: 2, fullMark: 10 },
      { subject: 'Images', A: 10, fullMark: 10 },
      { subject: 'Links', A: 1, fullMark: 10 },
      { subject: 'Paragraphs', A: 3, fullMark: 10 },
    ])
  })

  it('getRandomMessage returns random message from category', () => {
    const category = Object.keys(messages)[0] as keyof typeof messages
    const msg = getRandomMessage(category)

    expect(messages[category]).toContain(msg)
  })

  it('getRandomMessage returns empty string for unknown category', () => {
    expect(getRandomMessage('nonexistent' as any)).toBe('')
  })

  it('getPostHistory returns empty array when no localStorage data', () => {
    expect(getPostHistory()).toEqual([])
  })

  it('savePostToHistory saves new post and prevents duplicates', () => {
    const post = { imageUrl: 'abc.jpg' } as any
    savePostToHistory(post)

    expect(getPostHistory()).toHaveLength(1)
    savePostToHistory(post)

    expect(getPostHistory()).toHaveLength(1)
  })

  it('savePostToHistory keeps only last 10 posts', () => {
    for (let i = 0; i < 15; i++) {
      savePostToHistory({ imageUrl: `${i}.jpg` } as any)
    }

    expect(getPostHistory()).toHaveLength(10)
  })

  it('getDocumentationURL returns proper URL based on environment', () => {
    const url = getDocumentationURL()

    expect(typeof url).toBe('string')
    expect(url).toContain('http')
  })

  it('cn returns merged classNames', () => {
    expect(cn('text-red-500', 'text-lg')).toBe('text-red-500 text-lg')
  })

  it('copyBlogMarkdownToClipboard calls clipboard and toast', async () => {
    const writeTextMock = vi.fn()
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    })

    vi.unmock('@/utils/utilities')
    const { copyBlogMarkdownToClipboard } = await import('@/utils/utilities')
    copyBlogMarkdownToClipboard({ markdown: 'Hello' })

    expect(writeTextMock).toHaveBeenCalledWith('Hello')
    expect(toast.success).toHaveBeenCalled()
  })
})
