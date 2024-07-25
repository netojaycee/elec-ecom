import React from "react";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { GiCheckMark } from "react-icons/gi";

export default function AddProduct() {
  return (
    <>
      <div className="flex lg:flex-row flex-col gap-4 ">
        <div className="w-full lg:w-[40%] bg-white rounded-lg p-4">
          <div className="bg-[#D0D0D0] flex justify-center items-center h-full">
            <p className="text-center text-sm p-3">
              Upload a product image thumbnail. Drag and drop your image or
              touch the icon to select a file.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-[60%] gap-4">
          <div className="flex lg:flex-row flex-col gap-3 items-center">
            <CustomInput
              label="Product Name"
              name="product_name"
              placeholder="Type in product name here..."
              width={"full"}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
            />
            <CustomInput
              label="Category"
              type="select"
              name="category"
              // value={category}
              // onChange={handleInputChange}
              options={[
                { value: "electronics", label: "Electronics" },
                { value: "furniture", label: "Furniture" },
                { value: "clothing", label: "Clothing" },
              ]}
            />
          </div>

          <CustomInput
            label="Product Price"
            name="price"
            placeholder="Type in product price here..."
            width={"full"}
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
          <CustomInput
            label="Description"
            name="message"
            placeholder="Set a description to the product for better customer understanding..."
            width="full"
            textarea // Add this prop to render textarea
          />

          <CustomButton
            type="contact"
            text="Upload Product"
            onClick=""
            width=""
            Icon={GiCheckMark}
          />
        </div>
      </div>
    </>
  );
}






// if category is avaailanke

// import React, { useState, useEffect } from "react";
// import CustomInput from "@/components/CustomInput";

// const YourComponent = () => {
//   const [category, setCategory] = useState("");
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // Fetch categories from API
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch("/api/categories"); // Replace with your API endpoint
//         const data = await response.json();
//         const formattedData = data.map((item) => ({
//           value: item.id,   // Adjust according to the structure of your API response
//           label: item.name, // Adjust according to the structure of your API response
//         }));
//         setCategories(formattedData);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleInputChange = (e) => {
//     setCategory(e.target.value);
//   };

//   return (
//     <CustomInput
//       label="Category"
//       type="select"
//       name="category"
//       value={category}
//       onChange={handleInputChange}
//       options={categories}
//     />
//   );
// };

// export default YourComponent;
