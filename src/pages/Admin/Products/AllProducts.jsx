import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { BiImageAdd, BiPencil, BiPlus, BiTrash } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import Pagination from "@/components/Pagination";

import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import CustomInput from "@/components/CustomInput";
import { GiCheckMark } from "react-icons/gi";
import { toast } from "react-toastify";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "@/redux/appData";
import {
  useEditProductMutation,
  useGetAllCategoryQuery,
} from "../../../redux/appData";

export function EditProduct({ handleOpen, setOpen, open, productItem }) {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState("");

  const { data: categories = [] } = useGetAllCategoryQuery();
  const [
    editProduct,
    { isLoading: isEditing, isSuccess: editSuccess, isError: editError },
  ] = useEditProductMutation();

  // Reset state when productItem changes
  useEffect(() => {
    if (productItem) {
      setProductName(productItem.name || "");
      setDescription(productItem.desc || "");
      setCategory(productItem.category?.slug || "");
      setPrice(productItem.price || "");
      setQuantity(productItem.quantity || "");
      setImages(productItem.images || []);
      setPreviewImages(productItem.images || []);
      setErrors(""); // Clear any previous errors
    }
  }, [productItem]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 4 - images.length); // Limit to 4 images total
    if (files.length) {
      // Check if each file is a valid File object
      const validFiles = files.filter((file) => file instanceof Blob);

      if (validFiles.length) {
        const newImages = [...images, ...validFiles];
        setImages(newImages);

        const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
        setPreviewImages((prevPreviews) => [...prevPreviews, ...newPreviews]);
      }
    }
  };

  const handleImageRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file instanceof Blob) {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } else {
        reject(new Error("Invalid file type"));
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    if (
      !productName ||
      !description ||
      !category ||
      !price ||
      !quantity ||
      images.length === 0
    ) {
      toast.error(
        "All fields are required and at least one image must be uploaded"
      );
      return;
    }

    const processImages = async () => {
      // Check if the images array has changed
      const imagesChanged =
        JSON.stringify(images) !== JSON.stringify(productItem?.images);

      // If images have changed, convert to base64
      let imagesBase64;
      if (imagesChanged) {
        const imageBase64Promises = images.map((image) =>
          convertToBase64(image)
        );
        imagesBase64 = await Promise.all(imageBase64Promises);
      } else {
        // If no change, just pass the original images array
        imagesBase64 = images;
      }

      return imagesBase64; // Return the appropriate images
    };

    // Call the function and use the result
    // Do something with imageBase64

    try {
      // Call the function whenever you need to process images
      const imageBase64 = await processImages();

      const credentials = {
        name: productName,
        desc: description,
        category,
        price,
        quantity,
        images: imageBase64,
      };

      await editProduct({ slug: productItem.slug, credentials });
      setOpen(false);
    } catch (error) {
      setErrors(error.message || "Update failed");
      console.error(error);
    }
  };

  useEffect(() => {
    if (editSuccess) {
      toast.success("Product updated successfully!");
    } else if (editError) {
      toast.error("Update failed");
    }
  }, [editSuccess, editError]);

  return (
    <Dialog
      size="lg"
      open={open}
      handler={handleOpen}
      className="overflow-y-auto max-h-screen"
    >
      <DialogHeader>Edit Product</DialogHeader>
      <DialogBody>
        {errors && <p className="text-red-500 mb-3 text-sm">{errors}</p>}

        <div className="flex lg:flex-row flex-col gap-4">
          <div className="w-full lg:w-[40%] bg-white rounded-lg p-4">
            <div className="bg-[#D0D0D0] flex flex-wrap gap-2 p-2 relative">
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
                className="cursor-pointer flex flex-col justify-center items-center"
              >
                {previewImages.length ? (
                  <div className="grid grid-cols-2 gap-2">
                    {previewImages.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
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
                    <BiImageAdd size={40} />
                    <p>Upload product images</p>
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
              name="productName"
              placeholder="Type in product name here..."
              width="full"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
              text={isEditing ? "Loading" : "Update Product"}
              onClick={handleSubmit}
              width="full"
              Icon={GiCheckMark}
            />
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}

export default function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const { data: products = [] } = useGetAllProductQuery();
  console.log(products);
  const [
    deleteProduct,
    {
      isLoading: isDeleting,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      error: deleteError,
    },
  ] = useDeleteProductMutation();
  const [open, setOpen] = React.useState(false);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [productItemToEdit, setProductItemToEdit] = useState(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDelete = (slug) => {
    setProductToDelete(slug);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    // Add your delete logic here, e.g., using a mutation
    console.log(productToDelete);
    await deleteProduct(productToDelete);

    setShowConfirmDelete(false);
    setProductToDelete(null);
    toast.success("Product deleted successfully!");
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setProductToDelete(null);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // This will format the date as MM/DD/YYYY
  };
  return (
    <>
      <div className="flex justify-end w-full mb-8">
        <CustomButton
          type="contact"
          text="Add New Product"
          // onClick={() => console.log("Add New Product Clicked")}
          width=""
          to="/admin/add-product"
          Icon={BiPlus}
        />
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="flex items-center w-full px-4 py-2 bg-white rounded-lg mb-4">
            <p className="text-xs font-normal w-[10%]"> Product ID</p>
            <p className="text-xs font-normal w-[20%]">Product Name</p>
            <p className="text-xs font-normal w-[15%]">Category</p>
            <p className="text-xs font-normal w-[14%]">Price</p>
            <p className="text-xs font-normal w-[13%]">Stock Quantity</p>
            <p className="text-xs font-normal w-[11%]">Date Added</p>
            <p className="text-xs font-normal w-[12%]">Status</p>
            <p className="text-xs font-normal w-[5%]"></p>
          </div>
          <div className="flex flex-col gap-3">
            {currentProducts.map((productItem, index) => (
              <div
                key={index}
                className="flex items-center w-full px-4 py-2 bg-white rounded-lg"
              >
                <p className="text-sm font-normal w-[10%]">
                  00{indexOfFirstProduct + index + 1}
                </p>
                <p className="text-sm font-normal w-[20%]">
                  {productItem.name}
                </p>
                <p className="text-sm font-normal w-[15%]">
                  {productItem.category?.name}
                </p>
                <p className="text-sm font-normal w-[14%]">
                  <span className="font-serif">&#8358; </span>
                  {productItem.price}
                </p>
                <p className="text-sm font-normal w-[13%]">
                  {productItem.quantity}
                </p>
                <p className="text-sm font-normal w-[11%]">
                  {formatDate(productItem.createdAt)}
                </p>
                <p
                  className={`text-sm font-normal w-[10%] p-1 rounded-lg text-center ${
                    productItem.quantity > 0 ? "bg-[#D9F2ED]" : "bg-[#D0D0D0]"
                  }`}
                >
                  {productItem.quantity > 0 ? "in Stock" : "out of Stock"}
                </p>
                <p className="items-center gap-5 text-sm font-normal w-[7%] flex justify-end">
                  <BiPencil
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => {
                      setProductItemToEdit(productItem);
                      handleOpen();
                    }}
                  />

                  <BiTrash
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => handleDelete(productItem.slug)}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p>
          Showing {indexOfFirstProduct + 1} to{" "}
          {Math.min(indexOfLastProduct, products.length)} of {products.length}{" "}
          products
        </p>
        <div className="">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(products.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
        {productItemToEdit && (
          <EditProduct
            handleOpen={handleOpen}
            setOpen={setOpen}
            open={open}
            productItem={productItemToEdit}
          />
        )}
      </div>
      {showConfirmDelete && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8">
            <p className="mb-4">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={cancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
