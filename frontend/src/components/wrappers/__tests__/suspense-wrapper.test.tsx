import { render, screen, waitFor } from '@testing-library/react'
import { lazy } from 'react'
import { describe, expect, it } from 'vitest'
import SuspenseWrapper from '../suspense-wrapper'

const LazyComponent = lazy(() => {
  return new Promise<{ default: React.FC }>((resolve) => {
    setTimeout(() => {
      resolve({
        default: () => <div>Lazy Loaded Content</div>,
      })
    }, 100)
  })
})

describe('SuspenseWrapper', () => {
  it('shows fallback while loading', async () => {
    render(
      <SuspenseWrapper fallback={<div>Loading...</div>}>
        <LazyComponent />
      </SuspenseWrapper>,
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Lazy Loaded Content')).toBeInTheDocument()
    })
  })

  it('renders children immediately if not lazy', () => {
    render(
      <SuspenseWrapper fallback={<div>Loading...</div>}>
        <div>Normal Content</div>
      </SuspenseWrapper>,
    )

    expect(screen.getByText('Normal Content')).toBeInTheDocument()
  })
})
