export const EXCEEDED_SENTENCES = 'exceededSentences' as const
export const REPEATED_WORDS = 'repeatedWords' as const

export type MessageCategories =
  | typeof EXCEEDED_SENTENCES
  | typeof REPEATED_WORDS
