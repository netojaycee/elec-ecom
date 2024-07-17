import React from "react";
import logo from "@/assets/images/logo.png";

export default function Logo() {
  return (
    <div className="w-[25%] flex justify-center">
      {/* <span className="rounded-full py-2 px-3 bg-blue-gray-600 text-white text-center ">
        L
      </span> */}
      <img
        src={logo}
        alt=""
        className="lg:w-[170px] lg:h-[60px] object-contain"
      />
    </div>
  );
}
