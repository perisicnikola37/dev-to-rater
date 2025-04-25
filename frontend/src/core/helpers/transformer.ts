import {
  MarkdownParts,
  RepeatedWord,
  ReplacementMap,
  ReplaceRepeatedWordsResult,
  WordReplacement,
} from '../types/RepeatedWord'

export const replaceRepeatedWords = (
  markdown: string,
  repeatedWords: RepeatedWord[],
  wordReplacementsProp: WordReplacement[],
): ReplaceRepeatedWordsResult => {
  const wordReplacements: ReplacementMap = {}
  const parts: MarkdownParts = []
  const changes: { original: string; changed: string }[] = []
  let lastIndex = 0

  wordReplacementsProp.forEach(({ word, replacements }) => {
    wordReplacements[word] = () =>
      replacements[Math.floor(Math.random() * replacements.length)]
  })

  const codeBlockRegex = /(```[\s\S]*?```|`[^`]*`)/g
  let match: RegExpExecArray | null

  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: markdown.substring(lastIndex, match.index),
      })
    }
    parts.push({ type: 'code', content: match[0] })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < markdown.length) {
    parts.push({ type: 'text', content: markdown.substring(lastIndex) })
  }

  parts.forEach((part) => {
    if (part.type === 'text') {
      repeatedWords.forEach(({ word }) => {
        if (wordReplacements[word]) {
          const originalContent = part.content
          const replacedContent = part.content.replace(
            new RegExp(`\\b${word}\\b`, 'g'),
            () => wordReplacements[word](),
          )

          if (originalContent !== replacedContent) {
            part.content = replacedContent
            changes.push({ original: word, changed: wordReplacements[word]() })
          }
        }
      })
    }
  })

  return {
    markdown: parts.map((part) => part.content).join(''),
    changes,
  }
}
