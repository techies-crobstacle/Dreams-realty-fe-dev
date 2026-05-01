"use client";

import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

// Dynamically import components
const Header = dynamic(() => import("@components/header/header.js"));
const Footer = dynamic(() => import("@components/footer/index.js"));
// const WhatsappShare = dynamic(() => import("@components/whats-app-share/index.js"));

export default function Layout({ children, isAdmin, toggleModal }) {
  const router = useRouter();
  let hideSubFooterFlag = false;
  if (router.pathname === "/") {
    hideSubFooterFlag = true;
  }
  if (router.pathname === "/inter-font") {
    if (process.browser) {
      document.querySelector("body").classList.add("interfont");
    }
  }
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="favicon.png" type="image/png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <script
          type="text/javascript"
          src="https://st-beta-storage.blr1.cdn.digitaloceanspaces.com/sm-tools/integration-supercrm.js"
          id="supercrm-wa-widget"
          widget-id="clzh8k9ps002wfompu5uoozaq"
          defer
        ></script> */}
      </Head>
      <Header isAdmin={isAdmin} toggleModal={toggleModal} />
      {/* <WhatsappShare /> */}
      
      <main>
        {children}
        <Link href="https://api.whatsapp.com/send?phone=918553999922&amp" target="_blank" rel="noopener noreferrer" className="fixed right-6 bottom-6 z-[1000] cursor-pointer" style={{position: "fixed", right: "1.5rem", bottom: "1.5rem", zIndex: 1000}}>
          <Image
            src="/wa-icon.png"
            alt="Floating Icon"
            width={56}
            height={56}
            className="w-14 h-14"
          />
        </Link>
        {/* <Link href="https://web.whatsapp.com/send?text=Greetings%20from%20Dreams%20Realty%0a%0aName:%0aPhone%20Number:%0aMessage:%0a&phone=919663982707" target="_blank" rel="noopener noreferrer" className="fixed right-6 bottom-6 z-[1000] cursor-pointer" style={{position: "fixed", right: "1.5rem", bottom: "1.5rem", zIndex: 1000}}>
          <Image
            src="/wa-icon.png"
            alt="Floating Icon"
            width={56}
            height={56}
            className="w-14 h-14"
          />
        </Link> */}
      </main>
      <Footer />
    </>
  );
}
