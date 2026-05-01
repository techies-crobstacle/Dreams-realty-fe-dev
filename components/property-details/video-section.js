import { useState } from "react";
import { getValue } from "/utils/lodash";

export default function Video(props) {
  const [showVideo, setShowVideo] = useState(false);
  const video =
    getValue(props, "propertyInfo.video_url", "") &&
    getValue(props, "propertyInfo.video_url", "").split(
      "https://www.youtube.com/watch?v="
    )[1];
  const fVideos =
    !video &&
    getValue(props, "propertyInfo.video_url", "") &&
    getValue(props, "propertyInfo.video_url", "").split("https://youtu.be/")[1];
  const videos = !video
    ? !video && fVideos && fVideos.split("&t=")[0]
    : video && !fVideos && video.split("&t=")[0];
  return (
    <div className="property-details-wrapper--body--information--video-section property-details-section-separation">
      <h3 className="property-details-title">Video</h3>
      {showVideo ? (
        <iframe
          width="100%"
          height="269"
          // src={`https://www.youtube.com/embed/${video?video:videos}?autoplay=1&rel=0`}
          src={`https://www.youtube.com/embed/${videos}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          className="video-section--video"
        ></iframe>
      ) : (
        <div className="position-relative">
          {/* <img
              src="/images/property-details/vdo-img.webp"
              className="img-fluid w-100 video-section--banner"
            /> */}
          <img
            src={
              getValue(props, `propertyInfo.video_cover_image.url`, "")
                ? process.env.NEXT_PUBLIC_API_URL +
                  getValue(props, `propertyInfo.video_cover_image.url`, "")
                : process.env.NEXT_PUBLIC_API_URL +
                  getValue(props, `propertyInfo.cover_image.url`, "")
            }
            className="video-section--banner img-fluid w-100"
            alt="property-images"
          />
          <div
            className="d-flex align-items-center position-absolute video-play"
            onClick={() => {
              setShowVideo(true);
            }}
          >
            <img
              src="/images/property-details/play_circle_filled_black_24dp.svg"
              alt="play-with-circle-icon"
            />
            <p className="ml-2">Play Video</p>
          </div>
        </div>
      )}
    </div>
  );
}
