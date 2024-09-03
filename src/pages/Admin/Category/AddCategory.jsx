import React, { useState } from "react";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { GiCheckMark } from "react-icons/gi";
import { useAddCategoryMutation } from "../../../redux/appData";
import { toast } from "react-toastify";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // For image preview
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [
    addCategory,
    { isLoading: isAddingCategory, isSuccess, isError, error },
  ] = useAddCategoryMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "db0zguvf");
    formData.append("folder", "powermart");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgz5bgdzc/auto/upload",
        formData
      );
      return response.data.secure_url; // Return the secure URL of the uploaded file
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file to Cloudinary");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors("");
    if (!categoryName || !image) {
      toast.error("All fields are required");
      return;
    }
    setIsLoading(true);

    let imageUrl = "";

    if (image) {
      try {
        imageUrl = await uploadFile(image);
        console.log(imageUrl);
      } catch (error) {
        setErrors("Failed to upload image. Please try again.");
        return;
      }
    }
    try {
      const credentials = {
        name: categoryName,
        image: imageUrl,
      };

      await addCategory(credentials);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      setErrors(error.error.data);
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      setCategoryName("");
      setImage(null);
      setImagePreviewUrl(null); // Clear the preview after submission
      toast.success("Category added successfully!");
    } else if (isError) {
      toast.error("Upload failed");
    }
  }, [isSuccess, isError]);

  return (
    <>
      {errors && <p className="text-red-500 mb-3 text-sm">{errors}</p>}

      <div className="flex lg:flex-row flex-col gap-4">
        <div className="w-full lg:w-[40%] bg-white rounded-lg p-4 flex items-center">
          <div className="bg-[#D0D0D0] flex justify-center items-center h-[150px] w-[150px] fixed-size text-xs">
            <input
              className="mb-2 p-3 bg-gray-200 border w-[70%]"
              type="file"
              name="image"
              onChange={handleImageChange}
              id="image-upload"
            />
          </div>
          <div className="mb-2 bg-gray-200 border w-[150px] mx-auto rounded-full">
            {imagePreviewUrl && (
              <img
                src={imagePreviewUrl}
                alt="Selected Category"
                className="w-[150px] h-[150px] object-cover rounded-full"
              />
            )}
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
