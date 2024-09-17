import React from "react";
import { useGetAllOrdersQuery } from "../../../redux/appData";

export default function Dashboard() {
  const { data: orders = [], isLoading } = useGetAllOrdersQuery();
  return (
    <>
      <div className="grid grid-cols-2 gap-5 ">
        <div className="bg-white p-5 shadow-md rounded-md">
          <p className="text-sm">Total Customers</p>
          <p className="font-bold text-3xl">30000</p>
        </div>

        <div className="bg-white p-5 shadow-md rounded-md">
          <p className="text-sm">Total Orders</p>
          <p className="font-bold text-3xl">30000</p>
        </div>
      </div>

      <div className="overflow-x-auto mt-5 shadow-md">
        <div className="min-w-[600px]">
          <div className="flex items-center w-full px-4 py-2 bg-white rounded-lg mb-4">
            <p className="text-xs font-normal w-[10%]">Order ID</p>
            <p className="text-xs font-normal w-[15%]">Product(s)</p>
            <p className="text-xs font-normal w-[11%]">Date</p>
            <p className="text-xs font-normal w-[13%]">Items no.</p>
            <p className="text-xs font-normal w-[14%]">Total Amount</p>
            <p className="text-xs font-normal w-[20%]">Payment Status</p>

            <p className="text-xs font-normal w-[12%]">Del. Status</p>
            <p className="text-xs font-normal w-[5%]"></p>
          </div>
          <div className="flex flex-col gap-3">
            {orders &&
              orders.slice(1, 5).map((order, orderIndex) => (
                <div
                  key={order._id}
                  className="flex items-center w-full px-4 py-2 bg-white rounded-lg"
                >
                  <p className="text-sm font-normal w-[10%] overflow-hidden line-clamp-1">
                    {order._id.length > 5
                      ? `...${order._id.slice(-6)}`
                      : order._id}
                  </p>

                  <p className="text-sm font-normal w-[15%] line-clamp-2">
                    {order.products.map((product) => product.name).join(", ")}
                  </p>
                  <p className="text-sm font-normal w-[11%]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm font-normal w-[13%]">
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
                    className={`text-sm font-normal w-[10%] p-1 rounded-lg text-center ${
                      order.deliveryStatus === "dispatched"
                        ? "bg-blue-400"
                        : order.deliveryStatus === "pending"
                        ? "bg-red-400"
                        : "bg-green-400"
                    }`}
                  >
                    {order.deliveryStatus}
                  </p>
                  {/* <p className=" bg-black p-1 rounded-lg font-normal items-end ml-4 w-[7%] flex justify-center cursor-pointer">
                    <div
                      onClick={() => handleClickOrder(order)} // Dynamic link to order details
                      className="text-white"
                    >
                      view
                    </div>
                  </p> */}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
