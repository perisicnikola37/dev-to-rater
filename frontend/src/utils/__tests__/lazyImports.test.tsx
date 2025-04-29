import { render, screen, waitFor } from '@testing-library/react'
import React, { Suspense } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import {
  AnimatedScore,
  CanvasCursor,
  Card,
  ExceededSentencesBox,
  RadarChart,
} from '../lazyImports'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderLazy = (Component: React.LazyExoticComponent<any>) => {
  return render(
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>,
  )
}

describe('Lazy-loaded components', () => {
  it('renders AnimatedScore component', async () => {
    renderLazy(AnimatedScore)
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(),
    )
  })

  it('renders RadarChart component', async () => {
    render(
      <MemoryRouter>
        <RadarChart />
      </MemoryRouter>,
    )
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(),
    )
  })

  it('renders ExceededSentencesBox component', async () => {
    render(
      <MemoryRouter>
        <ExceededSentencesBox />
      </MemoryRouter>,
    )
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(),
    )
  })

  it('renders Card component', async () => {
    render(
      <MemoryRouter>
        <Card />
      </MemoryRouter>,
    )
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(),
    )
  })

  it('renders CanvasCursor component', async () => {
    render(
      <MemoryRouter>
        <CanvasCursor />
      </MemoryRouter>,
    )
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(),
    )
  })
})
