import { Routes, Route } from 'react-router-dom'
import RootLayout from './pages/layouts/RootLayout'
import DevToPostAnalyzer from './pages/DevToPostAnalyzer'
import HomePage from './pages/HomePage'
import Blogs from './pages/Blogs'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />

        <Route path="/rater" element={<DevToPostAnalyzer />} />
        <Route path="/blogs" element={<Blogs />} />
      </Route>
    </Routes>
  )
}

export default Router
