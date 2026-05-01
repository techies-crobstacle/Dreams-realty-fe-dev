import PreviousPage from "@components/previous-page";
import React from "react";

function DynamicBreadcrumb({ items, textblack, textWhite }) {
  return (
    <div className="d-flex align-items-center" style={{padding:"8px"}}>
        <PreviousPage isCompact={false} />
        <div style={{ marginLeft: "30px" }}>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${
              index === items.length - 1 ? "active" : ""
            } ${textWhite && "backslashStyle"}`}
          >
            {index === items.length - 1 ? (
              <span
                style={{
                  fontWeight: "500",
                  color: `${textWhite ? "#eaeaea" : "#000"}`,
                }}
              >
                {item.label}
              </span>
            ) : (
              <>
                <a
                  href={item.link}
                  style={{
                    color: `${textWhite && "#aeaeae"}`,
                  }}
                  className="backslashStyle"
                >
                  {item.label}
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
    </div>
    </div>
  );
}

export default DynamicBreadcrumb;
