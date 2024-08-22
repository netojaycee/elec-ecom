import React, { useState, useEffect } from "react";
import { BiPencil, BiPlus, BiTrash, BiImageAdd } from "react-icons/bi";
import Pagination from "@/components/Pagination";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { GiCheckMark } from "react-icons/gi";
import { toast } from "react-toastify";
import {
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetAllCategoryQuery,
} from "../../../redux/appData";

export function EditCategory({ handleOpen, setOpen, open, categoryItem }) {
  const [categoryName, setCategoryName] = useState(categoryItem?.name || "");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(categoryItem?.image || null);
  const [errors, setErrors] = useState("");

  const [
    editCategory,
    { isLoading: isEditing, isSuccess: editSuccess, isError: editError },
  ] = useEditCategoryMutation();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
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

    if (!categoryName || (!image && !imagePreview)) {
      toast.error("All fields are required");
      return;
    }

    try {
      const imageBase64 = image ? await convertToBase64(image) : imagePreview;
      const credentials = {
        name: categoryName,
        image: imageBase64,
      };

      await editCategory({ slug: categoryItem.slug, credentials });

      setOpen(false);
    } catch (error) {
      setErrors(error.error.data);
      console.error(error);
    }
  };

  useEffect(() => {
    if (editSuccess) {
      toast.success("Category updated successfully!");
    } else if (editError) {
      toast.error("Update failed");
    }
  }, [editSuccess, editError]);

  return (
    <>
      <Dialog size="md" open={open} handler={handleOpen}>
        <DialogHeader>Edit Category</DialogHeader>
        <DialogBody>
          {errors && <p className="text-red-500 mb-3 text-sm">{errors}</p>}

          <div className="flex lg:flex-row flex-col gap-4">
            <div className="w-full lg:w-[40%] bg-white rounded-lg p-4">
              <div className="bg-[#D0D0D0] flex justify-center items-center h-[150px] w-[150px] relative">
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
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Category"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-sm p-3">
                      <BiImageAdd size={40} />
                      <p>Upload a category image thumbnail</p>
                      <p>
                        Drag and drop your image or click here to select a file.
                      </p>
                    </div>
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
                text={isEditing ? "Loading" : "Update Category"}
                onClick={handleSubmit}
                width="full"
                Icon={GiCheckMark}
              />
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default function AllCategory() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const { data: category = [] } = useGetAllCategoryQuery();
  const [
    deleteCategory,
    {
      isLoading: isDeleting,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      error: deleteError,
    },
  ] = useDeleteCategoryMutation();
  const [open, setOpen] = useState(false);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [categoryItemToEdit, setCategoryItemToEdit] = useState(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDelete = (slug) => {
    setCategoryToDelete(slug);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    await deleteCategory(categoryToDelete);

    setShowConfirmDelete(false);
    setCategoryToDelete(null);
    toast.success("Category deleted successfully!");
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setCategoryToDelete(null);
  };

  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategory = category.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      <div className="flex justify-end w-full mb-8">
        <CustomButton
          type="contact"
          text="Add New Category"
          to="/admin/add-category"
          width=""
          Icon={BiPlus}
        />
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="flex items-center w-full px-4 py-2 bg-white rounded-lg mb-4">
            <p className="text-xs font-normal w-[15%]">s/n</p>
            <p className="text-xs font-normal w-[26%]">Category Name</p>
            <p className="text-xs font-normal w-[11%]">Date Added</p>
            <p className="text-xs font-normal w-[35%]"></p>
          </div>
          <div className="flex flex-col gap-3">
            {currentCategory.map((categoryItem, index) => (
              <div
                key={categoryItem.id}
                className="flex items-center w-full px-4 py-2 bg-white rounded-lg"
              >
                <p className="text-sm font-normal w-[15%]">
                  00{indexOfFirstCategory + index + 1}
                </p>
                <p className="text-sm font-normal w-[26%]">
                  {categoryItem.name}
                </p>
                <p className="text-sm font-normal w-[11%]">
                  {formatDate(categoryItem.createdAt)}
                </p>
                <p className="items-center gap-5 text-sm font-normal w-[35%] flex justify-end">
                  <BiPencil
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => {
                      handleOpen();
                      setCategoryItemToEdit(categoryItem);
                    }}
                  />

                  <BiTrash
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => handleDelete(categoryItem.slug)}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p>
          Showing{" "}
          {indexOfFirstCategory > category.length
            ? category.length
            : indexOfFirstCategory + 1}{" "}
          to {Math.min(indexOfLastCategory, category.length)} of{" "}
          {category.length} category
        </p>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={category.length}
          paginate={handlePageChange}
          currentPage={currentPage}
        />
      </div>

      {categoryItemToEdit && (
        <EditCategory
          handleOpen={handleOpen}
          setOpen={setOpen}
          open={open}
          categoryItem={categoryItemToEdit}
        />
      )}

      {showConfirmDelete && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8">
            <p className="mb-4">
              Are you sure you want to delete this category?
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
