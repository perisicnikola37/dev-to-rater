import { render } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '../homepage'

vi.mock('@/utils/lazyImports', () => ({
  HeroSection: () => <div>HeroSection</div>,
  FeaturesSection: () => <div>FeaturesSection</div>,
  OurSocialsSection: () => <div>OurSocialsSection</div>,
  TryNowSection: () => <div>TryNowSection</div>,
  TrustedBySection: () => <div>TrustedBySection</div>,
}))

vi.mock('@/components/footer/footer', () => ({
  default: () => <div>Footer</div>,
}))

describe('HomePage', () => {
  it('should render all sections and footer correctly', () => {
    const { getByText } = render(<HomePage />)

    expect(getByText('HeroSection')).toBeInTheDocument()
    expect(getByText('FeaturesSection')).toBeInTheDocument()
    expect(getByText('OurSocialsSection')).toBeInTheDocument()
    expect(getByText('TryNowSection')).toBeInTheDocument()
    expect(getByText('TrustedBySection')).toBeInTheDocument()
    expect(getByText('Footer')).toBeInTheDocument()
  })
})
