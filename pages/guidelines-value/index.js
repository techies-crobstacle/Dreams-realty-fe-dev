"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { getValue } from "/utils/lodash";
import { fetchGuidanceValues } from "@services/APIs/common.service";
import PreviousPage from "@components/previous-page";
import DynamicBreadcrumb from "@components/breadcrumbs";
import { useRouter } from "next/router";

const Layout = dynamic(() => import("@components/layout.js"));
const GuidanceCard = dynamic(() =>
  import("@components/guidance/guidance-card.js")
);

export default function blogPage() {
  const router = useRouter();
  const { query } = router;
  const [guidanceValueList, setGuidanceValueList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(
    query.page ? parseInt(query.page) : 1
  );
  const [limit, setLimit] = useState(9);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    getBlogs();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageNumber]);

  const getBlogs = async () => {
    try {
      setIsLoading(true);
      let resp = await fetchGuidanceValues({
        "pagination[page]": pageNumber,
        "pagination[pageSize]": limit,
      });
      if (resp) {
        setIsLoading(false);
        setGuidanceValueList(getValue(resp, "data", []));
        setPageNumber(getValue(resp, "meta.pagination.page", 1));
        setTotalCount(getValue(resp, "meta.pagination.total", 0));
        setPageCount(getValue(resp, "meta.pagination.pageCount", 1));
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Guidelines Value" },
  ];

  return (
    <Layout>
      <section className="blog-wrapper">
        <div className="d-flex align-items-center mb-4">
          <PreviousPage isCompact={false} />
          <div style={{marginLeft: "30px" }}>
            <DynamicBreadcrumb items={breadcrumbItems} />
          </div>
        </div>
        <div className="custom-container">
          <div className="blog-wrapper--title">
            <h4 className="blog-title">Guidance Value</h4>
          </div>
          {isLoading ? (
            "Please wait..."
          ) : (
            <div className="blog-wrapper--body">
              {guidanceValueList.length !== 0
                ? guidanceValueList.map((tempObj, index) => {
                    return (
                      <GuidanceCard
                        blogCardObj={tempObj}
                        key={index}
                        aditionalClass="guidelines-card"
                        path={"guidelines-value"}
                      />
                    );
                  })
                : "No Data Found"}
            </div>
          )}
          {pageCount > 1 && (
            <div className="blog-wrapper--footer">
              <Pagination>
                <PaginationItem disabled={pageNumber <= 1}>
                  <PaginationLink
                    previous
                    onClick={() => setPageNumber(pageNumber - 1)}
                  />
                </PaginationItem>

                {[...Array(pageCount)].map((_, i) => (
                  <PaginationItem active={i + 1 === pageNumber} key={i}>
                    <PaginationLink onClick={() => setPageNumber(i + 1)}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem disabled={pageNumber >= pageCount}>
                  <PaginationLink
                    next
                    onClick={() => setPageNumber(pageNumber + 1)}
                  />
                </PaginationItem>
              </Pagination>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
