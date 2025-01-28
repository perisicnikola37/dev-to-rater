export type PenaltyCalculationFunctionWithES = (sentences: string[]) => {
  penalty: number
  exceededSentences: string[]
}
