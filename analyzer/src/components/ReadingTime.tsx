import { ReadingTimeProps } from '@/interfaces/props/ReadingTime'

const ReadingTime: React.FC<ReadingTimeProps> = ({ readingTime }) => {
  let numberBgColor
  let readingMessage
  let readingHeading

  switch (true) {
    case readingTime >= 0 && readingTime <= 2:
      numberBgColor = '#F56565' // Red
      readingHeading = 'Too short!'
      readingMessage =
        'This article is very short and may not provide enough information.'
      break
    case readingTime >= 3 && readingTime <= 4:
      numberBgColor = '#F97316' // Orange
      readingHeading = 'Quick read!'
      readingMessage =
        'This article is short and easy to read, try to write between 5 and 12 minutes.'
      break
    case readingTime > 4 && readingTime <= 12:
      numberBgColor = '#38A169' // Green
      readingHeading = 'Perfect length!'
      readingMessage =
        'This article has an ideal length for an informative and engaging read.'
      break
    case readingTime > 12:
      numberBgColor = '#F56565' // Red
      readingHeading = 'Quite long!'
      readingMessage =
        'This article is on the longer side and might feel overwhelming.'
      break
  }

  return (
    <section className="w-full">
      <h2 className="text-3xl text-left mt-12 mb-8 font-bold text-gray-900">
        Reading Time
      </h2>
      <div className="flex justify-between items-center w-full p-4 rounded-lg shadow-md my-4">
        <div className="ml-4 text-gray-700">
          <h3 className="font-bold text-xl">{readingHeading}</h3>
          <p>{readingMessage}</p>
        </div>
        <div
          className="flex items-center justify-center w-16 h-16 text-white text-2xl font-bold rounded-full"
          style={{ backgroundColor: numberBgColor }}
        >
          {readingTime}m
        </div>
      </div>
    </section>
  )
}

export default ReadingTime
