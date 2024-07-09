// SortContext.js
import React, { createContext, useState } from "react";

const SortContext = createContext();

export const SortProvider = ({ children }) => {
  const [sortValue, setSortValue] = useState("");

  const handleSortChange = (e) => {
    setSortValue(e.target.value);
  };

  return (
    <SortContext.Provider value={{ sortValue, handleSortChange }}>
      {children}
    </SortContext.Provider>
  );
};

export default SortContext;
