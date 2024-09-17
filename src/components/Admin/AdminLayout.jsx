import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout() {
  return (
    <div className="flex bg-[#ECECEC] h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <main className="pt-[20px] p-8 w-full overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
