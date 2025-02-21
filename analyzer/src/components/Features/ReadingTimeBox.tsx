import MotionWrapper from '../Wrappers/MotionWrapper'
import readingTime from '@/assets/reading_time.webp'

const ReadingTimeBox = () => {
  return (
    <MotionWrapper.div
      className="w-full lg:w-1/3 flex flex-col items-center h-96 rounded-l-lg border border-gray-700 p-4"
      whileInView={{ x: 0, opacity: 1 }}
      initial={{ x: -200, opacity: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="self-center text-center flex items-center space-x-3">
        <div>
          <h3 className="text-2xl font-semibold">Reading Time</h3>
          <p className="text-gray-500">Find the perfect balance.</p>
        </div>
      </div>
      <img
        loading="lazy"
        src={readingTime}
        alt="Dev.to Rater - Reading time of blog post"
        className="w-full mt-5 h-full overflow-auto object-cover select-none"
      />
    </MotionWrapper.div>
  )
}

export default ReadingTimeBox
