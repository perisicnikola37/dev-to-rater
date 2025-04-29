/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react'
import { Suspense } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import FeaturesSection from '../features-section'

describe('FeaturesSection', () => {
  beforeAll(() => {
    global.IntersectionObserver = class {
      observe() {}
    } as any
  })

  it('renders all lazy-loaded feature boxes', async () => {
    render(
      <MemoryRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <FeaturesSection />
        </Suspense>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText(/Exceeded sentences/i)).toBeInTheDocument()
      expect(screen.getByText(/Reading time/i)).toBeInTheDocument()
      expect(screen.getByText(/Word frequency/i)).toBeInTheDocument()
    })
  })
})
