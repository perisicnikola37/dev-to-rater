import { motion } from 'framer-motion'
import { describe, expect, it, vi } from 'vitest'

vi.mock('framer-motion', () => {
  return {
    motion: {
      div: 'mock-motion-div',
      span: 'mock-motion-span',
    },
  }
})

describe('motion export', () => {
  it('should export the mocked motion object', () => {
    expect(motion).toHaveProperty('div')
    expect(motion).toHaveProperty('span')
    expect(motion.div).toBe('mock-motion-div')
  })
})
