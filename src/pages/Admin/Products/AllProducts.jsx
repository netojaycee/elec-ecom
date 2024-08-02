import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { BiPlus } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import Pagination from "../../../components/Pagination";

export default function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const products = Array(20).fill(0);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="flex justify-end w-full mb-8">
        <CustomButton
          type="contact"
          text="Add New Product"
          onClick={() => console.log("Add New Product Clicked")}
          width=""
          to="/admin/add-product"
          Icon={BiPlus}
        />
      </div>

      <div className="overflow-x-auto">
      <div className="min-w-[600px]">
      <div className="flex items-center w-full px-4 py-2 bg-white rounded-lg mb-4">
            <p className="text-xs font-normal w-[10%]"> Product ID</p>
            <p className="text-xs font-normal w-[20%]">Product Name</p>
            <p className="text-xs font-normal w-[15%]">Category</p>
            <p className="text-xs font-normal w-[14%]">Price</p>
            <p className="text-xs font-normal w-[13%]">Stock Quantity</p>
            <p className="text-xs font-normal w-[11%]">Date Added</p>
            <p className="text-xs font-normal w-[12%]">Status</p>
            <p className="text-xs font-normal w-[5%]"></p>
          </div>
          <div className="flex flex-col gap-3">
            {currentProducts.map((_, index) => (
              <div
                key={index}
                className="flex items-center w-full px-4 py-2 bg-white rounded-lg"
              >
                <p className="text-sm font-normal w-[10%]">
                  00{indexOfFirstProduct + index + 1}
                </p>
                <p className="text-sm font-normal w-[20%]">LED Light Bulb</p>
                <p className="text-sm font-normal w-[15%]">Lighting</p>
                <p className="text-sm font-normal w-[14%]">
                  <span className="font-serif">&#8358; </span>
                  1,500.00
                </p>
                <p className="text-sm font-normal w-[13%]">100</p>
                <p className="text-sm font-normal w-[11%]">2024-06-01</p>
                <p
                  className={`text-sm font-normal w-[10%] p-1 rounded-lg text-center ${
                    index % 2 === 0 ? "bg-[#D9F2ED]" : "bg-[#D0D0D0]"
                  }`}
                >
                  {index % 2 === 0 ? "in Stock" : "out of Stock"}
                </p>
                <p className="text-sm font-normal w-[7%] flex justify-end">
                  <HiDotsVertical className="w-6 h-6 " />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p>
          Showing {indexOfFirstProduct + 1} to{" "}
          {Math.min(indexOfLastProduct, products.length)} of {products.length}{" "}
          products
        </p>
        <div className="">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(products.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
