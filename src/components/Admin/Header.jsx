import React, { useState } from "react";

import { FaSignOutAlt, FaRegUser, FaUserEdit } from "react-icons/fa";
import { BiBasket } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/appData";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { persistor } from "../../redux/store";
import { useSelector } from "react-redux";

export function ProfileInfo() {
  const [openPopover, setOpenPopover] = React.useState(false);
  const user = useSelector((state) => state.user); // Get user state from Redux
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const { name, email } = user; // Destructure name and email from user
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      await persistor.purge();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <div className="hidden lg:flex items-center gap-2 text-white">
          <FaRegUser className="border border-white rounded-full h-6 w-6 p-1" />
          <span className="text-sm flex items-center gap-1">
            Hello, {name || "Guest"} <IoIosArrowDown />
          </span>
        </div>
      </PopoverHandler>
      <PopoverContent
        {...triggers}
        className="z-50 max-w-[16rem] bg-white shadow-lg p-4 rounded-lg"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <FaRegUser className="text-gray-600" />
            <span className="font-semibold text-gray-800">
              {name || "Guest"}
            </span>
          </div>
          <hr className="border-gray-300" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Link
                to={"/my-orders"}
                className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
              >
                <BiBasket className="text-gray-600" />
                <span>My Orders</span>
              </Link>
              <IoIosArrowForward className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between">
              <Link
                to="/settings"
                className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
              >
                <FaUserEdit className="text-gray-600" />
                <span>Settings</span>
              </Link>
              <IoIosArrowForward className="text-gray-400" />
            </div>
            {isAdmin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
                  <FaUserEdit className="text-gray-600" />
                  <span>Dashboard</span>
                </div>
                <IoIosArrowForward className="text-gray-400" />
              </div>
            )}
            <hr className="w-[90%] mx-auto" />
            <span
              onClick={handleLogout}
              className="cursor-pointer text-red-500 flex items-center gap-2"
            >
              <FaSignOutAlt className="text-red-500" /> Sign Out
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function Header() {
  return (
<div className="bg-white h-[60px] fixed top-0 w-full p-3 flex items-end justify-between">
    kn
      <ProfileInfo />
    </div>
  );
}
