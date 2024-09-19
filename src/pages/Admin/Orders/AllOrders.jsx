import React, { useState } from "react";
import Pagination from "../../../components/Pagination";
import { useGetAllOrdersQuery } from "../../../redux/appData";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function AllOrders() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const { data: orders = [], isLoading } = useGetAllOrdersQuery();

  // console.log(orders);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  // Assuming orders is an array of order objects
  const currentOrders = orders.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();
  const handleClickOrder = (order) => {
    navigate(`/admin/order-detail/${order._id}`, { state: { order } });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="flex items-center w-full px-4 py-2 bg-white rounded-lg mb-4">
            <p className="text-xs font-normal w-[10%]">Order ID</p>
            <p className="text-xs font-normal w-[15%] ml-3">Product(s)</p>
            <p className="text-xs font-normal w-[11%] ml-3">Date</p>
            <p className="text-xs font-normal w-[13%] ml-4">Items no.</p>
            <p className="text-xs font-normal w-[14%]">Total Amount</p>
            <p className="text-xs font-normal w-[20%]">Payment Status</p>

            <p className="text-xs font-normal w-[12%]">Del. Status</p>
            <p className="text-xs font-normal w-[5%]"></p>
          </div>
          <div className="flex flex-col gap-3">
            {currentOrders.map((order, orderIndex) => (
              <div
                key={order._id}
                className="flex items-center w-full px-4 py-2 bg-white rounded-lg"
              >
                <p className="text-sm font-normal w-[10%] overflow-hidden line-clamp-1">
                  {order._id.length > 5
                    ? `...${order._id.slice(-6)}`
                    : order._id}
                </p>

                <p className="text-sm font-normal w-[15%] line-clamp-1 md:line-clamp-2 ml-3">
                  {order.products.map((product) => product.name).join(", ")}
                </p>
                <p className="text-sm font-normal w-[11%] ml-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm font-normal w-[13%] ml-6">
                  {order.products.reduce(
                    (total, product) => total + product.cartQuantity,
                    0
                  )}
                </p>
                <p className="text-sm font-normal w-[14%]">
                  <span className="font-serif">&#8358; </span>
                  {order.amount}
                  {/* {order.products.reduce((total, product) => total + (product.price * product.cartQuantity), 0).toLocaleString()} */}
                </p>
                <p
                  className={`text-sm font-normal w-[15%] mr-4 p-1 rounded-lg text-center ${
                    order.paymentStatus === "paid"
                      ? "bg-green-400"
                      : "bg-red-400"
                  }`}
                >
                  {order.paymentStatus}
                </p>

                <p
                  className={`text-wrap text-[10px] md:text-sm font-normal w-[10%] p-1 rounded-lg text-center ${
                    order.deliveryStatus === "dispatched"
                      ? "bg-blue-400"
                      : order.deliveryStatus === "pending"
                      ? "bg-red-400"
                      : "bg-green-400"
                  }`}
                >
                  {order.deliveryStatus}
                </p>
                <p className=" bg-black p-1 rounded-lg font-normal items-end ml-5 w-[5%] flex justify-center cursor-pointer">
                  <div
                    onClick={() => handleClickOrder(order)} // Dynamic link to order details
                    className="text-white"
                  >
                    view
                  </div>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p>
          Showing {indexOfFirstProduct + 1} to{" "}
          {Math.min(indexOfLastProduct, orders.length)} of {orders.length}{" "}
          orders
        </p>
        <div className="">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(orders.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
