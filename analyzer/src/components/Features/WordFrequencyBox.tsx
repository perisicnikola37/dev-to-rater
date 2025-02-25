import MotionWrapper from '../Wrappers/MotionWrapper'
import wordFrequency from '@/assets/images/word_frequency.webp'

const WordFrequencyBox = () => {
  return (
    <MotionWrapper.div
      className="w-full lg:w-2/3 flex flex-col items-center h-96 rounded-l-none border-l-0 border border-gray-700 p-4"
      whileInView={{ x: 0, opacity: 1 }}
      initial={{ x: 200, opacity: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="self-center text-center flex items-center space-x-3">
        <div>
          <h3 className="text-2xl font-semibold">Word Frequency</h3>
          <p className="text-gray-500">
            Repeated words are not a problem anymore.
          </p>
        </div>
      </div>
      <div className="flex justify-center h-full p-8 w-full">
        <img
          loading="lazy"
          className="select-none object-contain"
          src={wordFrequency}
          alt="Dev.to Rater - Word repetition frequency"
        />
      </div>
    </MotionWrapper.div>
  )
}

export default WordFrequencyBox
