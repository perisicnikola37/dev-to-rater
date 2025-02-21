import author1 from '@/assets/author1.webp'

const TrustedBySection = () => {
  const images = [
    {
      src: author1,
      link: 'https://dev.to/perisicnikola37',
    },
  ]

  return (
    <section className="bg-black w-full h-64 flex justify-center items-center">
      <div className="text-center">
        <p className="font-semibold text-white lg:text-3xl text-2xl mb-8">
          Trusted by Dev.to Writers
        </p>
        <div className="flex justify-center items-center space-x-4 flex-wrap">
          {images.map((image, index) => (
            <div key={index} className="relative mb-4">
              <a href={image.link} target="_blank" rel="noopener noreferrer">
                <img
                  loading="lazy"
                  src={image.src}
                  alt={`Dev.to Writer ${index + 1}`}
                  className={`rounded-full w-16 h-16 object-cover z-10 transition-transform duration-300 ease-in-out transform hover:scale-110 hover:-rotate-3`}
                />
              </a>
            </div>
          ))}
          <span className="text-white text-lg font-semibold">+17</span>
        </div>
      </div>
    </section>
  )
}

export default TrustedBySection
