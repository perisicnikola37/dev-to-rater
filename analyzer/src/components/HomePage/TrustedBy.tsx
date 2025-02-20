const TrustedBy = () => {
  const images = [
    {
      src: 'https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1109424%2F9c92b87f-9c68-4370-b554-2d7d4d823a9b.png',
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

export default TrustedBy
