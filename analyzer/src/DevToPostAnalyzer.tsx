// components/DevToPostAnalyzer.tsx
import React from "react";
import useFetchHTMLContent from "./hooks/useFetchHTMLContent";
import { isValidDevToLink } from "./utils/globals";

const DevToPostAnalyzer: React.FC = () => {
  const inputURL =
    "https://dev.to/perisicnikola37/new-css-media-queries-syntax-45og";

  const isValidURL = isValidDevToLink(inputURL);

  const { content, loading, error } = useFetchHTMLContent(
    isValidURL ? inputURL : ""
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Dev.to Post Analyzer</h1>
      {content && (
        <>
          <h2>Headings</h2>
          <ul>
            {content.headings.map((heading, index) => (
              <li key={index}>{heading}</li>
            ))}
          </ul>

          <h2>Paragraphs</h2>
          <ul>
            {content.paragraphs.map((paragraph, index) => (
              <li key={index}>{paragraph}</li>
            ))}
          </ul>

          <h2>Images</h2>
          <ul>
            {content.images.map((image, index) => (
              <li key={index}>
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                />
                <p>{image.alt}</p>
              </li>
            ))}
          </ul>

          <h2>Links</h2>
          <ul>
            {content.links.map((link, index) => (
              <li key={index}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DevToPostAnalyzer;
