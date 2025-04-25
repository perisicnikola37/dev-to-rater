import { Suspense } from 'react'

const SuspenseWrapper = ({
  children,
  fallback,
}: {
  children: React.ReactNode
  fallback: React.ReactNode
}) => <Suspense fallback={fallback}>{children}</Suspense>

export default SuspenseWrapper
