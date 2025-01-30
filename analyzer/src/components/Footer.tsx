import { APPLICATION_VERSION } from '@/utils/constants/configuration'
import { getDocumentationURL } from '@/utils/utilities'

const documentationURL = getDocumentationURL()

const Footer = () => {
  return (
    <footer>
      <p className="text-center mt-10 mb-10">
        Wondering how we measure metrics? Check our documentation&nbsp;
        <a
          href={
            documentationURL +
            `/versions/${APPLICATION_VERSION}/essentials/paragraphs`
          }
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
