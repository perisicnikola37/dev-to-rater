import React from 'react'
import { useSpring, animated } from 'react-spring'
import { AnimatedScoreProps } from '../interfaces/props/AnimatedScoreProps'

const AnimatedScore: React.FC<AnimatedScoreProps> = ({
  score = 0,
  textColor = 'text-blue-400',
  containerClassName = 'flex flex-col items-center mt-10',
}) => {
  const animatedScore = useSpring({
    number: score,
    from: { number: 0 },
    reset: true,
    reverse: score < 0,
    config: { tension: 100, friction: 20 },
  })

  const formattedScore = animatedScore.number.to((n) => n.toFixed(2))

  return (
    <div className={containerClassName}>
      <div className="text-xl font-semibold mb-2">SCORE</div>
      <animated.div className={`text-3xl font-bold ${textColor}`}>
        {formattedScore}
      </animated.div>
    </div>
  )
}

export default AnimatedScore
