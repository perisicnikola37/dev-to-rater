export const calculateHeadingStructureScore = (headings: string[]): number => {
  let penalty = 0

  // Check if there is at least one heading
  if (headings.length === 0) {
    penalty += 1 // If there are no headings, add a penalty
  }

  return penalty
}
