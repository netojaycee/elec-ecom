import React from "react";
import { Link } from "react-router-dom";
import CategoryCard from "@/components/CategoryCard";
import { useGetAllCategoryQuery } from "../redux/appData";

export default function Categories() {
  const { data: categories } = useGetAllCategoryQuery();

  // console.log("cate", categories)

  return (
    <>
      {/* <div className="bg-background_bl text-white p-4 flex items-center justify-between">
        <h1>Categories</h1>
        <Link
          className="text-sm hover:underline cursor-pointer hover:text-primary"
          to="/all-categories"
        >
          View all
        </Link>
      </div> */}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories && categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </>
  );
}
