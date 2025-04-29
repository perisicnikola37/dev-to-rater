import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Spinner from '../spinner'

describe('Spinner component', () => {
  it('renders the spinner', () => {
    render(<Spinner />)

    const spinner = screen.getByRole('spinner', { hidden: true })
    expect(spinner).toBeInTheDocument()
  })

  it('has correct spinner classes', () => {
    render(<Spinner />)

    const spinner = screen.getByRole('spinner', { hidden: true })
    expect(spinner).toHaveClass(
      'w-10',
      'h-10',
      'border-4',
      'border-gray-300',
      'border-t-blue-500',
      'rounded-full',
      'animate-spin',
    )
  })
})
