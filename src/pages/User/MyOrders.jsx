import React from "react";
import productImage from "@/assets/images/product1.png";
import nocart from "@/assets/images/nocart.png";
import CustomButton from "@/components/CustomButton";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

export default function MyOrders() {
  const item = 4;
  return (
    <>
      {item ? (
        <div className="p-3">
          <div className=" bg-white shadow-md shadow-gray-400 rounded-md p-2 md:p-4 flex flex-col">
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row md:items-center w-full mt-2 border border-gray-300 p-2 md:p-4 rounded-md gap-2 justify-between">
                <div className="text-sm font-normal flex items-center gap-4 lg:gap-10 w-full">
                  <img
                    src={productImage}
                    alt=""
                    className="w-[100px] h-[80px] bg-gray-300 rounded-md"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold line-clamp-1 md:w-auto w-full">
                      LED Bulb Extension
                    </p>
                    <p className="text-xs text-black/60  font-normal line-clamp-3 w-full md:w-auto">
                      Order 34567893456
                    </p>
                    <button className="bg-blue-400 text-center text-xs p-2">
                      Delivered
                    </button>
                    <p className="text-xs text-black/60 font-normal line-clamp-3 w-full md:w-auto">
                      On January 20th, 2024
                    </p>
                  </div>
                </div>
                <div className="flex items-center md:w-[60%] w-full justify-end">
                  <Link to="/my-orders/order1" className="text-primary flex items-center gap-1">
                    See details <FaAngleRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center">
            <img src={nocart} alt="" className="" />
            <h2 className=" md:text-lg lg:text-xl font-bold mt-2">
              {" "}
              Your Cart is empty!
            </h2>
            <p className="text-center md:text-sm lg:text-lg font-normal mt-2">
              Looks like you haven’t added anything to your cart yet
            </p>
            <CustomButton
              type={"contact"}
              text="Continue Shopping"
              to={"/all-products"}
            />
          </div>
        </>
      )}
    </>
  );
}
