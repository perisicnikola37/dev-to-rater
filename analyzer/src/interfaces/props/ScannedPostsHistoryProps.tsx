import { FinalResponse } from '@/core/types/FinalResponse'

export interface ScannedPostsHistoryProps {
  history: FinalResponse[]
  clearHistory: () => void
  url: string
}
