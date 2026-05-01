import Link from "next/link";
import React from "react";
import Router from "next/router";

const Footer = () => {
  const socialLinks = [
    {
      name: "Twitter",
      url: "https://twitter.com/dreams_realty",
      icon: "/images/footer-icons/x-twitter.svg",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/residentialpropertymanagers/",
      icon: "/images/footer-icons/facebook.svg",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/dreamsrealty_whitefield/",
      icon: "/images/footer-icons/instagram.svg",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/channel/UCxjAlLiq8o_owRJPxBYGNHA",
      icon: "/images/footer-icons/youtube.svg",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/dreams-realty-pvt-ltd",
      icon: "/images/footer-icons/linkedin.svg",
    },
  ];

  const contactInfo = [
    { phone: "+91 8150041742", icon: "/images/footer-icons/phone.svg" },
    { phone: "+91 8553999922", icon: "/images/footer-icons/phone.svg" },
    { phone: "+91 9663982707", icon: "/images/footer-icons/phone.svg" },
    { email: "info@dreamsrealty.co.in", icon: "/images/footer-icons/mail.svg" },
  ];

  const otherLinks = [
    { href: "/", label: "Home" },
    { href: "/property-for-sale", label: "Properties for Sale" },
    { href: "/property-for-rent", label: "Properties for Rent" },
    {
      href: "/search-properties?page=0&type=1",
      label: "Properties by Developers",
    },
    {
      href: "/search-properties?page=0&type=1",
      label: "Properties by Location",
    },
    { href: "/blog", label: "Blogs" },
    { href: "/guidelines-value", label: "Guidelines Value" },
  ];

  const companyLinks = [
    { href: "/about-us", label: "About us" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/career", label: "Career" },
  ];

  const [currentYear, setCurrentYear] = React.useState("");

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

   const handleNavigate = (path, type) => {
    Router.push({
      path,
      query: { page: 0, type },
    });
  };

  return (
    <footer className="footer-wrapper" role="contentinfo">
      <div className="custom-container">
        <div className="footer-wrapper--header d-flex align-items-center justify-content-between flex-direction-column-mobile">
          <div className="icon-logo d-flex align-items-center">
            <p className="mr-5 me-5">Follow us</p>
            <ul className="social-links">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.name} page`}
                    className="social-link"
                  >
                    <img src={social.icon} alt={`${social.name} icon`} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-wrapper--body">
          <div className="company-details d-flex justify-content-between flex-direction-column-mobile">
            <div className="logo">
              <div className="logo-wrapper d-flex align-items-center">
                <h2 className="white-color">
                  <img
                    src="/images/home/site-logo/logo.png"
                    className="img-fluid"
                    alt="Dreams Realty Logo"
                  />
                </h2>
              </div>
              <p>
                We maintain an updated list of homes and other specialty
                properties available for buyers. Sellers who work with Dreams
                Realty can be assured that their properties will be marketed
                extensively until a suitable buyer is found.
              </p>
            </div>

            <div className="sales common">
              <h5 className="bold-font">SALES & SUPPORT</h5>
              <ul className="mt-4">
                {contactInfo.map((contact, index) => (
                  <li key={index} className="pb-2">
                    <Link
                      href={
                        contact.phone
                          ? `tel:${contact.phone}`
                          : `mailto:${contact.email}`
                      }
                      className="contact-link"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={contact.icon}
                          className="mr-3"
                          alt={contact.phone ? "Phone icon" : "Email icon"}
                        />
                        {contact.phone || contact.email}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="others common">
              <h5 className="bold-font">OTHERS</h5>
              <ul className="mt-4">
                {otherLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="company common">
              <h5 className="bold-font">COMPANY</h5>
              <ul className="mt-4">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-wrapper--footer d-flex align-items-center justify-content-between mt-5 flex-direction-column-mobile">
          <div className="footer-links">
            <ul>
              <li>
                <Link href="/privacy-policy" className="footer-link">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="footer-link">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <p>
            Copyright © {currentYear} Dreams Realty. All Rights
            Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
