import React from "react";

export default function PageTitle({ title }) {
  return (
    <>
      <div className="bg-background_bl text-white p-4 w-[93%] mx-auto mt-4">
        <h1>{title}</h1>
      </div>
    </>
  );
}
