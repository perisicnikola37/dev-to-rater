import { ChangedWordsProps } from '@/interfaces/props/RefactoredInfo'
import { FireworksCanvas } from '@/utils/lazyImports'

const RefactoredInfo: React.FC<ChangedWordsProps> = ({
  changedWords,
  isContentVisible,
}) => {
  return (
    <>
      {!isContentVisible && (
        <section className="mt-8 w-full flex justify-center">
          <div className="max-w-screen-xl w-full text-center">
            {changedWords.length > 0 ? (
              <div className="overflow-x-auto">
                <h2 className="text-2xl font-bold mb-6 text-left">
                  Changed Words
                </h2>
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                        Original
                      </th>
                      <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700"></th>
                      <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                        After
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {changedWords
                      .filter((word) => word.original !== word.changed)
                      .map((word, index) => (
                        <tr
                          key={index}
                          className="border-t border-gray-200 hover:bg-gray-100 transition-all duration-200"
                        >
                          <td className="px-4 py-2 text-lg text-gray-700">
                            {word.original}
                          </td>
                          <td className="px-4 py-2 text-2xl text-green-500">
                            →
                          </td>
                          <td className="px-4 py-2 text-lg font-semibold text-gray-600 underline">
                            {word.changed}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                <p className="text-xl mt-10 mb-5">
                  Great post sensei 🚀 Nothing to refactor.
                </p>
                <span id="dev-to-rater" className="text-3xl">
                  Keep writing. &nbsp;
                </span>
                <FireworksCanvas />
              </>
            )}
          </div>
        </section>
      )}
    </>
  )
}

export default RefactoredInfo
