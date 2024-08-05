import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <div className="p-2 bg-white shadow-sm rounded-lg">
      <div className="relative">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-48 object-cover filter blur-0" // Adjust the height as needed
        />
        <Link
          to={`/all-categories/${category.slug}`}
          className="absolute inset-0 flex items-center justify-center text-white text-[12px] md:text-lg 2xl:text-2xl font-bold bg-black bg-opacity-50 rounded-lg"
        >
          {category.name}
        </Link>
      </div>
    </div>
  );
}
