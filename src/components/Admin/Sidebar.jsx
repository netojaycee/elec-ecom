import React from "react";
import Logo from "../Logo";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { AiOutlineProduct } from "react-icons/ai";
import {
  MdDashboard,
  MdOutlineCategory,
  MdOutlineInventory,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

export function SidebarLinks() {
  return (
    <List >
      <NavLink
        className={({ isActive }) =>
          `${
            isActive
              ? " p bg-[#E9FFE9] text-primary rounded-md decoration-black active-nav"
              : ""
          }`
        }
        to="/admin/dashboard"
      >
        <ListItem className=" focus:bg-transparent">
          <ListItemPrefix>
            <MdDashboard className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${
            isActive
              ? " p bg-[#E9FFE9] text-primary rounded-md decoration-black active-nav"
              : ""
          }`
        }
        to="/admin/all-product"
      >
        <ListItem className=" focus:bg-transparent">
          <ListItemPrefix>
            <AiOutlineProduct className="h-5 w-5" />
          </ListItemPrefix>
          Products Management
        </ListItem>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${
            isActive
              ? " p bg-[#E9FFE9] text-primary rounded-md decoration-black active-nav"
              : ""
          }`
        }
        to="/admin/all-category"
      >
        <ListItem className=" focus:bg-transparent">
          <ListItemPrefix>
            <MdOutlineCategory className="h-5 w-5" />
          </ListItemPrefix>
          Category Management
        </ListItem>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${
            isActive
              ? " p bg-[#E9FFE9] text-primary rounded-md decoration-black active-nav"
              : ""
          }`
        }
        to="/admin/all-order"
      >
        <ListItem className=" focus:bg-transparent">
          <ListItemPrefix>
            <MdOutlineInventory className="h-5 w-5" />
          </ListItemPrefix>
          Orders Management
        </ListItem>
      </NavLink>
    </List>
  );
}

export default function Sidebar() {
  return (
    <div className="max-w-[300px] hidden lg:flex bg-white pt-2 p-4  h-full flex-col gap-10 overflow-hidden">
      <div className="flex items-center w-full justify-center bg-secondary rounded-full">
        <Logo />
      </div>

      <div className="">
        <SidebarLinks />
      </div>
    </div>
  );
}
