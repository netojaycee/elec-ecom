import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import Products from "./Products";

export default function Landing() {
  return (
    <>
    <div className="flex flex-col gap-5">
      <Hero />
      <Categories />
      <Products />
      </div>
    </>
  );
}
