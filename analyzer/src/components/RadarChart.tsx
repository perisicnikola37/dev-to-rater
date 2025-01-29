import { RadarComponentProps } from '@/interfaces/props/RadarComponentProps'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  RadarChart,
  Tooltip,
} from 'recharts'

const RadarComponent: React.FC<RadarComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer className="select-none" width="100%" height={350}>
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        width={800}
        height={500}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis
          angle={30}
          domain={[0, Math.max(...data.map((d) => d.fullMark))]}
        />
        <Radar
          name="Total"
          dataKey="A"
          stroke="#4FD6FF"
          fill="#4FD6FF"
          fillOpacity={0.6}
          isAnimationActive={true}
        />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default RadarComponent
