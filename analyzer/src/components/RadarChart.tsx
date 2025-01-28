import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  RadarChart,
} from 'recharts'
import { RadarComponentProps } from '../interfaces/props/RadarComponentProps'

const RadarComponent: React.FC<RadarComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar
          name="Content"
          dataKey="A"
          stroke="#4FD6FF"
          fill="#4FD6FF"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default RadarComponent
