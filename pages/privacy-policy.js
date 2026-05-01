import React from "react";
import dynamic from "next/dynamic";
import { getValue } from "/utils/lodash";
import Head from "next/head";

const Banner = dynamic(() => import("@components/privacy-policy/banner.js"));
const Innerpage = dynamic(() =>
  import("@components/privacy-policy/inner-page.js")
);
const Layout = dynamic(() => import("@components/layout"));
import PreviousPage from "@components/previous-page";
import DynamicBreadcrumb from "@components/breadcrumbs";
import { fetchPages } from "@services/APIs/common.service";

export async function getServerSideProps() {
  try {
    const where = {
      "filters[slug][$eq]": "privacy",
    };
    const resp = await fetchPages(where);
    const privacy = getValue(resp, `data[0].content`, "");

    return {
      props: {
        privacy,
      },
    };
  } catch (error) {
    return {
      props: {
        privacy: "",
      },
    };
  }
}

export default function Privacypolicy({ privacy }) {
  const breadcrumbItems = [{ label: "Home", link: "/" }, { label: "Privacy " }];

  return (
    <>
      <Head>
        <title>Project Overview</title>
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
          <Innerpage privacy={privacy} />
        </div>
      </Layout>
    </>
  );
}
