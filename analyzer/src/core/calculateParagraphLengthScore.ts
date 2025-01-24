export const calculateParagraphScore = (paragraphs: string[]): number => {
  let scoreChange = 0

  paragraphs.forEach((paragraph) => {
    const wordCount = paragraph.split(/\s+/).filter(Boolean).length

    // If the paragraph has less than 5 words, add points
    if (wordCount < 5) {
      scoreChange += 0.5
    }
    // If the paragraph has more than 15 words, subtract points
    else if (wordCount > 15) {
      const excessWords = wordCount - 15
      scoreChange -= excessWords * 0.05
    }
  })

  return scoreChange
}
