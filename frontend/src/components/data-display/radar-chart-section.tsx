import { RadarChartSectionProps } from '@/interfaces/props/RadarChartSection'
import React from 'react'
import RadarComponent from './radar-chart'

const RadarChartSection: React.FC<RadarChartSectionProps> = ({ data }) => {
  return (
    <section className="mt-8 w-full flex justify-center">
      <div className="max-w-screen-xl w-full text-center">
        <h2 className="text-2xl font-semibold mb-4">Content Breakdown</h2>
        {data && <RadarComponent data={data} />}
      </div>
    </section>
  )
}

export default RadarChartSection
