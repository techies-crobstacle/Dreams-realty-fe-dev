import Link from "next/link";
import React from "react";
import PreviousPage from "@components/previous-page";
import DynamicBreadcrumb from "@components/breadcrumbs";
import { useRouter } from "next/router";

export default function PropertyLinks() {
  const router = useRouter();
  const propertyType = router.query.property_type;
  const saleHref = propertyType
    ? `/property-for-sale?property_type=${propertyType}`
    : "/property-for-sale";

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Properties for Rent", link: "/property-for-rent" },
  ];

  return (
    <section className="property-for-sale-wrapper">
          <DynamicBreadcrumb items={breadcrumbItems} />
      <div className="custom-container">
        <h1 style={{fontSize: "2rem", fontWeight: "500"}}>Dreams Realty: Where comfort meets style</h1>
        <div className="property-for-sale-wrapper--banner-links">
          <ul>
            <li>
              <Link href={saleHref}>Properties to Buy</Link>
            </li>
            <li>
              <Link
                href="/property-for-rent"
                className="active cursor-pointer"
              >
                Properties to Rent
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
