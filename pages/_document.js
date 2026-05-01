import Document, { Html, Head, Main, NextScript } from "next/document";
import Meta from "./seo-meta";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps?.(ctx);
    return { ...initialProps };
  }

  render() {
    const links = [
      //   { rel: "canonical", href: process.env.CANONICAL_URL },
      { rel: "shortcut icon", href: "/favicon.png" },
    ];
    return (
      <Html lang="en">
        <Head>
          <Meta
            title={"Dreams Realty"}
            description={"Find your perfect Home here"}
            image={
              "backend.dreamsrealty.co.in/uploads/futuro_hprop1_2x_da9345c38e.png"
            }
          />
          {/* 5970CNK0BS */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-5970CNK0BS`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-5970CNK0BS');

          `,
            }}
          />
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NTLSD5RH');`,
            }}
          /> */}

          {links.map((link, index) => (
            <link key={index} {...link} />
          ))}
        </Head>
        <body>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-NTLSD5RH"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
