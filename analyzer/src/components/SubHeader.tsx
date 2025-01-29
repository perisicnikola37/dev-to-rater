import {
  DOCUMENTATION_URL,
  REPOSITORY_URL,
} from '@/utils/constants/configuration'

const SubHeader = () => {
  return (
    <section className="absolute top-5 right-20 flex items-center space-x-4">
      <a
        className="border-b border-transparent hover:border-b-1 hover:border-b-blue-500 duration-200"
        href={DOCUMENTATION_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View the documentation"
        title="View the documentation"
      >
        docs
      </a>
      <a
        href={REPOSITORY_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Visit the GitHub repository"
        aria-label="Visit GitHub repository"
      >
        <img
          alt="GitHub repository stars badge"
          src="https://img.shields.io/github/stars/perisicnikola37/dev-to-rater"
        />
      </a>
    </section>
  )
}

export default SubHeader
