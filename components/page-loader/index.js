import HeaderLoading from "@components/page-loader/header-loading.js";
import { useRouter } from "next/router";

export default function LoadingShimmer() {
  const router = useRouter();
  const hideHeaderArray = ["/"];
  let hideSubFooterFlag = false;
  if (hideHeaderArray.includes(router.pathname)) {
    hideSubFooterFlag = true;
  }
  return (
    <>
      {hideSubFooterFlag ? <HeaderLoading /> : ""}
      <div className="loading-banner-wrapper">
        <div className="loading-banner-wrapper__banner animate-loader pt-5 pl-4 pr-4">
          <div className="loading-banner-wrapper__search-box-wrapper mt-2 mt-sm-5"></div>
          <div className="loading-banner-wrapper__banner-caption"></div>
        </div>
      </div>
    </>
  );
}
