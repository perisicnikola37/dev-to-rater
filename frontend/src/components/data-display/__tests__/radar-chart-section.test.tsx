/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import RadarChartSection from '../radar-chart-section'

vi.mock('../radar-chart', () => ({
  default: ({ data }: { data: any }) => (
    <div data-testid="radar-component">{JSON.stringify(data)}</div>
  ),
}))

const mockData = [
  { subject: 'Math', A: 120, fullMark: 150 },
  { subject: 'Science', A: 98, fullMark: 150 },
]

describe('RadarChartSection', () => {
  it('renders the heading', () => {
    render(<RadarChartSection data={[]} />)

    expect(screen.getByText('Content Breakdown')).toBeInTheDocument()
  })

  it('renders RadarComponent when data is provided', () => {
    render(<RadarChartSection data={mockData} />)
    const radar = screen.getByTestId('radar-component')

    expect(radar).toBeInTheDocument()
    expect(radar.textContent).toContain(JSON.stringify(mockData[0]))
    expect(radar.textContent).toContain(JSON.stringify(mockData[1]))
  })
})
