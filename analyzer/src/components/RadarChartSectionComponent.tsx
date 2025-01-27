import React from 'react'
import RadarComponent, { RadarData } from './RadarChart'

interface RadarChartSectionProps {
  data: RadarData[]
}

const RadarChartSection: React.FC<RadarChartSectionProps> = ({ data }) => (
  <div className="mt-8 w-full flex justify-center">
    <div className="w-[2000px] text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Content Breakdown
      </h2>
      <RadarComponent data={data} />
    </div>
  </div>
)

export default RadarChartSection
