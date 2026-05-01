import { getValue } from "/utils/lodash";
import ReactMarkdown from "react-markdown";

const containsHTML = (str) => {
  const div = document.createElement("div");
  div.innerHTML = str;
  return div.childNodes.length > 0 && div.childNodes[0].nodeType === 1;
};

export default function About(props) {
  const content = getValue(props, "propertyInfo.about", "");

  return (
    <div className="property-details-wrapper--body--information--about property-details-section-separation my-3">
      <h3 className="property-details-title">About</h3>
      <div>
        {containsHTML(content) ? (
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        ) : (
          <ReactMarkdown>{content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
}
