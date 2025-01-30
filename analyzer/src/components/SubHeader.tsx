import { BASE_URLS } from '@/utils/constants/configuration'
import { getDocumentationURL } from '@/utils/utilities'
import ReactGA from 'react-ga4'

const documentationURL = getDocumentationURL()

const SubHeader = () => {
  const handleDocsClick = () => {
    ReactGA.event({
      category: 'User',
      action: 'Clicked documentation link',
      label: 'Docs[Header]',
    })
  }

  const handleRepoClick = () => {
    ReactGA.event({
      category: 'User',
      action: 'Clicked repository link',
      label: 'Repo[Header]',
    })
  }

  return (
    <section className="absolute top-5 right-20 flex items-center space-x-4">
      <a
        className="border-b border-transparent hover:border-b-1 hover:border-b-blue-500 duration-200"
        href={documentationURL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View the documentation"
        title="View the documentation"
        onClick={handleDocsClick}
      >
        docs
      </a>
      <a
        href={BASE_URLS.REPOSITORY}
        target="_blank"
        rel="noopener noreferrer"
        title="Visit the GitHub repository"
        aria-label="Visit GitHub repository"
        onClick={handleRepoClick}
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
