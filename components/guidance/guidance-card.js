import Link from "next/link";
import React from "react";
import Moment from "react-moment";
import { getValue } from "/utils/lodash";

export default function GuidanceCard(props) {
  return (
    <Link href={`/${props.path}/${getValue(props, "blogCardObj.slug")}`}>
      <section
        className={
          props.aditionalClass
            ? `${props.aditionalClass} blog-card-wrapper`
            : "blog-card-wrapper"
        }
      >
        <img
          src={
            process.env.NEXT_PUBLIC_API_URL +
            getValue(props, `blogCardObj.cover_image.url`, "")
          }
          className="img-fluid blog-cover-image"
          alt="blog-cover-image"
        />
        <div className="blog-card-wrapper--contents">
          <h4 className="guidance-card-title-bold">
            {props.blogCardObj.title}
          </h4>
          <p className="blog-card-date">
            <Moment format="MMM DD, YYYY">{props.blogCardObj.createdAt}</Moment>
          </p>
        </div>
      </section>
    </Link>
  );
}
