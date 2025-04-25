import React from 'react'

export const [
  AnimatedScore,
  ExceededSentences,
  PromotedPosts,
  RadarChart,
  RadarChartSection,
  ReadingTime,
  RepeatedWords,
  ScannedPostsHistory,
] = [
  'AnimatedScore',
  'ExceededSentences',
  'PromotedPosts',
  'RadarChart',
  'RadarChartSection',
  'ReadingTime',
  'RepeatedWords',
  'ScannedPostsHistory',
].map((component) =>
  React.lazy(() => import(`../components/DataDisplay/${component}.tsx`)),
)

export const [
  ExceededSentencesBox,
  FeaturesSection,
  ReadingTimeBox,
  WordFrequencyBox,
] = [
  'ExceededSentencesBox',
  'FeaturesSection',
  'ReadingTimeBox',
  'WordFrequencyBox',
].map((component) =>
  React.lazy(() => import(`../components/Features/${component}.tsx`)),
)

export const [
  Card,
  Header,
  HeroSection,
  OurSocialsSection,
  TrustedBySection,
  TryNowSection,
  VideoModal,
] = [
  'Card',
  'Header',
  'HeroSection',
  'OurSocialsSection',
  'TrustedBySection',
  'TryNowSection',
  'VideoModal',
].map((component) =>
  React.lazy(() => import(`../components/HomePage/${component}.tsx`)),
)

export const [
  CanvasCursor,
  DarkModeToggle,
  FireworksCanvas,
  Intro,
  LoadingErrorMessages,
  ScrollArrow,
  ScrollToTopButton,
  Spinner,
  SubFooter,
  SubHeader,
  TypewriterEffect,
] = [
  'CanvasCursor',
  'DarkModeToggle',
  'FireworksCanvas',
  'Intro',
  'LoadingErrorMessages',
  'ScrollArrow',
  'ScrollToTopButton',
  'Spinner',
  'SubFooter',
  'SubHeader',
  'TypewriterEffect',
].map((component) =>
  React.lazy(() => import(`../components/UI/${component}.tsx`)),
)

export const [SuspenseWrapper] = ['SuspenseWrapper'].map((component) =>
  React.lazy(() => import(`../components/Wrappers/${component}.tsx`)),
)
