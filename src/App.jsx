import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import Protected from "./components/Protected";
import Dashboard from "./pages/Admin/Dashboard";
import AddProduct from "./pages/Admin/Products/AddProduct";
import AllProducts from "./pages/Admin/Products/AllProducts";
import AllCategory from "./pages/Admin/Category/AllCategory";
import AddCategory from "./pages/Admin/Category/AddCategory";
import AllOrders from "./pages/Admin/Orders/AllOrders";
import OrderDet from "./pages/Admin/Orders/OrderDet";
import { jwtDecode } from "jwt-decode";
import { setUserInfo } from "./redux/slices/userSlice";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user); // Get user state from Redux

  const { isAdmin } = user;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Extract required fields from the decoded token
        const { name, email, isAdmin, _id } = decodedToken;

        // Dispatch the action to set user info in the state
        dispatch(setUserInfo({ name, email, isAdmin, _id }));
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    }
  }, [token, dispatch]);

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
        <Route
          path="/admin"
          element={isAdmin && isAdmin ? <AdminLayout /> : <Navigate to="/" />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="all-product" element={<AllProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="all-category" element={<AllCategory />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="all-order" element={<AllOrders />} />
          <Route path="order-detail/:slug" element={<OrderDet />} />
        </Route>
        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/" /> : <Auth />}
        />
        <Route path="/reset-password/:token" element={<ResetPass />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
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
