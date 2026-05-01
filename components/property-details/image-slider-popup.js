import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getValue } from "/utils/lodash";
import { textFormat } from "@common/formatText";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgRotate from "lightgallery/plugins/rotate";

export default function PropertyImagesSlider(props) {
  const extractTitle = (url) => {
    const filename = url.split("/").pop() || "";
    const title = filename.split("_").slice(0, -1).join("-");
    return title;
  };

  return (
    <section className="property-banners-wraper position-relative">
      {getValue(props, "propertyInfo.property_construction_status", "") && (
        <div className="property-banners-wraper--badge position-absolute">
          <p>
            {textFormat(
              getValue(props, "propertyInfo.property_construction_status", "")
            )}
          </p>
        </div>
      )}

      {getValue(props, "images", "") && (
        <LightGallery
          plugins={[lgZoom, lgThumbnail, lgFullscreen, lgRotate]}
          speed={500}
          download={true}
          selector=".lightgallery-item" // Specify selector to target items
        >
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={"auto"}
            autoplay={{ delay: 3000 }}
            navigation={true}
          >
            {getValue(props, "images", []).map((image, index) => (
              <SwiperSlide
                key={`slider${index}`}
                style={{ width: "fit-content" }}
              >
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
                  data-src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`} // LightGallery attribute for image source
                  className="lightgallery-item"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
                    height="300"
                    className="img-fluid"
                    alt={extractTitle(image.url)}
                    style={{ height: "189px", maxWidth: "none" }}
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </LightGallery>
      )}
    </section>
  );
}
