import { FinalResponse } from '@/core/types/FinalResponse'

export interface AddPostProps {
  content:
    | {
        title: string
        imageUrl: string
        postUrl: string
      }
    | FinalResponse
    | null
}
