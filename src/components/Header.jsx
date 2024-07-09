import React from "react";
import Logo from "./Logo";
import { BsSearch } from "react-icons/bs";
import { IoCart } from "react-icons/io5";
import { FaHeart, FaRegUser } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { RiMenu3Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function MobileSidebar({ open, setOpen, openDrawer, closeDrawer }) {
  return (
    <React.Fragment>
      <Drawer
        placement="right"
        open={open}
        onClose={closeDrawer}
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Material Tailwind
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <Typography color="gray" className="mb-8 pr-4 font-normal">
          Material Tailwind features multiple React and HTML components, all
          written with Tailwind CSS classes and Material Design guidelines.
        </Typography>
        <div className="flex gap-2">
          <Button size="sm" variant="outlined">
            Documentation
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default function Header() {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  return (
    <>
      <div className="bg-secondary mt-3 mx-auto w-[93%] rounded-md py-3 2xl:py-10 px-7 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center w-[65%] gap-5">
            <Logo />
            <div className="items-center gap-2 w-[54%] hidden lg:flex">
              <div className="relative w-full">
                <input
                  type="text"
                  name="search"
                  className="p-2 pl-10 rounded-md w-full"
                  placeholder="Search..."
                />
                <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
              </div>
              <button className="bg-primary px-4 py-2 rounded-md text-white">
                Search
              </button>
            </div>
          </div>
          <div className="w-[35%] flex items-center justify-end gap-5">
            <div className="flex items-center gap-2 text-white lg:hidden">
              <BsSearch className="h-4 w-4" />
            </div>
            <Link to="/cart" className="flex items-center gap-2 text-white">
              <IoCart className="border border-white rounded-full h-6 w-6 p-1" />
              <span className="text-sm hidden lg:block">Cart</span>
            </Link>
            <Link
              to="/saved-items"
              className="items-center gap-2 text-white lg:flex hidden"
            >
              <FaHeart className="border border-white rounded-full h-6 w-6 p-1 " />{" "}
              <span className="text-sm">Saved Items</span>
            </Link>
            <div className="hidden lg:flex items-center gap-2 text-white">
              <FaRegUser className="border border-white rounded-full h-6 w-6 p-1 " />{" "}
              <span className="text-sm flex items-center gap-1">
                My Profile <IoIosArrowDown />
              </span>
            </div>
            <div className="flex lg:hidden items-center gap-2 text-white">
              <RiMenu3Line
                onClick={openDrawer}
                className="h-6 w-6 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <MobileSidebar
        open={open}
        setOpen={setOpen}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
      />
    </>
  );
}
