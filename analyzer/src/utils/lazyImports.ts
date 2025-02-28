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
  ScannedPostsHistory,
  ScrollToTopButton,
  Spinner,
  SuspenseWrapper,
  ReadingTime,
  RepeatedWords,
  PromotedPosts,
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
  'ScannedPostsHistory',
  'ScrollToTopButton',
  'Spinner',
  'SuspenseWrapper',
  'ReadingTime',
  'RepeatedWords',
  'PromotedPosts',
].map((component) => React.lazy(() => import(`../components/${component}.tsx`)))

export const [
  OurSocialsSection,
  TrustedBySection,
  HeroSection,
  RaterDemoThumbnailPreview,
  TryNowSection,
] = [
  'OurSocialsSection',
  'TrustedBySection',
  'HeroSection',
  'RaterDemoThumbnailPreview',
  'TryNowSection',
].map((component) =>
  React.lazy(() => import(`@/components/HomePage/${component}.tsx`)),
)

export const [FeaturesSection] = ['FeaturesSection'].map((component) =>
  React.lazy(() => import(`@/components/Features/${component}.tsx`)),
)

export const [ExceededSentencesBox, ReadingTimeBox, WordFrequencyBox] = [
  'ExceededSentencesBox',
  'ReadingTimeBox',
  'WordFrequencyBox',
].map((component) =>
  React.lazy(() => import(`@/components/Features/${component}.tsx`)),
)
