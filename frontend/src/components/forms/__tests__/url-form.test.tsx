import '@testing-library/jest-dom' // Import jest-dom matchers
import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import URLForm from '../url-form'

describe('URLForm', () => {
  it('should render input, buttons and icons', () => {
    const handleSubmit = vi.fn()
    const handleCopy = vi.fn()
    const setInputURL = vi.fn()
    const inputURL = ''

    render(
      <URLForm
        inputURL={inputURL}
        setInputURL={setInputURL}
        handleSubmit={handleSubmit}
        handleCopy={handleCopy}
        isDisabled={false}
      />,
    )

    expect(screen.getByPlaceholderText(/Enter post URL/i)).toBeInTheDocument()
    expect(screen.getByText(/Analyze/i)).toBeInTheDocument()
    expect(screen.getByText(/Refactor/i)).toBeInTheDocument()
  })

  it('should call handleSubmit when Analyze button is clicked', () => {
    const handleSubmit = vi.fn()
    const handleCopy = vi.fn()
    const setInputURL = vi.fn()

    render(
      <URLForm
        inputURL=""
        setInputURL={setInputURL}
        handleSubmit={handleSubmit}
        handleCopy={handleCopy}
        isDisabled={false}
      />,
    )

    const analyzeButton = screen.getByText(/Analyze/i)
    fireEvent.click(analyzeButton)

    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('should call handleCopy when Refactor button is clicked', () => {
    const handleSubmit = vi.fn()
    const handleCopy = vi.fn()
    const setInputURL = vi.fn()

    render(
      <URLForm
        inputURL=""
        setInputURL={setInputURL}
        handleSubmit={handleSubmit}
        handleCopy={handleCopy}
        isDisabled={false}
      />,
    )

    const refactorButton = screen.getByText(/Refactor/i)
    fireEvent.click(refactorButton)

    expect(handleCopy).toHaveBeenCalledTimes(1)
  })

  it('should disable Refactor button when isDisabled is true', () => {
    const handleSubmit = vi.fn()
    const handleCopy = vi.fn()
    const setInputURL = vi.fn()

    render(
      <URLForm
        inputURL=""
        setInputURL={setInputURL}
        handleSubmit={handleSubmit}
        handleCopy={handleCopy}
        isDisabled={true}
      />,
    )

    const refactorButton = screen.getByText(/Refactor/i)

    expect(refactorButton).toBeDisabled()
  })

  it('should update input value when typing', () => {
    const handleSubmit = vi.fn()
    const handleCopy = vi.fn()
    const setInputURL = vi.fn()

    render(
      <URLForm
        inputURL=""
        setInputURL={setInputURL}
        handleSubmit={handleSubmit}
        handleCopy={handleCopy}
        isDisabled={false}
      />,
    )

    const input = screen.getByPlaceholderText(/Enter post URL/i)
    fireEvent.change(input, { target: { value: 'https://example.com' } })

    expect(setInputURL).toHaveBeenCalledWith('https://example.com')
  })
})
