import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SortProvider } from "./hooks/SortContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SortProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </SortProvider>
    </BrowserRouter>
  </React.StrictMode>
);
