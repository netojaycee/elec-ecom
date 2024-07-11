import React from "react";
import productImage from "@/assets/images/product1.png";
import nocart from "@/assets/images/nocart.png";
import CustomButton from "@/components/CustomButton";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

export default function OrderDetails() {
  const item = 4;
  return (
    <>
      {item ? (
        <div className="p-2 flex items-center  2xl:h-[80vh] 2xl:w-[90%] 2xl:mx-auto">
          <div className=" bg-white shadow-md shadow-gray-400 rounded-md p-4 md:p-8 2xl:p-[60px] flex flex-col h-full w-full">
            <div className="flex flex-col gap-5 2xl:gap-10">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 items-start">
                  <p className="2xl:text-2xl">
                    Order no. <span className="font-bold">34567893456</span>
                  </p>
                  <p className="2xl:text-2xl">1 Item</p>
                  <p className="font-bold 2xl:text-2xl">
                    Total : <span className="font-bold">N1,500</span>
                  </p>
                </div>
                <div>
                  <CustomButton type="invoice" text="Download receipt" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center w-full border-2 border-gray-300 p-2 md:p-4 rounded-md gap-2 justify-between">
                <div className="text-sm font-normal flex items-center gap-4 lg:gap-10  w-full">
                  <img
                    src={productImage}
                    alt=""
                    className="w-[100px] h-[80px] 2xl:w-[200px] 2xl:h-[160px] bg-gray-300 rounded-md"
                  />
                  <div className="flex flex-col gap-1 2xl:gap-8">
                    <p className="text-sm 2xl:text-xl font-bold line-clamp-1 md:w-auto w-full">
                      LED Bulb Extension
                    </p>
                    <p className="text-xs 2xl:text-xl text-black/60  font-normal line-clamp-3 w-full md:w-auto">
                      Order 34567893456
                    </p>
                    <button className="bg-blue-400 text-center text-sm 2xl:text-xl p-2">
                      Delivered
                    </button>
                    <p className="text-xs text-black/60 font-normal line-clamp-3 w-full md:w-auto 2xl:text-xl">
                      On January 20th, 2024
                    </p>
                  </div>
                </div>
                <div className="flex items-center md:w-[60%] w-full justify-end">
                  <CustomButton type="cart" text="Buy Again" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-10 md:h-[200px] 2xl:h-[300px]">
                <div className="w-full md:w-1/2 border rounded-md p-3 h-full">
                  <p className="font-bold mb-2 2xl:text-2xl"> Payment Information</p>
                  <p className="2xl:text-xl">
                    Items Total Amount:
                    <span className="font-bold">N1,500</span>
                  </p>
                  <p className="2xl:text-xl">
                    Delivery Fee: <span className="font-bold">N800</span>
                  </p>
                  <hr className="w-[90%] mx-auto border my-2" />
                  <p className="2xl:text-xl">
                    Total:<span className="font-bold text-2xl">{" "}N2, 300</span>
                  </p>
                </div>
                <div className="w-full md:w-1/2  border rounded-md p-3 h-full">
                  <p className="font-bold mb-2 2xl:text-2xl"> Delivery Information</p>
                  <p className="text-sm 2xl:text-xl">
                    Mr. John Doe, Flat 4B, Block C, Olumide Williams Court, No.
                    15 Adeola Odeku Street, Victoria Island, Lagos State,
                    Nigeria.
                  </p>
                  <hr className="w-[90%] mx-auto border my-2" />
                  <p className="font-bold mb-2 2xl:text-2xl">Pickup Station</p>
                  <p className="text-sm 2xl:text-xl">
                    Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum
                    Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum
                  </p>
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
