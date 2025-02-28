// our mapped type
export type RepeatedWord = { word: string; count: number }

// type from the json file
export type WordReplacement = { word: string; replacements: string[] }

export type ReplacementMap = { [key: string]: () => string }
export type MarkdownParts = { type: 'code' | 'text'; content: string }[]

export type ReplaceRepeatedWordsResult = {
  markdown: string
  changes: { original: string; changed: string }[]
}
