import { Outlet } from 'react-router-dom'
import SuspenseWrapper from '@/components/SuspenseWrapper'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import Spinner from '@/components/Spinner'

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
