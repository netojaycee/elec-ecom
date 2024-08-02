import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Pagination from "../../../components/Pagination";

export default function AllOrders() {
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
  

      <div className="overflow-x-auto">
      <div className="min-w-[600px]">
          <div className="flex items-center w-full px-4 py-2 bg-white rounded-lg mb-4">
            <p className="text-xs font-normal w-[10%]"> Order ID</p>
            <p className="text-xs font-normal w-[20%]">Customer Name</p>
            <p className="text-xs font-normal w-[15%]">Product(s)</p>
            <p className="text-xs font-normal w-[11%]">Date</p>
            <p className="text-xs font-normal w-[13%]">Items no.</p>

            <p className="text-xs font-normal w-[14%]">Total Amount</p>
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
                <p className="text-sm font-normal w-[20%]">Mike Johnson</p>
                <p className="text-sm font-normal w-[15%] line-clamp-2">LED Light Bulb, LED Desk Lamp, Wireless extension</p>
                <p className="text-sm font-normal w-[11%]">2024-06-01</p>
                <p className="text-sm font-normal w-[13%]">3</p>

                <p className="text-sm font-normal w-[14%]">
                  <span className="font-serif">&#8358; </span>
                  1,500.00
                </p>
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
       orders
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
