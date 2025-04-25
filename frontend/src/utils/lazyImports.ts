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
  'animated-score',
  'exceeded-sentences',
  'promoted-posts',
  'radar-chart',
  'radar-chart-section',
  'reading-time',
  'repeated-words',
  'scanned-posts-history',
].map((component) =>
  React.lazy(() => import(`../components/data-display/${component}.tsx`)),
)

export const [
  ExceededSentencesBox,
  FeaturesSection,
  ReadingTimeBox,
  WordFrequencyBox,
] = [
  'exceeded-sentences-box',
  'features-section',
  'reading-time-box',
  'word-frequency-box',
].map((component) =>
  React.lazy(() => import(`../components/features/${component}.tsx`)),
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
  'card',
  'header',
  'hero-section',
  'our-socials-section',
  'trusted-by-section',
  'try-now-section',
  'video-modal',
].map((component) =>
  React.lazy(() => import(`../components/homepage/${component}.tsx`)),
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
  'canvas-cursor',
  'dark-mode-toggle',
  'fireworks-canvas',
  'intro',
  'loading-error-messages',
  'scroll-arrow',
  'scroll-to-top-button',
  'spinner',
  'subfooter',
  'subheader',
  'typewriter-effect',
].map((component) =>
  React.lazy(() => import(`../components/ui/${component}.tsx`)),
)

export const [SuspenseWrapper] = ['suspense-wrapper'].map((component) =>
  React.lazy(() => import(`../components/wrappers/${component}.tsx`)),
)
