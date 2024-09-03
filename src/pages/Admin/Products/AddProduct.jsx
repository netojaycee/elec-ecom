import React, { useState } from "react";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { GiCheckMark } from "react-icons/gi";
import {
  useGetAllCategoryQuery,
  useAddProductMutation,
} from "../../../redux/appData";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]); // Store selected image files
  const [imagePreviews, setImagePreviews] = useState([]); // Store image preview URLs
  const [isLoading, setIsLoading] = useState("");
  const [errors, setErrors] = useState([]);

  const { data: categories = [] } = useGetAllCategoryQuery();
  const [addProduct, { isLoading: isAddingProduct, isSuccess, isError }] =
    useAddProductMutation();

  const handleImageChange = (event) => {
    if (event.target.files.length) {
      const files = Array.from(event.target.files).slice(0, 4 - images.length); // Limit to 4 files
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...files]);
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
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

    const requiredFields = [name, description, category, price, quantity];
    const hasEmptyField = requiredFields.some(field => !field);
    console.log(requiredFields)

    if (hasEmptyField || images.length !== 4) {
        toast.error("All fields are required and exactly four images must be uploaded.");
        return;
    }

    setIsLoading(true);

    try {
      const uploadPromises = images.map((image) => uploadFile(image));
      const imageUrls = await Promise.all(uploadPromises);
      console.log(imageUrls);

      const productData = {
        name,
        desc: description,
        category,
        price,
        quantity,
        images: imageUrls, // Send the array of URLs to the backend
      };
console.log(productData)
      await addProduct(productData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      setErrors(error.message || "Upload failed");
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setQuantity("");
      setImages([]);
      setImagePreviews([]); // Clear the previews
      toast.success("Product added successfully!");
    } else if (isError) {
      toast.error("Product upload failed");
    }
  }, [isSuccess, isError]);

  return (
    <>
      {errors && <p className="text-red-500 mb-3 text-sm">{errors}</p>}

      <div className="flex lg:flex-row flex-col gap-4">
        <div className="w-full lg:w-[40%] bg-white rounded-lg p-4">
          <div className="bg-[#D0D0D0] flex justify-center items-center h-full relative">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col justify-center items-center h-full p-4"
            >
              {imagePreviews.length ? (
                <div className="grid grid-cols-2 gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`product-preview-${index}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                        onClick={() => handleImageRemove(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-sm p-3">
                  <p>Upload product images (up to 4)</p>
                  <p>
                    Drag and drop your images or click here to select files.
                  </p>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-[60%] gap-4">
          <CustomInput
            label="Product Name"
            name="name"
            placeholder="Type in product name here..."
            width="full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomInput
            label="Description"
            name="description"
            placeholder="Set a description for the product..."
            width="full"
            textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <CustomInput
            label="Category"
            type="select"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categories.map((cat) => ({
              value: cat.slug,
              label: cat.name,
            }))}
          />
          <CustomInput
            label="Product Price"
            name="price"
            placeholder="Type in product price here..."
            width="full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <CustomInput
            label="Quantity"
            name="quantity"
            placeholder="Enter product quantity..."
            width="full"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <CustomButton
            type="contact"
            text={isLoading ? "Loading" : "Add Product"}
            onClick={handleSubmit}
            width="full"
            Icon={GiCheckMark}
          />
        </div>
      </div>
    </>
  );
}
