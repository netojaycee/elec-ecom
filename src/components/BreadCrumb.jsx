import { Breadcrumbs } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import PageTitle from "./PageTitle";

// Utility function to convert string to title case
function toTitleCase(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function BreadCrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const titleCasePathnames = pathnames.map((value) => toTitleCase(value));
  const lastSegment = pathnames[pathnames.length - 1];
  const titleCaseSegment = lastSegment && toTitleCase(lastSegment);

  const excludeBreadcrumb = ["/"];
  const excludePageTitle = [
    "/",
    "/order-confirm",
    "/contact-us",
    "/support",
    "/error",
    "/about",
    "/all-products",
  ];

  // Paths with dynamic segments (using regex)
  const dynamicExcludePatterns = [
    /^\/product\/.+/,
    /^\/search\/.+/,
    /^\/all-products\/.+/,
  ];

  // Check if the current path matches any static or dynamic exclude pattern
  const shouldExcludePageTitle =
    excludePageTitle.includes(location.pathname) ||
    dynamicExcludePatterns.some((pattern) => pattern.test(location.pathname));

  return (
    <>
      {!excludeBreadcrumb.includes(location.pathname) && (
        <div className="bg-secondary rounded-b-lg py-3 2xl:py-8 px-4 lg:px-8 w-[60%] lg:w-[30%] ml-[4%]">
          <div className="flex items-center text-[#cacaca] text-[10px] lg:text-[14px]">
            <Link to="/" className="opacity-60">
              Home
            </Link>
            {titleCasePathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === titleCasePathnames.length - 1;

              return (
                <React.Fragment key={to}>
                  <span className="mx-2">/</span>
                  {isLast ? (
                    <span>{value}</span>
                  ) : (
                    <Link to={to} className="opacity-60">
                      {value}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
      {/* page title */}
      {!shouldExcludePageTitle && <PageTitle title={titleCaseSegment} />}
    </>
  );
}
