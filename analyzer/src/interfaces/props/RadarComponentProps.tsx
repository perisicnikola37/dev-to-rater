export interface RadarData {
  subject: string
  A: number
  fullMark: number
}

export interface RadarComponentProps {
  data: RadarData[]
}
