import React, { useState } from "react";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { GiCheckMark } from "react-icons/gi";
import { useAddCategoryMutation } from "../../../redux/appData";
import { toast } from "react-toastify";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = React.useState("");

  const [addCategory, { isLoading, isSuccess, isError, error }] =
    useAddCategoryMutation();

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors("");
    console.log(categoryName, image);
    if (!categoryName || !image) {
      alert("all fields are required");
      return;
    }

    try {
      const imageBase64 = await convertToBase64(image);
      const credentials = {
        name: categoryName,
        image: imageBase64,
      };
      console.log(credentials);

      await addCategory(credentials);
      setCategoryName("");
      setImage(null);
    } catch (error) {
      setErrors(error.error.data);
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Category added successfully!");
    } else if (isError) {
      toast.error("upload  failed");
      // if (error.data.error.message) {
      //   setErrors(error.data.error.message);
      // }
    }
  }, [isSuccess, isError]);

  return (
    <>
      {errors && <p className="text-red-500 mb-3 text-sm">{errors}</p>}

      <div className="flex lg:flex-row flex-col gap-4">
        <div className="w-full lg:w-[40%] bg-white rounded-lg p-4">
          <div className="bg-[#D0D0D0] flex justify-center items-center h-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col justify-center items-center h-full"
            >
              <p className="text-center text-sm p-3">
                Upload a category image thumbnail. Drag and drop your image or
                touch the icon to select a file.
              </p>
            </label>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-[60%] gap-4">
          <CustomInput
            label="Category Name"
            name="categoryName"
            placeholder="Type in category name here..."
            width="full"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <CustomButton
            type="contact"
            text={isLoading ? "Loading" : "Upload Category"}
            onClick={handleSubmit}
            width="full"
            Icon={GiCheckMark}
          />
        </div>
      </div>
    </>
  );
}
