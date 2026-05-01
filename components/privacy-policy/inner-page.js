import React from "react";
import { getValue } from "/utils/lodash";
import ReactMarkdown from "react-markdown";
export default class Innerpage extends React.Component {
  render() {
    return (
      <section className="inner-page-wrapper section-padding">
        <div className="custom-container">
          {/* <p>{getValue(this.props,'privacy')}</p> */}
          {/* <p dangerouslySetInnerHTML={{ __html: getValue(this.props, 'privacy') }} /> */}
          <ReactMarkdown>{getValue(this.props, "privacy")}</ReactMarkdown>
        </div>
      </section>
    );
  }
}
