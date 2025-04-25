export interface PenaltyCalculator<T = unknown> {
  calculate(data: T): number | { penalty: number; [key: string]: unknown }
}
