import Blogs from '@/pages/blogs'
import DevToPostAnalyzer from '@/pages/dev-to-post-analyzer'
import HomePage from '@/pages/homepage'
import RootLayout from '@/pages/layouts/RootLayout'
import { Route, Routes } from 'react-router-dom'
import { FrontendApplicationRoutes } from './routes'

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
