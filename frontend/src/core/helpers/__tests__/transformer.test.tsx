import {
  RepeatedWord,
  ReplaceRepeatedWordsResult,
  WordReplacement,
} from '@/core/types/RepeatedWord'
import { replaceRepeatedWords } from '../transformer'

describe('replaceRepeatedWords', () => {
  it('should replace repeated words in markdown', () => {
    const markdown = 'This is a test with test words that should be replaced.'
    const repeatedWords: RepeatedWord[] = [
      {
        word: 'test',
        count: 0,
      },
    ]
    const wordReplacements: WordReplacement[] = [
      { word: 'test', replacements: ['exam', 'trial'] },
    ]

    const result: ReplaceRepeatedWordsResult = replaceRepeatedWords(
      markdown,
      repeatedWords,
      wordReplacements,
    )

    expect(result.markdown).toMatch(/exam|trial/)
    expect(result.changes.length).toBeGreaterThan(0)
    expect(result.changes[0].original).toBe('test')
  })

  it('should not replace words inside code blocks', () => {
    const markdown = 'This is a `test` word inside code block.'
    const repeatedWords: RepeatedWord[] = [
      {
        word: 'test',
        count: 0,
      },
    ]
    const wordReplacements: WordReplacement[] = [
      { word: 'test', replacements: ['exam', 'trial'] },
    ]

    const result: ReplaceRepeatedWordsResult = replaceRepeatedWords(
      markdown,
      repeatedWords,
      wordReplacements,
    )

    expect(result.markdown).toContain('`test`')
  })

  it('should correctly track changes in replacements', () => {
    const markdown = 'Replace test with something else.'
    const repeatedWords: RepeatedWord[] = [
      {
        word: 'test',
        count: 0,
      },
    ]
    const wordReplacements: WordReplacement[] = [
      { word: 'test', replacements: ['exam', 'trial'] },
    ]

    const result: ReplaceRepeatedWordsResult = replaceRepeatedWords(
      markdown,
      repeatedWords,
      wordReplacements,
    )

    expect(result.changes).toEqual([
      {
        original: 'test',
        changed: expect.stringMatching(/exam|trial/),
      },
    ])
  })

  it('should handle empty markdown gracefully', () => {
    const markdown = ''
    const repeatedWords: RepeatedWord[] = [
      {
        word: 'test',
        count: 0,
      },
    ]
    const wordReplacements: WordReplacement[] = [
      { word: 'test', replacements: ['exam', 'trial'] },
    ]

    const result: ReplaceRepeatedWordsResult = replaceRepeatedWords(
      markdown,
      repeatedWords,
      wordReplacements,
    )

    expect(result.markdown).toBe('')
    expect(result.changes).toEqual([])
  })

  it('should not replace words if no matches are found', () => {
    const markdown = 'This is a sample sentence.'
    const repeatedWords: RepeatedWord[] = [
      {
        word: 'nonexistent',
        count: 0,
      },
    ]
    const wordReplacements: WordReplacement[] = [
      { word: 'nonexistent', replacements: ['replacement'] },
    ]

    const result: ReplaceRepeatedWordsResult = replaceRepeatedWords(
      markdown,
      repeatedWords,
      wordReplacements,
    )

    expect(result.markdown).toBe(markdown)
    expect(result.changes).toEqual([])
  })
})
