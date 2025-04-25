import { Link } from 'react-router-dom'

interface BreadcrumbProps {
  className?: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ className }) => {
  return (
    <nav
      className={`flex text-sm font-medium text-gray-500 space-x-2 ${className}`}
    >
      <Link to="/" className="hover:text-blue-600">
        Home
      </Link>
      <span>/</span>
      <Link to="/category" className="hover:text-blue-600">
        Category
      </Link>
      <span>/</span>
      <Link to="/category/subcategory" className="hover:text-blue-600">
        Subcategory
      </Link>
      <span>/</span>
      <span className="text-gray-400">Current Page</span>
    </nav>
  )
}

export default Breadcrumb
