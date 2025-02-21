import {
  ExceededSentencesBox,
  ReadingTimeBox,
  WordFrequencyBox,
} from '@/utils/lazyImports'

const FeaturesSection = () => {
  return (
    <section className="bg-black text-white w-full min-h-screen pt-20 flex flex-col justify-center items-center relative overflow-hidden">
      <div className="w-4/5 mx-auto">
        <ExceededSentencesBox />

        <div className="flex flex-col lg:flex-row w-full space-y-4 lg:space-y-0 lg:space-x-4">
          <ReadingTimeBox />
          <WordFrequencyBox />
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
