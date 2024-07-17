import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiHeart } from "react-icons/bi";
import CustomButton from "@/components/CustomButton";
import nocart from "@/assets/images/nocart.png";
import { removeFromFavorites } from "../../redux/slices/favoriteSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { FaHeart } from "react-icons/fa";

export default function SavedItems() {
  const favoriteItems = useSelector((state) => state.favorites.favoriteItems);
  const dispatch = useDispatch();
  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  return (
    <>
      {favoriteItems.length > 0 ? (
        <div className="p-3">
          <div className="bg-white shadow-md shadow-gray-400 rounded-md p-2 md:p-4 flex flex-col">
            {/* Iterate over favoriteItems */}
            {favoriteItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row md:items-center w-full mt-2 border border-gray-300 p-2 md:p-4 rounded-md gap-3 md:gap-10"
              >
                <div className="flex md:w-[60%] w-full justify-between md:justify-start items-center">
                  <div className="text-sm font-normal flex items-center gap-4 lg:gap-10 w-full">
                    <img
                      src={item.image.secure_url}
                      alt=""
                      className="w-[100px] h-[80px] bg-gray-300 rounded-md"
                    />
                    <div className="flex flex-col gap-3 ">
                      <p className="text-sm font-bold line-clamp-1 md:w-auto w-[90%]">
                        {item.name}
                      </p>
                      <p className="text-xs font-normal line-clamp-3 w-[70%] md:w-auto">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold hidden items-center w-[40%] md:flex justify-center">
                    <span className="font-serif">&#8358;</span> {item.price}
                  </p>
                </div>
                <div className="flex items-center md:w-[60%] w-full justify-between md:justify-end">
                  <div className="text-sm font-normal md:w-[50%] flex items-center justify-center order-3 md:order-1">
                    <CustomButton
                      type={"cart"}
                      text={"Add to Cart"}
                      onClick={() => handleAddToCart(item)}
                      width={"full"}
                    />
                  </div>
                  <div className="text-black text-sm font-normal md:w-[20%] flex justify-center order-1 md:order-3 items-center">
                    <FaHeart
                      className="cursor-pointer lg:w-7 lg:h-7 text-red-500"
                      onClick={() => dispatch(removeFromFavorites(item))}
                    />

                    <p className="text-sm font-bold md:hidden">Remove</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src={nocart} alt="" className="" />
          <h2 className="md:text-lg lg:text-xl font-bold mt-2">
            Your Favorites List is empty!
          </h2>
          <p className="text-center md:text-sm lg:text-lg font-normal mt-2">
            Looks like you haven’t added anything to your favorites yet
          </p>
        </div>
      )}
    </>
  );
}
