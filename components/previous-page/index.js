"use client";
import React from "react";
import { useRouter } from "next/router";

function PreviousPage({ isCompact, style, navigate }) {
  const router = useRouter();

  const goBack = () => {
    event.preventDefault();
    router.back();
  };

  // Define styles for the regular button
  const regularButtonStyle = {
    border: "none",
    background: "#fff",
    cursor: "pointer",
    outline: "none",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
    // marginTop: "20px",
    // marginLeft: "20px",
    zIndex: "999",
  };

  


  // Define styles for the compact button
  const compactButtonStyle = {
    ...regularButtonStyle,
    position: "absolute",
  };

  const imgStyle = {
    width: "20px",
  };

  // Select the appropriate style based on the prop value
  const buttonStyle = isCompact ? compactButtonStyle : regularButtonStyle;

  // Merge additional styles passed via the style prop
  const mergedButtonStyle = { ...buttonStyle, ...style };

  return (
    <div>
      <button onClick={navigate ? navigate : goBack} style={mergedButtonStyle}>
        <img
          src="/images/home/slider-controls/arrow-back.svg"
          alt="chevron-left-icon"
          style={imgStyle}
        />
      </button>
    </div>
  );
}

export default PreviousPage;
