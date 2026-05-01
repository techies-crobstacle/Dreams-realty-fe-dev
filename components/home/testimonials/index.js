import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Testimonial(props) {
  return (
    <section className="testimonial-wrapper">
      <div className="custom-container d-flex align-items-center justify-content-between flex-md-row flex-column-reverse py-5 gap-4">
        <div className="testimonial-wrapper--content">
              <h1 className='mb-4 home-banner-h1-tag'>What sets us apart</h1>
          <div className="testimonial-content-wrapper d-flex">
            <div className="chk-circle-image">
              <img
                src="/images/home/testimnoial/check-circle.svg"
                className="img-fluid"
                alt="check-with-circle-icon"
              />
            </div>
            <div className="testimonial-text">
              <h3>Comprehensive & Verified Properties</h3>
              <p>
                Our team personally verifies each property before listing them
                on the website, to offer you the best class facilities and
                living experience.
              </p>
            </div>
          </div>
          <div className="testimonial-content-wrapper d-flex">
            <div className="chk-circle-image">
              <img
                src="/images/home/testimnoial/check-circle.svg"
                className="img-fluid"
                alt="check-with-circle-icon"
              />
            </div>
            <div className="testimonial-text">
              <h3>
                Exhaustive search options for both renting and buying property
              </h3>
              <p>
                Most trusted realtor in Bangalore to enlist properties, offering
                you abundant options to choose from while you search for your
                dream home.
              </p>
            </div>
          </div>
          <div className="testimonial-content-wrapper d-flex">
            <div className="chk-circle-image">
              <img
                src="/images/home/testimnoial/check-circle.svg"
                className="img-fluid"
                alt="check-with-circle-icon"
              />
            </div>
            <div className="testimonial-text">
              <h3>Providing solutions for 15 Years</h3>
              <p>
                With a history of certitude in the industry, we continue to
                offer best investment decisions for our clients.
              </p>
              {props.buttonChange ? (
                <Link href="/list-step1">
                  <button className="theme-button theme-primary-btn testimonial-btn-variant">
                    Get Started Now
                  </button>
                </Link>
              ) : (
                <Link href="/contact-us">
                  <button className="theme-button testimonial-btn">
                    Contact Us Now
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="testimonial-wrapper--image">
          <Image
            src="/images/home/testimnoial/testimonial.webp"
            className="img-fluid dimention"
            alt="collage-of-modern-buildings-and-rooms"
            width={100}
            height={100}
            quality={50}
            unoptimized={true}
          />
        </div>
      </div>
    </section>
  );
}
