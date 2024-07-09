import React, { useContext } from "react";
import SortContext from "../hooks/SortContext";
import { GoFilter } from "react-icons/go";

export default function PageTitle({
  title,
  showFilter,
}) {
  const { sortValue, handleSortChange, handleOpen } = useContext(SortContext);

  return (
    <div className="bg-background_bl text-white p-4 w-[93%] mx-auto mt-4 flex justify-between items-center">
      <h1>{title}</h1>
      {showFilter && (
        <div className="flex items-center justify-end gap-2">
          <p onClick={handleOpen} className="lg:hidden text-xs flex items-center gap-2 cursor-pointer border-2 border-white p-2 rounded w-[40%]">
            Filter
            <GoFilter className="text-white w-5 h-5" />
          </p>
          <select
            value={sortValue}
            onChange={handleSortChange}
            className=" text-white bg-transparent border-2 border-white px-2 py-3 rounded text-xs lg:text-lg w-[40%] lg:w-auto"
          >
            <option className="text-black text-xs lg:text-lg" disabled value="">
              Sort by
            </option>
            <option
              className="text-black text-xs lg:text-lg"
              value="popularity"
            >
              Popularity
            </option>
            <option className="text-black text-xs lg:text-lg" value="newest">
              Newest Arrivals
            </option>
            <option className="text-black text-xs lg:text-lg" value="lowest">
              Lowest to Highest
            </option>
            <option className="text-black text-xs lg:text-lg" value="highest">
              Highest to Lowest
            </option>
          </select>
        </div>
      )}
    </div>
  );
}
