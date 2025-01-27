import { FinalResponse } from '../core/types/FinalResponse'
import { MdContentCopy } from 'react-icons/md'
import Collapsible from 'react-collapsible'
import { Toaster, toast } from 'sonner'
import { SuccessMessages } from '../utils/messages'

const ExceededSentences = ({ content }: { content: FinalResponse | null }) => {
  const WORDS_LIMIT_PER_SENTENCE = 20
  const MAX_VISIBLE_SENTENCES = 3

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch((error) => {
      alert('Failed to copy text: ' + error)
    })
  }

  return (
    <div>
      <Toaster />
      {content && content?.exceeded.exceededSentences.length > 0 && (
        <>
          <h2 className="text-2xl text-center mt-10 mb-10 font-semibold text-gray-800">
            Exceeded Sentences
          </h2>

          {content?.exceeded.exceededSentences
            .slice(0, MAX_VISIBLE_SENTENCES)
            .map((sentence, index) => {
              const words = sentence.split(' ')
              const exceededWords = words.slice(WORDS_LIMIT_PER_SENTENCE)
              const normalWords = words.slice(0, WORDS_LIMIT_PER_SENTENCE)

              return (
                <div
                  key={index}
                  className="mt-4 p-4 w-full text-left border border-blue-400 text-black rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-200 relative"
                >
                  <button
                    onClick={() => {
                      handleCopy(sentence)
                      toast.success(SuccessMessages.TEXT_COPIED)
                    }}
                    className="cursor-pointer absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                  >
                    <MdContentCopy size={20} />
                  </button>

                  <p className="text-lg">
                    {normalWords.join(' ')}&nbsp;
                    <span className="line-through text-red-500">
                      {exceededWords.join(' ')}
                    </span>
                  </p>
                  <p className="text-sm mt-2 font-medium">
                    Exceeded by&nbsp;
                    <span className="font-semibold">
                      {exceededWords.length} words
                    </span>
                  </p>
                </div>
              )
            })}

          {content?.exceeded.exceededSentences.length >
            MAX_VISIBLE_SENTENCES && (
            <Collapsible
              trigger={
                <div className="flex items-center mt-4 text-blue-600 font-semibold cursor-pointer">
                  <span className="mr-2">Expand more</span>
                </div>
              }
            >
              {content?.exceeded.exceededSentences
                .slice(MAX_VISIBLE_SENTENCES)
                .map((sentence, index) => {
                  const words = sentence.split(' ')
                  const exceededWords = words.slice(WORDS_LIMIT_PER_SENTENCE)
                  const normalWords = words.slice(0, WORDS_LIMIT_PER_SENTENCE)

                  return (
                    <div
                      key={index}
                      className="mt-4 p-4 w-full text-left border border-blue-400 text-black rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-200 relative"
                    >
                      <button
                        onClick={() => {
                          handleCopy(sentence)
                          toast.success(SuccessMessages.TEXT_COPIED)
                        }}
                        className="cursor-pointer absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                      >
                        <MdContentCopy size={20} />
                      </button>

                      <p className="text-lg">
                        {normalWords.join(' ')}&nbsp;
                        <span className="line-through text-red-500">
                          {exceededWords.join(' ')}
                        </span>
                      </p>
                      <p className="text-sm mt-2 font-medium">
                        Exceeded by&nbsp;
                        <span className="font-semibold">
                          {exceededWords.length} words
                        </span>
                      </p>
                    </div>
                  )
                })}
            </Collapsible>
          )}
        </>
      )}
    </div>
  )
}

export default ExceededSentences
