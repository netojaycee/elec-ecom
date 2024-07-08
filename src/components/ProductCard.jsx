import React from "react";
import product1 from "@/assets/images/product1.png";
import { FaHeart } from "react-icons/fa";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const isMobile = window.innerWidth <= 640;
  return (
    <>
      <div className="flex flex-col shadow-md bg-white shadow-gray-500 rounded-lg p-2">
        <Link to={`/all-products/${product.slug}`} className="cursor-pointer">
          <img src={product1} alt="" className="w-full h-full object-cover" />
        </Link>
        <hr className="w-[90%] mx-auto border border-gray-400" />
        <div className="flex flex-col p-2">
          <div className="flex items-center justify-between">
            <p className="font-bold text-[12px] lg:text-lg">{product.name} </p>
            <FaHeart className="text-red-500 lg:w-7 lg:h-7 hidden lg:block" />
          </div>
          <div className="p-2 flex items-center gap-2">
            {product.tags.slice(0, isMobile ? 2 : 4).map((tag) => (
              <p className="border-2 border-gray-300 p-1 text-[10px] lg:text-xs rounded">
                {tag}
              </p>
            ))}
          </div>
          <div className="lg:h-[60px] overflow-hidden">
            {" "}
            {/* Fixed height for description */}
            <p className="text-sm text-gray-600 line-clamp-2 lg:line-clamp-3">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between mt-1">
            <div className="flex justify-between items-center w-full lg:w-auto">
              <div className="flex flex-col">
                <p className="text-gray-500 text-xs lg:text-sm">PRICE</p>
                <p className="font-bold"> #{product.price}</p>
              </div>
              <FaHeart className="text-red-500 lg:w-7 lg:h-7 lg:hidden" />
            </div>
            {/* <div className="w-full"> */}
            <CustomButton
              type={"cart"}
              text="Add"
              onClick={""}
              to={""}
              width={"full"}
            />
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
