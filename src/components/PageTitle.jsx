import React, { useContext } from "react";
import SortContext from "../hooks/SortContext";

export default function PageTitle({ title, showFilter }) {
  const { sortValue, handleSortChange } = useContext(SortContext);
  return (
    <div className="bg-background_bl text-white p-4 w-[93%] mx-auto mt-4 flex justify-between items-center">
      <h1>{title}</h1>
      {showFilter && (
        <select
          value={sortValue}
          onChange={handleSortChange}
          className=" text-white bg-transparent border-2 border-white p-2 rounded"
        >
          <option className="text-black" disabled value="">
            Sort by
          </option>

          <option className="text-black" value="lowest">
            Lowest to Highest
          </option>
          <option className="text-black" value="highest">
            Highest to Lowest
          </option>
          <option className="text-black" value="alphabetical">
            Alphabetically
          </option>
        </select>
      )}
    </div>
  );
}
