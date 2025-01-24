import React from 'react'
import { useSpring, animated, SpringValue } from 'react-spring'
import { AnimatedScoreProps } from '../interfaces/AnimatedScoreProps'

interface Props extends AnimatedScoreProps {
  textColor?: string
  containerClassName?: string
}

const AnimatedScore: React.FC<Props> = ({
  score = 0,
  textColor = 'text-blue-500',
  containerClassName = 'flex flex-col items-center mt-10',
}) => {
  const animatedScore: { number: SpringValue<number> } = useSpring({
    number: score,
    from: { number: 0 },
    reset: true,
    reverse: score < 0,
    config: { tension: 200, friction: 20 },
  })

  return (
    <div className={containerClassName}>
      <div className="text-xl font-semibold mb-2">SCORE</div>
      <animated.div className={`text-3xl font-bold ${textColor}`}>
        {animatedScore.number.to((n) => n.toFixed(2))}
      </animated.div>
    </div>
  )
}

export default AnimatedScore
