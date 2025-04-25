export type PenaltyCalculationFunctionWithES = (sentences: string[]) => {
  penalty: number
  exceededSentences?: string[]
  repeatedWords?: { word: string; count: number }[]
}
