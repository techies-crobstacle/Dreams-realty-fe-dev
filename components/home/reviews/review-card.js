import React from "react";
import StarRatings from "react-star-ratings";
import { getValue } from "/utils/lodash";

export default class ReviewCard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      viewMore: false,
    };
  }

  handleChange = () => {
    this.setState({
      viewMore: !this.state.viewMore,
    });
  };

  render() {
    return (
      <div className="review-card">
        {/* <img
          src={getValue(
            this.props,
            `reviewArray.profile_photo_url`,
            "/dafault.png"
          )}
          className="img-fluid person-card-img"
          alt="user-image"
        /> */}
        <h5>{getValue(this.props, `reviewArray.author_name`, "")}</h5>
        <div className="ratings-wrapper">
          <StarRatings
            rating={getValue(this.props, `reviewArray.rating`, 0)}
            starRatedColor="#f9be2b"
            starDimension="24px"
            starSpacing="2px"
            numberOfStars={5}
            name="rating"
          />
        </div>
        {!this.state.viewMore ? (
          <p>
            {getValue(this.props, `reviewArray.text`, "")
              .substring(0, 180)
              .concat("...")}
            <span
              style={{ color: "#3C67A4", cursor: "pointer" }}
              onClick={this.handleChange}
            >
              {" "}
              Read More
            </span>
          </p>
        ) : (
          <p>
            {getValue(this.props, `reviewArray.text`, "")}
            <span
              style={{ color: "#3C67A4", cursor: "pointer" }}
              onClick={this.handleChange}
            >
              {" "}
              Read Less
            </span>
          </p>
        )}
      </div>
    );
  }
}
