import {
  ScrollToTopButton,
  Spinner,
  SuspenseWrapper,
} from '@/utils/lazyImports'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <SuspenseWrapper fallback={<Spinner />}>
      <main className="flex-grow">
        <Outlet />
      </main>
      <ScrollToTopButton />
    </SuspenseWrapper>
  )
}

export default RootLayout
