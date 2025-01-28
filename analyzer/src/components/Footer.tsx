import { CORE_LOGIC_DOCUMENTATION_URL } from '../utils/constants/configuration'

const Footer = () => {
  return (
    <footer>
      <p className="text-center mt-10 mb-10">
        Wondering how we measure metrics? Check our documentation&nbsp;
        <a
          href={CORE_LOGIC_DOCUMENTATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400"
          title="View the core logic documentation"
          aria-label="View the core logic documentation"
        >
          here.
        </a>
      </p>
    </footer>
  )
}

export default Footer
