import { useState, useEffect } from "react";
import axios from "axios";
import Content from "../interfaces/Content";

const useFetchHTMLContent = (url: string) => {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const contentClass = ".crayons-article__body";

  useEffect(() => {
    const fetchHTMLContent = async () => {
      try {
        setLoading(true);

        const response = await axios.get<string>(url);
        const htmlString = response.data;

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        const articleBody = doc.querySelector(contentClass);

        console.log(articleBody);

        if (!articleBody) {
          throw new Error("Article body not found in the HTML.");
        }

        const headings = Array.from(articleBody.querySelectorAll("h2"))
          .map((h2) => h2.textContent?.trim() || "")
          .filter((text) => text !== "");

        const paragraphs = Array.from(articleBody.querySelectorAll("p"))
          .map((p) => p.textContent?.trim() || "")
          .filter((text) => text !== "");

        const images = Array.from(articleBody.querySelectorAll("img"))
          .map((img) => ({
            src: img.src,
            alt: img.alt || "",
            width: img.width || 0,
            height: img.height || 0,
          }))
          .filter((img) => img.src !== "");

        const links = Array.from(articleBody.querySelectorAll("a"))
          .map((a) => {
            const text = a.textContent?.trim() || "No text";
            return {
              href: a.href,
              text: text,
            };
          })
          .filter((link) => link.text !== "No text");

        setContent({ headings, paragraphs, images, links });
      } catch (err) {
        setError(
          (err as Error).message || "Failed to fetch and parse content."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHTMLContent();
  }, [url]);

  return { content, loading, error };
};

export default useFetchHTMLContent;
