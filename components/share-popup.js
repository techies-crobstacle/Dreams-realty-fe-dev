import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Head from "next/head";
import { getValue } from "/utils/lodash";
// import fetchSalePropertyBySlug from "@services/queries/salePropertyBySlug/fetchRentPropertyBySlug";
import Meta from "pages/seo-meta";
// import fetchProjectBySlugs from 'services/projectBySlug/fetchProjectBySlug';

export default function sharePopup(props) {
  const copyToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast.success("Link copied to clipboard");
  };
  const detectMobileDevice = () => {
    if (typeof window) {
      let check = false;
      (function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    }
  };

  const redirectToWhatsApp = () => {
    if (detectMobileDevice()) {
      window.location.href = `whatsapp://send?text=${
        typeof window !== "undefined" && window.location.href
      }`;
    } else {
      window.location.href = `https://web.whatsapp.com/send?text=${
        typeof window !== "undefined" && window.location.href
      }`;
    }
  };
  return (
    <>
      <Head>
        <title>Property Details</title>
        <meta
          name="description"
          content={getValue(
            props,
            "meta_description",
            "Search Real Estate Properties in Bangalore , the best property site in Bangalore. Buy, Sell, Rent residential and commercial properties"
          )}
        />
        <meta
          property="og:title"
          content={getValue(
            props,
            "meta_title",
            "Dreams Realty | Real Estate | Property in Bangalore | Buy/Sale Properties"
          )}
        />
        <meta
          property="og:url"
          content={typeof window !== "undefined" && window.location.href}
        />
        <meta
          property="og:description"
          content={getValue(
            props,
            "meta_description",
            "Search Real Estate Properties in Bangalore , the best property site in Bangalore. Buy, Sell, Rent residential and commercial properties"
          )}
        />
        <meta
          property="og:image"
          content={getValue(
            props,
            "meta_image",
            "backend.dreamsrealty.co.in/uploads/futuro_hprop1_2x_da9345c38e.png"
          )}
        />
      </Head>
      <div
        className={
          props.showPopup ? "share-review-popup active" : "share-review-popup"
        }
      >
        <div className="share-review-popup-wrapper">
          <div className="share-review-popup-wrapper__header d-flex align-items-center justify-content-between">
            <h2 className="share-review-popup-wrapper__title">Share</h2>
            <img
              src="/images/closeSVG.svg"
              className="img-fluid cursor-pointer"
              onClick={props.hideSharePopup}
              alt="close-icon"
            />
          </div>
          <div className="share-review-popup-wrapper__body">
            <div className="share-review-popup-wrapper__icons ">
              {/* <a
                // web
                href={`https://web.whatsapp.com/send?text=${
                  typeof window !== 'undefined' && window.location.href
                }`}
                // mobile
                // href={`whatsapp://send?text=${
                // 	typeof window !== "undefined" && window.location.href
                // }`}
                target="_blank"
              > */}
              <a
                className="cursor-pointer"
                onClick={() => {
                  redirectToWhatsApp();
                }}
              >
                <img
                  src="/images/rewars-share-icons/whatsapp.png"
                  className="img-fluid"
                  alt="whatsapp-icon"
                />
                <p
                  rel="nofollow noopener"
                  className="share-review-popup-wrapper__text"
                >
                  Whatsapp
                </p>
              </a>
            </div>
            <div className="share-review-popup-wrapper__icons">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${
                  typeof window !== "undefined" && window.location.href
                }`}
                target="_blank"
              >
                <img
                  src="/images/rewars-share-icons/facebook.png"
                  className="img-fluid"
                  alt="facebook-icon"
                />
                <p className="share-review-popup-wrapper__text">Facebook</p>
              </a>
            </div>
            <div className="share-review-popup-wrapper__icons">
              <a
                href={`http://twitter.com/share?url=${
                  typeof window !== "undefined" && window.location.href
                }`}
                target="_blank"
              >
                <img
                  src="/images/rewars-share-icons/twitter.png"
                  className="img-fluid share-review-popup-wrapper__img-border"
                  alt="twitter-icon"
                />
                <p className="share-review-popup-wrapper__text">Twitter</p>
              </a>
            </div>

            <div className="share-review-popup-wrapper__icons">
              <a
                href={`https://www.linkedin.com/feed/`}
                target="_blank"
                onClick={() =>
                  copyToClipboard(
                    `${typeof window !== "undefined" && window.location.href}`
                  )
                }
              >
                <img
                  src="/images/rewars-share-icons/linkedin.png"
                  className="img-fluid share-review-popup-wrapper__img-border"
                  alt="linkedin-icon"
                />
                <p className="share-review-popup-wrapper__text">Linkedin</p>
              </a>
            </div>
            <div className="share-review-popup-wrapper__icons">
              <a
                target="_blank"
                href={`mailto:?subject=&body=${
                  typeof window !== "undefined" && window.location.href
                }`}
              >
                <img
                  src="/images/rewars-share-icons/email.png"
                  className="img-fluid share-review-popup-wrapper__img-border"
                  alt="email-icon"
                />
                <p className="share-review-popup-wrapper__text">Email</p>
              </a>
            </div>

            <div className="share-review-popup-wrapper__icons">
              <a
                href={`https://www.instagram.com/`}
                target="_blank"
                onClick={() =>
                  copyToClipboard(
                    `${typeof window !== "undefined" && window.location.href}`
                  )
                }
              >
                <img
                  src="/images/rewars-share-icons/instagram.png"
                  className="img-fluid"
                  alt="instagram-icon"
                />
                <p className="share-review-popup-wrapper__text">Instagram</p>
              </a>
            </div>
          </div>
          <div
            className="share-review-popup-wrapper__footer d-flex align-items-center justify-content-between"
            onClick={() =>
              copyToClipboard(
                `${typeof window !== "undefined" && window.location.href}`
              )
            }
          >
            <a>{typeof window !== "undefined" && window.location.href}</a>
            <img
              src="/images/copySVG.svg"
              className="img-fluid cursor-pointer"
              alt="clipboard-icon"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      query: query,
    },
  };
}
