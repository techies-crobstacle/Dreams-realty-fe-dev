import Link from "next/link";
import React from "react";
import DynamicBreadcrumb from "@components/breadcrumbs";
import PreviousPage from "@components/previous-page";
import { useRouter } from "next/router";

export default function PropertyLinks() {
  const router = useRouter();
  const propertyType = router.query.property_type;
  const rentHref = propertyType
    ? `/property-for-rent?property_type=${propertyType}`
    : "/property-for-rent";

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Properties for Sale", link: "/property-for-sale" },
  ];

  return (
    <section className="property-for-sale-wrapper">
          <DynamicBreadcrumb items={breadcrumbItems} />
      <div className="custom-container">
        <h1 style={{ fontSize: "2rem", fontWeight: "500" }}>
          Dreams Realty: unlock the home that inspires you
        </h1>
        <div className="property-for-sale-wrapper--banner-links">
          <ul>
            <li>
              <Link
                href="/property-for-sale"
                className="active cursor-pointer"
              >
                Properties to Buy
              </Link>
            </li>
            <li>
              <Link href={rentHref}>Properties to Rent</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
