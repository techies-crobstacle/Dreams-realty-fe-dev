import React from "react";
import { getValue } from "/utils/lodash";
import ReactMarkdown from "react-markdown";
export default class Innerpage extends React.Component {
  render() {
    return (
      <section className="inner-page-wrapper section-padding">
        <div className="custom-container">
          {/* <p
            dangerouslySetInnerHTML={{ __html: getValue(this.props, "terms") }}
          /> */}
          <ReactMarkdown>{getValue(this.props, "terms")}</ReactMarkdown>
        </div>
      </section>
    );
  }
}
