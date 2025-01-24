export const calculateHeadingStructureScore = (
  headings: string[],
  charactersCount: number,
): number => {
  let penalty = 0

  // Check if there is at least one heading
  if (headings.length === 0) {
    penalty += 1 // If there are no headings, add a penalty
  }

  // Logic for characters
  if (charactersCount > 5000) {
    penalty += 2 // If there are more than 5000 characters, add a penalty
  }

  // TODO: Maybe add bonus point if below 1500 characters

  console.log(`Characters count: ${charactersCount}, Penalty: ${penalty}`)
  return penalty
}
