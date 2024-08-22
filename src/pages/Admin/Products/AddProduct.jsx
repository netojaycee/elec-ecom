import React, { useState } from "react";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { GiCheckMark } from "react-icons/gi";
import { useGetAllCategoryQuery, useAddProductMutation } from "../../../redux/appData";
import { toast } from "react-toastify";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState("");

  const { data: categories = [] } = useGetAllCategoryQuery();
  const [addProduct, { isLoading, isSuccess, isError }] = useAddProductMutation();

  const handleImageChange = (event) => {
    if (event.target.files.length) {
      const files = Array.from(event.target.files).slice(0, 4); // Limit to 4 files
      setImages(prevImages => [...prevImages, ...files]);
    }
  };

  const handleImageRemove = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
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

    if (!name || !description || !category || !price || !quantity || images.length === 0) {
      toast.error("All fields are required and at least one image must be uploaded");
      return;
    }

    try {
      const imagePromises = images.map(image => convertToBase64(image));
      const imagesBase64 = await Promise.all(imagePromises);

      const productData = {
        name,
        desc: description,
        category,
        price,
        quantity,
        images: imagesBase64,
      };

      await addProduct(productData);
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setQuantity("");
      setImages([]);
    } catch (error) {
      setErrors(error.message || "Upload failed");
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
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
              {images.length ? (
                <div className="grid grid-cols-2 gap-2">
                  {images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
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
                  <p>Upload product images</p>
                  <p>Drag and drop your images or click here to select files.</p>
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
