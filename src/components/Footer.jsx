import React from "react";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="bg-secondary px-4 py-8">
      <div className="flex flex-col lg:flex-row justify-between items-center w-[80%] mx-auto text-[#6D758F]">
        <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-start w-full lg:w-auto order-1 lg:order-3">
          <div className="flex items-center gap-4">
            <Link to="/">Home</Link>
            {/* <Link to="/about">About</Link> */}
            <Link to="/support">Support</Link>
            <Link to="/contact-us">Contact</Link>
          </div>
          <div className="flex items-center gap-4 text-white">
            <a href="" target="_blank" rel="noopener noreferrer">
              {" "}
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61562272645038&mibextid=LQQJ4d"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiFacebook />
            </a>{" "}
            <a href="" target="_blank" rel="noopener noreferrer">
              <FaXTwitter />
            </a>
          </div>
        </div>
        <hr className="w-full my-4 lg:hidden order-2 lg:order-2" />
        <div className="order-3 lg:order-1 text-center lg:text-left w-full lg:w-auto">
          <div>Copyright © 2024 Online Store | All Rights Reserved</div>
        </div>
      </div>
    </div>
  );
}
