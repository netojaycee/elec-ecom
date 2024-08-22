import React, { useState } from "react";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { GiCheckMark } from "react-icons/gi";
import { useAddCategoryMutation } from "../../../redux/appData";
import { toast } from "react-toastify";
import { AiOutlineCloudUpload } from "react-icons/ai"; // Placeholder icon

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState("");

  const [addCategory, { isLoading, isSuccess, isError, error }] =
    useAddCategoryMutation();

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
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
    if (!categoryName || !image) {
      toast.error("All fields are required");
      return;
    }

    try {
      const imageBase64 = await convertToBase64(image);
      const credentials = {
        name: categoryName,
        image: imageBase64,
      };

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
      toast.error("Upload failed");
    }
  }, [isSuccess, isError]);

  return (
    <>
      {errors && <p className="text-red-500 mb-3 text-sm">{errors}</p>}

      <div className="flex lg:flex-row flex-col gap-4">
        <div className="w-full lg:w-[40%] bg-white rounded-lg p-4">
          <div className="bg-[#D0D0D0] flex justify-center items-center h-[150px] w-[150px] fixed-size">
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
              {image ? (
                <img
                  src={image}
                  alt="Selected Category"
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <>
                  <AiOutlineCloudUpload size={50} className="text-gray-500" />
                  <p className="text-center text-sm p-3">
                    Upload a category image thumbnail. Touch the icon to select a file.
                  </p>
                </>
              )}
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
