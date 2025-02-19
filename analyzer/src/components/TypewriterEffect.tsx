import React from 'react'
import Typewriter from 'typewriter-effect'

interface TypewriterEffectProps {
  strings: string[]
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ strings }) => (
  <Typewriter
    options={{
      strings: strings,
      autoStart: true,
      loop: true,
    }}
  />
)

export default TypewriterEffect
