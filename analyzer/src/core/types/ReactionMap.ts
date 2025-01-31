import { AllowedReactions } from './AllowedReactions'

export type ReactionMap = {
  article_reaction_counts: {
    category: AllowedReactions
    count: number
    percentage?: number
  }[]
}
