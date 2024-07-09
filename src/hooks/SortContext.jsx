// SortContext.js
import React, { createContext, useState } from "react";

const SortContext = createContext();

export const SortProvider = ({ children }) => {
  const [sortValue, setSortValue] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleSortChange = (e) => {
    setSortValue(e.target.value);
  };

  return (
    <SortContext.Provider value={{ sortValue, handleSortChange, handleOpen, open }}>
      {children}
    </SortContext.Provider>
  );
};

export default SortContext;
