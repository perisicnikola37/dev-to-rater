import { MdContentCopy } from 'react-icons/md'
import Collapsible from 'react-collapsible'
import { Toaster, toast } from 'sonner'
import { FinalResponse } from '@/core/types/FinalResponse'
import { SuccessMessages } from '@/utils/constants/messages'
import { EXCEEDED_SENTENCES } from '@/core/types/MessageCategories'
import { getRandomMessage } from '@/utils/utilities'
import { MAX_VISIBLE_EXCEEDED_SENTENCES } from '@/utils/constants/configuration'

const ExceededSentences = ({ content }: { content: FinalResponse | null }) => {
  const WORDS_LIMIT_PER_SENTENCE = 20

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch((error) => {
      alert('Failed to copy text: ' + error)
    })
  }

  const renderSentence = (sentence: string) => {
    const words = sentence.split(' ')
    const exceededWords = words.slice(WORDS_LIMIT_PER_SENTENCE)
    const normalWords = words.slice(0, WORDS_LIMIT_PER_SENTENCE)

    return (
      <div className="mt-4 p-4 w-full text-left border border-blue-400 rounded-lg shadow-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 relative">
        <button
          onClick={() => {
            handleCopy(sentence)
            toast.success(SuccessMessages.TextCopied)
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
          <span className="font-semibold">{exceededWords.length} words</span>
        </p>
      </div>
    )
  }

  if (!content) return null

  return (
    <div>
      <Toaster />
      <h2 className="text-3xl text-center mt-12 mb-8 font-bold">
        Exceeded Sentences
        {content.exceeded.exceededSentences.length === 0 && (
          <p className="mt-4 text-lg font-light text-green-600">
            {getRandomMessage(EXCEEDED_SENTENCES)}
          </p>
        )}
      </h2>

      {content.exceeded.exceededSentences
        .slice(0, MAX_VISIBLE_EXCEEDED_SENTENCES)
        .map((sentence, index) => (
          <div key={index}>{renderSentence(sentence)}</div>
        ))}

      {content.exceeded.exceededSentences.length >
        MAX_VISIBLE_EXCEEDED_SENTENCES && (
        <Collapsible
          trigger={
            <div className="flex items-center mt-4 text-blue-600 font-semibold cursor-pointer">
              <span className="mr-2">Expand more</span>
            </div>
          }
        >
          {content.exceeded.exceededSentences
            .slice(MAX_VISIBLE_EXCEEDED_SENTENCES)
            .map((sentence, index) => (
              <div key={index}>{renderSentence(sentence)}</div>
            ))}
        </Collapsible>
      )}
    </div>
  )
}

export default ExceededSentences
