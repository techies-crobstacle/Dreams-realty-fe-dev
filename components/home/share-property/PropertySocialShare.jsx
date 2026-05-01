import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Image from "next/image";
import { toast } from "react-toastify";

const PropertySocialShare = ({ modal, toggle, propertySlug }) => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast("Copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const sharePlatforms = [
    {
      name: "Whatsapp",
      icon: "/images/rewars-share-icons/whatsapp.png",
      link: (url) =>
        `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
    },
    {
      name: "Facebook",
      icon: "/images/rewars-share-icons/facebook.png",
      link: (url) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
    },
    {
      name: "Twitter",
      icon: "/images/rewars-share-icons/twitter.png",
      link: (url) => `http://twitter.com/share?url=${encodeURIComponent(url)}`,
    },
    {
      name: "Linkedin",
      icon: "/images/rewars-share-icons/linkedin.png",
      link: (url) =>
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          url
        )}`,
    },
    {
      name: "Email",
      icon: "/images/rewars-share-icons/email.png",
      link: (url) => `mailto:?subject=&body=${encodeURIComponent(url)}`,
    },
    // {
    //   name: "Instagram",
    //   icon: "/images/rewars-share-icons/instagram.png",
    //   // Instagram doesn't support sharing via URL
    //   link: () => {
    //     toast("Please copy the link to share on Instagram.");
    //     return "#";
    //   },
    // },
  ];

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Share</ModalHeader>
      <ModalBody>
        <div className="d-flex justify-content-between flex-wrap">
          {sharePlatforms.map(({ name, icon, link }) => (
            <a
              key={name}
              href={link(currentUrl + propertySlug)}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex flex-column align-items-center justify-content-center gap-2"
            >
              <Image src={icon} alt={`${name}-icon`} width={30} height={30} />
              <p className="share-review-popup-wrapper__text">{name}</p>
            </a>
          ))}
        </div>
        <div
          className="mt-5 d-flex justify-content-between align-items-center gap-5"
          onClick={() => {
            copyToClipboard(currentUrl + propertySlug);
            toggle();
          }}
        >
          <a>{currentUrl + propertySlug}</a>
          <Image
            src="/images/copySVG.svg"
            alt="clipboard-icon"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default PropertySocialShare;
