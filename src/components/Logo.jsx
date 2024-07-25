import React from "react";
import logo from "@/assets/images/logo-f.png";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="w-[37%] h-[60px] flex justify-center items-center">
      <Link to="/">
        <img src={logo} alt="Logo" className="h-full object-cover w-full" />
      </Link>
    </div>
  );
}
