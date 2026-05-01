import Head from "next/head";
import { getValue } from "/utils/lodash";
const Meta = (props) => (
  <Head>
    <title>
      {getValue(
        props,
        `title`,
        "Dreams Realty | Real Estate | Property in Bangalore | Buy/Sale Properties"
      )}
    </title>
    <meta
      name="description"
      content={getValue(
        props,
        `description`,
        "Search Real Estate Properties in Bangalore , the best property site in Bangalore. Buy, Sell, Rent residential and commercial properties"
      )}
    />
    <meta property="og:type" content="website" />
    <meta
      name="og:title"
      property="og:title"
      content={getValue(
        props,
        `title`,
        "Dreams Realty | Real Estate | Property in Bangalore | Buy/Sale Properties"
      )}
    />
    <meta
      name="og:description"
      property="og:description"
      content={getValue(
        props,
        `description`,
        "Search Real Estate Properties in Bangalore , the best property site in Bangalore. Buy, Sell, Rent residential and commercial properties"
      )}
    />
    <meta property="og:site_name" content="Dreams Realty" />
    <meta
      property="og:url"
      content={typeof window !== "undefined" && window.location.href}
    />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/favicon.png" />
    <meta
      property="og:image"
      content={getValue(
        props,
        "image",
        `backend.dreamsrealty.co.in/uploads/futuro_hprop1_2x_da9345c38e.png`
      )}
    />
    <meta
      name="keywords"
      content={getValue(
        props,
        "keywords",
        "Real Estate, Property in Bangalore, Properties, Property sites Bangalore"
      )}
    />
  </Head>
);
export default Meta;
