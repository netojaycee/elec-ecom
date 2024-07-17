import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import { Helmet } from "react-helmet";

// Utility function to convert string to title case
function toTitleCase(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Utility function to generate dynamic meta descriptions
function getMetaDescription(titleSegment) {
  switch (titleSegment) {
    case "Home":
      return "Welcome to Elect, your ultimate destination for the latest and greatest in electrical gadgets.";
    case "Product":
      return "Explore a wide range of high-quality electrical gadgets and products at Elect.";
    case "Search":
      return "Find the best deals on electrical gadgets with our comprehensive search functionality.";
    case "All Products":
      return "Browse through our extensive collection of electrical gadgets and find the perfect one for you.";
    // Add more cases as needed
    default:
      return "Discover the latest in electrical gadgets and products at Elect.";
  }
}

// Utility function to generate dynamic keywords
function getMetaKeywords(titleSegment) {
  switch (titleSegment) {
    case "Home":
      return "electrical gadgets, latest gadgets, electronics, online store";
    case "Product":
      return "electrical gadgets, electronics, product details, buy gadgets";
    case "Search":
      return "search gadgets, find gadgets, best deals, online store";
    case "All Products":
      return "all products, electrical gadgets, electronics, browse gadgets";
    // Add more cases as needed
    default:
      return "electrical gadgets, electronics, online store, buy gadgets";
  }
}

export function BreadCrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const titleCasePathnames = pathnames.map((value) => toTitleCase(value));
  const lastSegment = pathnames[pathnames.length - 1];
  const titleCaseSegment = lastSegment ? toTitleCase(lastSegment) : "Home";
  const excludeBreadcrumb = ["/"];
  const excludePageTitle = [
    "/",
    "/order-confirm",
    "/contact-us",
    "/support",
    "/error",
    "/about",
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

  const searchParams = new URLSearchParams(location.search);
  const isSearch = searchParams.get("search");

  const showFilter =
    location.pathname === "/all-products" ||
    /^\/all-categories\/.+/.test(location.pathname) ||
    isSearch;

  const metaDescription = getMetaDescription(titleCaseSegment);
  const metaKeywords = getMetaKeywords(titleCaseSegment);

  return (
    <>
      <Helmet>
        <title>{`${titleCaseSegment} - Elect`}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Elect" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
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
                    <span>{isSearch ? `search for ${isSearch}` : value}</span>
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
      {!shouldExcludePageTitle && (
        <PageTitle title={isSearch ? "showing search results" : titleCaseSegment} showFilter={showFilter} />
      )}
    </>
  );
}
