import React from "react";
import productImage from "@/assets/images/product1.png";
import nocart from "@/assets/images/nocart.png";
import { BiHeart} from "react-icons/bi";
import CustomButton from "@/components/CustomButton";

export default function SavedItems() {
  const item = 4;
  return (
    <>
      {item ? (
        <div className="p-3">
          <div className=" bg-white shadow-md shadow-gray-400 rounded-md p-2 md:p-4 flex flex-col">
            <div className="md:flex items-center w-full hidden px-4">
              <p className="text-sm font-normal w-[40%]">Product</p>
              <p className="text-sm font-normal w-[20%]">Price</p>
              <p className="text-sm font-normal w-[30%]"></p>
              <p className="text-sm font-normal w-[10%]"></p>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row md:items-center w-full mt-2 border border-gray-300 p-2 md:p-4 rounded-md gap-3 md:gap-10">
                <div className="flex md:w-[60%] w-full justify-between md:justify-start items-center">
                  <div className="text-sm font-normal flex items-center gap-4 lg:gap-10 w-full">
                    <img
                      src={productImage}
                      alt=""
                      className="w-[100px] h-[80px] bg-gray-300 rounded-md"
                    />
                    <div className="flex flex-col gap-3 ">
                      <p className="text-sm font-bold line-clamp-1 md:w-auto w-[90%]">
                        LED Bulb Extension
                      </p>
                      <p className="text-xs font-normal line-clamp-3 w-[70%] md:w-auto">
                        Our energy-efficient LED bulb extension provides bright
                        and long-lasting illumination, perfect for any room
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold hidden items-center w-[40%] md:flex justify-center">
                    #1500
                  </p>
                  <p className="text-sm font-bold  md:hidden justify-center">
                    #6000
                  </p>
                </div>
                <div className="flex items-center md:w-[60%] w-full justify-between md:justify-end">
                  <div className="text-sm font-normal md:w-[50%] flex items-center justify-center order-3 md:order-1">
                    <CustomButton
                      type={"cart"}
                      text={"Add to Cart"}
                      width={"full"}
                    />
                  </div>
                  <div className=" text-black text-sm font-normal md:w-[20%] flex justify-center order-1 md:order-3 items-center">
                    <BiHeart className=" w-6 h-6" />
                    <p className="text-sm font-bold md:hidden">Remove</p>
                  </div>
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
