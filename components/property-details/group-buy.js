import Popup2 from "@components/common-popup2/index.js";
import { useState } from "react";
import { toast } from "react-toastify";
import { postCreatePropertyEnquiry } from "@services/APIs/common.service";

export default function GroupBuy() {
  const [showDownloadPopup2, toogleDownloadPopup2] = useState(false);
  const [popupTitle, setPopuptitle] = useState("Group Buy");

  const [isLoading3, setIsLoading3] = useState(false);
  const [request3, setRequest3] = useState({
    name: "",
    phone: "",
    type: "group_buy",
  });
  const handleSubmit3 = () => {
    if (request3.name && request3.phone) {
      try {
        setIsLoading3(true);
        let request = {
          name: request3.name,
          phone: "+91" + request3.phone,
          type: "group_buy",
        };
        let resp = postCreatePropertyEnquiry({ data: request });
        if (resp) {
          toast.success("Submitted successfully");
          setIsLoading3(false);
          setRequest3({
            ...request3,
            name: "",
            phone: "",
          });
          toogleDownloadPopup2(false);
        } else {
          setIsLoading3(false);
        }
      } catch (error) {
        setIsLoading3(false);
      }
    } else {
      toast.error("Name and Mobile Number Required");
    }
  };
  const handleChange3 = (e) => {
    const { name, value } = e.target;
    setRequest3({
      ...request3,
      [name]: value,
    });
  };
  return (
    <div className="property-details-wrapper--body--information--group-buy">
      <h3 className="property-details-title">Group Buy</h3>
      <div className="d-flex flex-direction-column-mobile">
        <img
          src="/images/property-details/gropu-buy.svg"
          className="img-fluid"
          alt="filter-icon"
        />
        <div className="group-text">
          <h3>What is Group Buy?</h3>
          <p>
            Dreams Realty forms a group of interested property seekers to all
            the top developers across all the projects on a monthly basis to get
            you the absolute best discounted price for the property. It’s like
            choosing the “Unit of your choice” but getting a “Whole-sale” price
            for it.
          </p>
        </div>
      </div>
      <div className="text-center group-buy-btn">
        <button
          className="group-buy-button"
          onClick={() => {
            toogleDownloadPopup2(true);
          }}
        >
          Join the Group Now & Get the Best Price
        </button>

        <p className="contact-call-details text-center">
          Or Call{" "}
          <a href="tel:00919663982707" className="contact-call-details">
            +91 966 398 2707
          </a>{" "}
          /{" "}
          <a href="tel:+919513882269" className="contact-call-details">
            +91 95138 82269
          </a>{" "}
          /
          <a href="tel:+919069979997" className="contact-call-details">
            +91 90699 79997
          </a>
        </p>
      </div>
      <Popup2
        showPopup={showDownloadPopup2}
        hidePopup={() => {
          toogleDownloadPopup2(false);
        }}
        popupTitle={popupTitle}
        request={request3}
        handleChange={handleChange3}
        handleSubmit={handleSubmit3}
        isLoading={isLoading3}
      />
    </div>
  );
}
