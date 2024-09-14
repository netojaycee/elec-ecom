import React from "react";
import logo from "@/assets/images/logo.png";
import logoblack from "@/assets/images/logo-black.jpg";
import { Link } from "react-router-dom";

export default function Logo({ black }) {
  return (
    <>
      {!black ? (
        <div className="w-[37%] h-[60px] flex justify-center items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-full object-cover w-full" />
          </Link>
        </div>
      ) : (
        <div className="w-[37%] h-[60px] flex justify-center items-center">
          <Link to="/">
            <img src={logoblack} alt="Logo" className="h-full object-cover w-full" />
          </Link>
        </div>
      )}
    </>
  );
}
