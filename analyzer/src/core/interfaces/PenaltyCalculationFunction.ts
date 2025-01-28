export interface PenaltyCalculationFunction<T> {
  (input: T): number
}
