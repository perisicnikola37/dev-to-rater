export type Reaction = {
  article_reaction_counts: {
    category: string
    count: number
    percentage?: number
  }[]
}
