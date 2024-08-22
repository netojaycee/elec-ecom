import React, { useState } from "react";
import Logo from "./Logo";
import { BsSearch } from "react-icons/bs";
import { IoCart } from "react-icons/io5";
import {
  FaSave,
  FaShoppingCart,
  FaUserCog,
  FaThList,
  FaSignOutAlt,
  FaLightbulb,
  FaPlug,
  FaRegLightbulb,
  FaToolbox,
  FaRegClock,
  FaHeart,
  FaRegUser,
  FaUserEdit,
} from "react-icons/fa";
import { BiBasket, BiSearch } from "react-icons/bi";
import { RiMenu3Line } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import {
  useGetAllCategoryQuery,
  useGetAllProductQuery,
  useLogoutMutation,
} from "../redux/appData";
import {
  Drawer,
  IconButton,
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { persistor } from "../redux/store";

export function ProfileInfo() {
  const [openPopover, setOpenPopover] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
  const [logout, { isLoading, isError }] = useLogoutMutation(); // Destructure logout function and status
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout().unwrap(); // Call logout and wait for it to resolve
      await persistor.purge(); // Clear persisted state from local storage
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <div className="hidden lg:flex items-center gap-2 text-white">
          <FaRegUser className="border border-white rounded-full h-6 w-6 p-1 " />{" "}
          <span className="text-sm flex items-center gap-1">
            Hello, John <IoIosArrowDown />
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
            <span className="font-semibold text-gray-800">John Doe</span>
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
              <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
                <FaUserEdit className="text-gray-600" />
                <span>Account Management</span>
              </div>

              <IoIosArrowForward className="text-gray-400" />
            </div>
            <hr className="w-[90%] mx-auto" />
            <span
              onClick={handleLogout}
              className=" cursor-pointer text-red-500 flex items-center gap-2"
            >
              <FaSignOutAlt className="text-red-500" /> Sign Out
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function MobileSidebar({ open, closeDrawer }) {
  const { data: categories } = useGetAllCategoryQuery();
  const [logout, { isLoading, isError }] = useLogoutMutation(); // Destructure logout function and status
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout().unwrap(); // Call logout and wait for it to resolve
      await persistor.purge(); // Clear persisted state from local storage
      closeDrawer();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <React.Fragment>
      <Drawer
        placement="right"
        open={open}
        onClose={closeDrawer}
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <Logo />
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
        <nav className="flex flex-col gap-4">
          <Link
            onClick={closeDrawer}
            to="/saved-items"
            className="flex items-center gap-2 hover:text-blue-gray-800"
          >
            <FaSave /> <Typography color="gray">Saved Items</Typography>
          </Link>
          <Link
            onClick={closeDrawer}
            to="/my-orders"
            className="flex items-center gap-2 hover:text-blue-gray-800"
          >
            <FaShoppingCart /> <Typography color="gray">My Orders</Typography>
          </Link>
          <Link
            onClick={closeDrawer}
            to="/account-management"
            className="flex items-center gap-2 hover:text-blue-gray-800"
          >
            <FaUserCog />{" "}
            <Typography color="gray">Account Management</Typography>
          </Link>

          <hr className="border-gray-300 my-2" />
          <div className="flex items-center gap-2 text-gray-500">
            <Typography color="gray" className="opacity-70">
              Product Categories
            </Typography>
          </div>

          <div className=" flex flex-col gap-2">
            {categories &&
              categories.map((category) => (
                <Link
                  onClick={closeDrawer}
                  key={category.slug}
                  to={`/all-categories/${category.slug}`}
                  className="flex items-center gap-2 hover:text-blue-gray-800"
                >
                  <FaRegClock />
                  <Typography color="gray">{category.name}</Typography>
                </Link>
              ))}
          </div>

          <hr className="border-gray-300 my-2" />
          <span
            onClick={handleLogout}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaSignOutAlt className="text-red-400" />
            <Typography color="red">Sign Out</Typography>
          </span>
        </nav>
      </Drawer>
    </React.Fragment>
  );
}

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const { data: products = [] } = useGetAllProductQuery(); // Fetch products

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log(searchQuery);
    navigate(`/all-products/?search=${searchQuery}`, {
      state: { SearchResults: filteredProducts },
    });

    setSearchQuery("");
    // Implement search logic if needed
  };
  return (
    <>
      <div className="bg-secondary mt-3 mx-auto w-[93%] rounded-md py-3 2xl:py-10 px-7 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center w-[65%] gap-5">
            <Logo />
            <form
              onSubmit={handleSearch}
              className="items-center gap-2 w-[54%] hidden lg:flex"
            >
              <div className="relative w-full" onSubmit={handleSearch}>
                <input
                  type="text"
                  name="search"
                  className="p-2 pl-10 rounded-md w-full"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <BiSearch
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                />
                {/* Display search results */}
                {searchQuery && (
                  <div className="bg-white  p-2 rounded shadow-lg absolute top-[50px] w-full">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <div
                          key={product._id}
                          className="p-2 border-b border-gray-200"
                        >
                          <div
                            onClick={() => {
                              navigate(
                                `/all-products/?search=${product.name}`,
                                {
                                  state: { SearchResults: filteredProducts },
                                }
                              );
                              setSearchQuery("");
                            }}
                          >
                            {product.name}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-2">No products found.</div>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-primary px-4 py-2 rounded-md text-white"
              >
                Search
              </button>
            </form>
          </div>
          <div className="w-[35%] flex items-center justify-end gap-5">
            <div className="flex items-center gap-2 text-white lg:hidden">
              <BsSearch className="h-4 w-4" />
            </div>
            <Link
              to="/shopping-cart"
              className="flex items-center gap-2 text-white"
            >
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

            <ProfileInfo />

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
