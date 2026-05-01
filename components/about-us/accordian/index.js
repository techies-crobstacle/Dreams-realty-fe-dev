import React from "react";
import { getValue } from "/utils/lodash";
import ReactMarkdown from "react-markdown";

const Accordian = ({ faqList }) => {
  return (
    <div className="project-qanda-wrapper">
      <div className="project-qanda-wrapper--title mb-4">
        <h2>FAQ</h2>
        <p>Have a question? We’ve got you covered with FAQ’s</p>
      </div>
      {faqList.map((eachElement, index) => {
        return (
          <div className="project-qanda-wrapper--accordian">
            <input
              type="checkbox"
              id={"faqa" + index}
              name="project-qanda-accordian"
              className="hidden-input"
            ></input>
            <label
              htmlFor={"faqa" + index}
              className="d-flex align-items-center justify-content-between project-qanda-wrapper--accordian--header"
            >
              <div className="question">
                <div
                  dangerouslySetInnerHTML={{
                    __html: getValue(eachElement, "question"),
                  }}
                />
              </div>
              <img
                src="/images/about-us/expand.svg"
                className="img-fluid"
                alt="expand-icon"
              />
            </label>

            <div className="project-qanda-wrapper--accordian--body">
              {/* <div
                dangerouslySetInnerHTML={{
                  __html: getValue(eachElement, "answer"),
                }}
              /> */}
              <ReactMarkdown>{getValue(eachElement, "answer")}</ReactMarkdown>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordian;
