import React from 'react'

export const [
  AnimatedScore,
  FireworksCanvas,
  Header,
  URLForm,
  LoadingErrorMessages,
  RadarChartSection,
  ExceededSentences,
  Footer,
  SubHeader,
] = [
  'AnimatedScore',
  'FireworksCanvas',
  'Header',
  'URLForm',
  'LoadingErrorMessages',
  'RadarChartSection',
  'ExceededSentences',
  'Footer',
  'SubHeader',
].map((component) => React.lazy(() => import(`../components/${component}.tsx`)))

export const [OurSocials, TrustedBy, HeroSection, RaterDemoThumbnailPreview] = [
  'OurSocials',
  'TrustedBy',
  'HeroSection',
  'RaterDemoThumbnailPreview',
].map((component) =>
  React.lazy(() => import(`@/components/HomePage/${component}.tsx`)),
)

export const [Features] = ['Features'].map((component) =>
  React.lazy(() => import(`@/components/Features/${component}.tsx`)),
)
