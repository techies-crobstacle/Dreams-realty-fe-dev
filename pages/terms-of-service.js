import React from "react";
import dynamic from "next/dynamic";
import { getValue } from "/utils/lodash";
import Head from "next/head";

const Banner = dynamic(() => import("@components/terms-of-service/banner.js"));
const Innerpage = dynamic(() =>
  import("@components/terms-of-service/inner-page.js")
);
const Layout = dynamic(() => import("@components/layout"));

import { fetchPages } from "@services/APIs/common.service";
import PreviousPage from "@components/previous-page";
import DynamicBreadcrumb from "@components/breadcrumbs";

export async function getServerSideProps() {
  try {
    const where = {
      "filters[slug][$eq]": "terms",
    };
    const resp = await fetchPages(where);
    const terms = getValue(resp, `data[0].content`, "");

    return {
      props: {
        terms,
      },
    };
  } catch (error) {
    return {
      props: {
        terms: "",
      },
    };
  }
}

export default function TermsOfService({ terms }) {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Terms of Service" },
  ];

  return (
    <>
      <Head>
        <title>Terms of Service</title>
      </Head>
      <Layout>
        <div className="privacy-policy-wrapper pb-5">
          {/* <div className="d-flex align-items-center mb-4">
            <PreviousPage isCompact={false} />
            <div style={{ marginLeft: "30px" }}>
            </div>
          </div> */}
              <DynamicBreadcrumb items={breadcrumbItems} />
          <Banner />
          <Innerpage terms={terms} />
        </div>
      </Layout>
    </>
  );
}
