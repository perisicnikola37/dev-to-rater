import { CardProps } from '@/interfaces/props/CardProps'
import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Card from '../card'

const mockCard: CardProps = {
  card: {
    url: 'https://dev.to',
    imgSrc: 'https://dev.to/images/logo.png',
  },
  index: 1,
  areCardsInView: true,
}

describe('Card Component', () => {
  it('should render the card correctly', () => {
    render(<Card {...mockCard} />)
    const cardImage = screen.getByAltText("Dev.to Rater's social media")

    expect(cardImage).toBeInTheDocument()
    expect(cardImage).toHaveAttribute('src', mockCard.card.imgSrc)
  })

  it('should apply custom rotation and x values based on index', () => {
    render(<Card {...mockCard} />)
    const motionWrapper = screen.getByRole('article')

    expect(motionWrapper).toHaveStyle('transform: translateY(500px)')
  })

  it('should animate when areCardsInView changes', async () => {
    render(<Card {...mockCard} />)
    const motionWrapper = screen.getByRole('article')

    expect(motionWrapper).toHaveStyle('opacity: 0')
  })

  it('should open the correct URL on card click', () => {
    window.open = vi.fn()

    render(<Card {...mockCard} />)

    const motionWrapper = screen.getByRole('article')
    fireEvent.click(motionWrapper)

    expect(window.open).toHaveBeenCalledWith(mockCard.card.url, '_blank')
  })
})
