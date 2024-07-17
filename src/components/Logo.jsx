import React from "react";
import logo from "@/assets/images/logo-f.png";

export default function Logo() {
  return (
    <div className="w-[30%] h-[60px] flex justify-center items-center">
      <img
        src={logo}
        alt="Logo"
        className="h-full object-cover w-full"
      />
    </div>
  );
}
