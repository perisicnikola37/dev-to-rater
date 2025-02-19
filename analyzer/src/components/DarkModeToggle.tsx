import React, { useState, useEffect } from 'react'

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode')
      return (
        savedMode === 'true' ||
        (savedMode === null &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      )
    }
    return false
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode
      localStorage.setItem('darkMode', JSON.stringify(newMode))
      if (newMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return newMode
    })
  }

  return (
    <button onClick={toggleDarkMode} className="rounded-lg cursor-pointer">
      {!isDarkMode ? '🌙' : '☀️'}
    </button>
  )
}

export default DarkModeToggle
