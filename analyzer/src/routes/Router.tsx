import HomePage from '@/pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import { FrontendApplicationRoutes } from './routes'
import RootLayout from '@/pages/layouts/RootLayout'
import DevToPostAnalyzer from '@/pages/DevToPostAnalyzer'
import Blogs from '@/pages/Blogs'

const Router = () => (
  <Routes>
    <Route path={FrontendApplicationRoutes.HOME} element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route
        path={FrontendApplicationRoutes.RATER}
        element={<DevToPostAnalyzer />}
      />
      <Route path={FrontendApplicationRoutes.BLOGS} element={<Blogs />} />
    </Route>
  </Routes>
)

export default Router
