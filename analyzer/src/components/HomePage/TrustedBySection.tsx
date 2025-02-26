import author1 from '@/assets/images/author1.webp'

const TrustedBySection = () => {
  const images = [
    {
      src: author1,
      link: 'https://dev.to/perisicnikola37',
    },
    {
      src: 'https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1002302%2F5233b7df-6ee3-46b2-b8d7-1fafe103e8a3.jpg',
      link: 'https://dev.to/lovestaco',
    },
    {
      src: 'https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F921006%2Ff6e252ad-3614-4cc9-9cf2-e645df850973.jpg',
      link: 'https://dev.to/webjose',
    },
    {
      src: 'https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F336835%2F2b9b6604-fd87-44e0-96c8-d33c0a429b6f.png',
      link: 'https://dev.to/jamesives',
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
