import { PostRoutes } from '../apiRoutes'

describe('PostRoutes Enum', () => {
  it('should have correct route for POSTS', () => {
    expect(PostRoutes.POSTS).toBe('/posts')
  })
})
