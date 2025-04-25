import createFetchInstance from '@/utils/instance/instance'
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useAddFeaturedPost from '../useAddFeaturedPost'

vi.mock('@/utils/instance/instance', () => ({
  default: vi.fn(() => ({
    instance: vi.fn(),
  })),
}))

describe('useAddFeaturedPost', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockInstance: any

  beforeEach(() => {
    mockInstance = createFetchInstance().instance
    vi.clearAllMocks()
  })

  it('should not call the API if content is invalid', async () => {
    const { result } = renderHook(() => useAddFeaturedPost())

    const invalidContent = { title: '', imageUrl: '', postUrl: '' }

    await act(async () => {
      await result.current.addFeaturedPost({ content: invalidContent })
    })

    expect(mockInstance).not.toHaveBeenCalled()
  })
})
