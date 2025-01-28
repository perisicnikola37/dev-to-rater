import React from 'react'

const Preloader: React.FC = () => {
  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div
          className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-blue-500 border-t-transparent"
          role="status"
          aria-label="Loading..."
        ></div>
      </div>
    </section>
  )
}

export default Preloader
