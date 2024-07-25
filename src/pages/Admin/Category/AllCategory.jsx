import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { BiPlus } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import Pagination from "../../../components/Pagination";

export default function AllCategory() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const category = Array(20).fill(0);

  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategory = category.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="flex justify-end w-full mb-8">
        <CustomButton
          type="contact"
          text="Add New Category"
          onClick={() => console.log("Add New Category Clicked")

          }
          to="/admin/add-category"
          width=""
          Icon={BiPlus}
        />
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="flex items-center w-full px-4 py-2 bg-white rounded-lg mb-4">
            <p className="text-xs font-normal w-[15%]"> Category ID</p>
            <p className="text-xs font-normal w-[26%]">Category Name</p>

            <p className="text-xs font-normal w-[13%]">Items</p>
            <p className="text-xs font-normal w-[11%]">Date Added</p>
            <p className="text-xs font-normal w-[35%]"></p>
          </div>
          <div className="flex flex-col gap-3">
            {currentCategory.map((_, index) => (
              <div
                key={index}
                className="flex items-center w-full px-4 py-2 bg-white rounded-lg"
              >
                <p className="text-sm font-normal w-[15%]">
                  00{indexOfFirstCategory + index + 1}
                </p>
                <p className="text-sm font-normal w-[26%]">Lighting</p>
          
                <p className="text-sm font-normal w-[13%]">100</p>
                <p className="text-sm font-normal w-[11%]">2024-06-01</p>
                
                <p className="text-sm font-normal w-[35%] flex justify-end">
                  <HiDotsVertical className="w-6 h-6 " />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p>
          Showing {indexOfFirstCategory + 1} to{" "}
          {Math.min(indexOfLastCategory, category.length)} of {category.length}{" "}
          category
        </p>
        <div className="">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(category.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
