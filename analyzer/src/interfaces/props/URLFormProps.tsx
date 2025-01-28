export interface URLFormProps {
  inputURL: string
  setInputURL: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: (e: React.FormEvent) => void
}
