export type ChangedWord = {
  original: string
  changed: string
}

export type ChangedWordsProps = {
  changedWords: ChangedWord[]
  isContentVisible: boolean
}
