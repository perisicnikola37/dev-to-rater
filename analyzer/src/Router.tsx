import { Routes, Route } from 'react-router-dom'
import RootLayout from './pages/layouts/RootLayout'
import DevToPostAnalyzer from './pages/DevToPostAnalyzer'
import HomePage from './pages/HomePage'
import Blogs from './pages/Blogs'
import { FrontendApplicationRoutes } from './utils/constants/configuration'

const Router = () => {
  return (
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
}

export default Router
