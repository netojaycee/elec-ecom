import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <div className="p-2 bg-white shadow-sm rounded-lg">
      <div className="relative">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover"
        />
        <Link
          to={`/all-categories/${category.slug}`}
          className="absolute inset-0 flex items-center justify-center text-white text-[12px] md:text-lg 2xl:text-2xl font-bold"
        >
          {category.title}
        </Link>
      </div>
    </div>
  );
}
