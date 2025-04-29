/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import RadarComponent from '../radar-chart'

vi.mock('recharts', () => {
  return {
    ResponsiveContainer: ({ children }: any) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    RadarChart: ({ children, ...props }: any) => (
      <div data-testid="radar-chart" data-props={JSON.stringify(props)}>
        {children}
      </div>
    ),
    PolarGrid: () => <div data-testid="polar-grid" />,
    PolarAngleAxis: ({ dataKey }: any) => (
      <div data-testid="polar-angle-axis" data-key={dataKey} />
    ),
    PolarRadiusAxis: ({ angle, domain }: any) => (
      <div
        data-testid="polar-radius-axis"
        data-angle={angle}
        data-domain={JSON.stringify(domain)}
      />
    ),
    Radar: ({ name, dataKey, stroke, fill }: any) => (
      <div
        data-testid="radar"
        data-name={name}
        data-key={dataKey}
        data-stroke={stroke}
        data-fill={fill}
      />
    ),
    Tooltip: () => <div data-testid="tooltip" />,
  }
})

describe('RadarComponent', () => {
  const mockData = [
    { subject: 'Math', A: 120, fullMark: 150 },
    { subject: 'Science', A: 98, fullMark: 150 },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders ResponsiveContainer and RadarChart', () => {
    render(<RadarComponent data={mockData} />)

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
    expect(screen.getByTestId('radar-chart')).toBeInTheDocument()
  })

  it('renders PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, and Tooltip', () => {
    render(<RadarComponent data={mockData} />)

    expect(screen.getByTestId('polar-grid')).toBeInTheDocument()
    expect(screen.getByTestId('polar-angle-axis')).toHaveAttribute(
      'data-key',
      'subject',
    )
    expect(screen.getByTestId('polar-radius-axis')).toHaveAttribute(
      'data-angle',
      '30',
    )
    expect(screen.getByTestId('radar')).toHaveAttribute('data-name', 'Total')
    expect(screen.getByTestId('tooltip')).toBeInTheDocument()
  })

  it('calculates domain for PolarRadiusAxis based on fullMark', () => {
    render(<RadarComponent data={mockData} />)
    const radiusAxis = screen.getByTestId('polar-radius-axis')

    expect(radiusAxis).toHaveAttribute('data-domain', JSON.stringify([0, 150]))
  })
})
