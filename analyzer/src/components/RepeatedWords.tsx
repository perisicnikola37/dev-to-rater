import { FinalResponse } from '@/core/types/FinalResponse'
import { REPEATED_WORDS } from '@/core/types/MessageCategories'
import { MAX_VISIBLE_REPEATED_WORDS } from '@/utils/constants/configuration'
import { getRandomMessage } from '@/utils/utilities'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  Cell,
  TooltipProps,
} from 'recharts'
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

const RepeatedWords = ({ content }: { content: FinalResponse | null }) => {
  if (!content) {
    return <div>No data available</div>
  }

  const { repeatedWords } = content.exceeded

  const data = repeatedWords.map((word) => ({
    name: `${word.word} (x${word.count})`,
    count: word.count,
  }))

  // Sort the data based on repetition count
  const sortedData = data.sort((a, b) => a.count - b.count)

  const limitedData =
    sortedData.length > MAX_VISIBLE_REPEATED_WORDS
      ? sortedData.slice(-MAX_VISIBLE_REPEATED_WORDS)
      : sortedData

  // Calculate the middle point to divide the data into 3 groups
  const totalCount = limitedData.length
  const third = Math.floor(totalCount / 3)

  // Assign colors based on the group (small, medium, large count)
  const colorGroups = limitedData.map((item, index) => {
    let color = ''
    if (index < third) {
      color = '#38A169' // Green for small count
    } else if (index < 2 * third) {
      color = '#ECC94B' // Yellow for medium count
    } else {
      color = '#F56565' // Red for high count
    }
    return { ...item, color }
  })

  const totalRepeats = repeatedWords.reduce((sum, word) => sum + word.count, 0)
  const averageRepeats = totalRepeats / repeatedWords.length

  return (
    <>
      <h2 className="text-3xl text-center mt-12 mb-8 font-bold">
        Repeated Words
        {content.exceeded.repeatedWords.length === 0 && (
          <p className="mt-4 text-lg font-light text-green-600">
            {getRandomMessage(REPEATED_WORDS)}
          </p>
        )}
      </h2>
      {content.exceeded.repeatedWords.length !== 0 && (
        <>
          <div className="text-center text-lg mt-4 mb-4">
            <strong>Avg. word frequency:</strong>&nbsp;
            <span
              className={
                averageRepeats <= 5
                  ? 'text-green-600' // Green if average is good
                  : averageRepeats <= MAX_VISIBLE_REPEATED_WORDS
                    ? 'text-yellow-400' // Yellow if average is risky
                    : 'text-red-600' // Red if average is bad
              }
            >
              {Math.round(averageRepeats)}&nbsp;
              {averageRepeats <= 5
                ? '(good)' // Good repetition rate
                : averageRepeats <= MAX_VISIBLE_REPEATED_WORDS
                  ? '(risky)' // Risky repetition rate
                  : '(bad)'}{' '}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={colorGroups} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" axisLine={false} display="none" />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                display="none"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" barSize={35}>
                {colorGroups.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
                <LabelList
                  dataKey="count"
                  position="right"
                  textAnchor="middle"
                  dx={1}
                  fill={'#fff'}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </>
  )
}

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (!active || !payload || !payload.length) return null

  return (
    <div className="bg-white shadow-md px-3 py-2 rounded-md border border-gray-300 text-gray-900 text-sm">
      {payload[0].payload.name}
    </div>
  )
}

export default RepeatedWords
