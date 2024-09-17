import React from "react";
import { LuUserCircle2 } from "react-icons/lu";
import CustomButton from "../../../components/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderDet() {
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state;
  console.log(order);
  return (
    <>
      {order && (
        <form className="" onSubmit={""}>
          <div className="bg-white p-5 mt-5 rounded-md shadow-md shadow-gray-400 flex items-center justify-between">
            <div className="flex flex-col">
              <p className="">Order ID: {order._id}</p>
              <p className="text-gray-600/70">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p
                className={`text-sm font-normal w-full p-1 rounded-lg text-center ${
                  order.deliveryStatus === "dispatched"
                    ? "bg-blue-400"
                    : order.deliveryStatus === "pending"
                    ? "bg-red-400"
                    : "bg-green-400"
                }`}
              >
                {order.deliveryStatus}
              </p>
            </div>
            <div className="">
              <select
                className="border border-gray-300 p-2 rounded-md"
                value=""
                onChange={(e) => console.log(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="dispatched">Dispatched</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>

          <div className="mt-5 bg-white p-5 rounded-md shadow-md shadow-gray-400 flex items-center justify-between">
            <div className="flex flex-col">
              <p className="flex items-center gap-2 font-bold text-[20px]">
                <LuUserCircle2 className="w-6 h-6" /> Customer&apos;s Info
              </p>
              <p className="text-gray-600/70">
                Name: <span className="text-black">John Doe</span>
              </p>
              <p className="text-gray-600/70">
                Email: <span className="text-black">Johndoe@gmail.com</span>
              </p>
              <p className="text-gray-600/70">
                Phone: <span className="text-black">+234595058754</span>
              </p>
              <p className="text-gray-600/70">
                Delivery Address:{" "}
                <span className="text-black">{order.address}</span>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto mt-5">
            <div className="min-w-[600px]">
              <div className="flex items-center w-full px-4 py-2 bg-white rounded-lg mb-4">
                <p className="text-xs font-normal w-[20%]"></p>

                <p className="text-xs font-normal w-[25%]">Product(s)</p>
                <p className="text-xs font-normal w-[15%]">Price</p>
                <p className="text-xs font-normal w-[15%]">Quantity</p>
                <p className="text-xs font-normal w-[25%]">Total Amount</p>
              </div>
              <div className="flex flex-col gap-3">
                {order.products.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center w-full px-4 py-2 bg-white rounded-lg"
                  >
                    <p className="text-sm font-normal w-[20%]">
                      <img
                        src={product.images[0]}
                        alt="product"
                        className="w-[100px] h-[80px] bg-gray-300 rounded-md"
                      />{" "}
                    </p>
                    <p className="text-sm font-normal w-[25%] line-clamp-2">
                      {product.name}
                    </p>
                    <p className="text-sm font-normal w-[15%]">
                      <span className="font-serif">&#8358; </span>
                      {product.price}
                    </p>
                    <p className="text-sm font-normal w-[15%]">
                      {product.cartQuantity}
                    </p>
                    <p className="text-sm font-normal w-[25%]">
                      <span className="font-serif">&#8358; </span>
                      {product.price * product.cartQuantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end gap-5 items-center mt-5">
            <CustomButton text={"proceed"} type={"normal"} />
            <CustomButton type={"back"} text={"Back"} to="/admin/all-order" />
          </div>
        </form>
      )}
    </>
  );
}
