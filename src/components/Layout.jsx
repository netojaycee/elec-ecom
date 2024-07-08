import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { BreadCrumb } from "./BreadCrumb";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <BreadCrumb />
      <main className="flex-grow mx-auto w-[93%] my-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
