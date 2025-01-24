export const calculateParagraphScore = (paragraphs: string[]): number => {
  let penalty = 0

  paragraphs.forEach((paragraph) => {
    const wordCount = paragraph.split(/\s+/).filter(Boolean).length

    if (wordCount > 15) {
      const excessWords = wordCount - 15
      penalty += excessWords * 0.05
    }
  })

  return penalty
}
