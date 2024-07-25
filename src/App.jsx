import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Landing from "./pages/landing";
import Auth from "./pages/Auth";
import ForgotPass from "./pages/Auth/ForgotPass";
import ResetPass from "./pages/Auth/ResetPass";
import Error from "./pages/Error";
import About from "./pages/About";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import OrderConfirm from "./pages/OrderConfirm";
import Products from "./pages/Products";
import SearchPage from "./pages/SearchPage";
import MyOrders from "./pages/User/MyOrders";
import OrderDetails from "./pages/User/OrderDetails";
import SavedItems from "./pages/User/SavedItems";
import Settings from "./pages/User/Settings";
import AdminLayout from "./components/Admin/AdminLayout";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import Categories from "./pages/Categories";
import { useSelector } from "react-redux";
import Protected from "./components/Protected";
import Dashboard from "./pages/Admin/Dashboard";
import AddProduct from "./pages/Admin/Products/AddProduct";
import AllProducts from "./pages/Admin/Products/AllProducts";
import AllCategory from "./pages/Admin/Category/AllCategory";
import AddCategory from "./pages/Admin/Category/AddCategory";
import OrderDetailsAdmin from "./pages/Admin/Orders/OrderDetailsAdmin";
import AllOrders from "./pages/Admin/Orders/AllOrders";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/shopping-cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/all-products/:slug" element={<ProductDetails />} />
          <Route path="/order-confirm" element={<OrderConfirm />} />
          <Route path="/all-products" element={<Products />} />
          <Route path="/all-categories/:slug" element={<Products />} />
          <Route path="/all-categories" element={<Categories />} />
          <Route path="/search/:slug" element={<SearchPage />} />
          {/* user routes */}
          <Route path="/" element={<Protected />}>
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/my-orders/:slug" element={<OrderDetails />} />
            <Route path="/saved-items" element={<SavedItems />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="/error" element={<Error />} />
          <Route path="/*" element={<Navigate to="/error" />} />
        </Route>
        {/* admin routes */}
        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="all-product" element={<AllProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="all-category" element={<AllCategory />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="all-order" element={<AllOrders />} />
          <Route path="order-detail" element={<OrderDetailsAdmin />} />
        </Route>
        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/" /> : <Auth />}
        />
        <Route path="/reset-password/:token" element={<ResetPass />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
