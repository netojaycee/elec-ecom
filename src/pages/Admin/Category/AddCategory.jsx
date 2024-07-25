import React from "react";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { GiCheckMark } from "react-icons/gi";

export default function AddCategory() {
  return (
    <>
      <div className="flex lg:flex-row flex-col gap-4 ">
        <div className="w-full lg:w-[40%] bg-white rounded-lg p-4">
          <div className="bg-[#D0D0D0] flex justify-center items-center h-full">
            <p className="text-center text-sm p-3">
              Upload a category image thumbnail. Drag and drop your image or
              touch the icon to select a file.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-[60%] gap-4">
          <CustomInput
            label="Category Name"
            name="name"
            placeholder="Type in category name here..."
            width={"full"}
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
          {/* <CustomInput
            label="Description"
            name="message"
            placeholder="Set a description to the category for better customer understanding..."
            width="full"
            textarea // Add this prop to render textarea
          /> */}

          <CustomButton
            type="contact"
            text="Upload Category"
            onClick=""
            width=""
            Icon={GiCheckMark}
          />
        </div>
      </div>
    </>
  );
}
