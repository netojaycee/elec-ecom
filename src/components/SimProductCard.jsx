import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToFavorites, removeFromFavorites } from "../redux/slices/favoriteSlice";

export default function SimProductCard({ product }) {
  // const slug = slugify(product.name, { lower: true });

  const dispatch = useDispatch();

  const favoriteItems = useSelector((state) => state.favorites.favoriteItems);
  const isFavorite = favoriteItems.some((item) => item._id === product._id);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleToggleFavorite = (product) => {
    if (!isFavorite) {
      dispatch(addToFavorites(product));
    } else {
      dispatch(removeFromFavorites(product));
    }
  };

  return (
    <div className="flex shadow-md bg-white shadow-gray-500 rounded-lg p-2 h-[180px] w-full"> {/* Fixed height */}
      <Link to={`/all-products/${product.slug}`} className="cursor-pointer w-[35%]">
        <div className="w-full h-[160px] overflow-hidden flex items-center justify-center bg-gray-200 rounded-lg p-2 shadow-sm"> {/* Fixed image container height */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-fit object-center h-full w-full" // Maintain image aspect ratio
          />
        </div>
      </Link>

      {/* <hr className="w-[90%] mx-auto border border-gray-400 my-2" /> */}

      <div className="flex flex-col p-2 flex-grow w-[65%]"> {/* Flex-grow ensures equal height for the content */}
        <div className="flex items-center justify-between">
          <p className="font-semibold text-[12px] lg:text-lg line-clamp-1 overflow-hidden mb-4 lg:mb-0">{product.name}</p>
          {isFavorite ? (
            <FaHeart
              className="cursor-pointer lg:w-5 lg:h-5 text-red-500 mb-4 lg:mb-0"
              onClick={() => handleToggleFavorite(product)}
            />
          ) : (
            <FaRegHeart
              className="cursor-pointer lg:w-5 lg:h-5 text-red-500 mb-4 lg:mb-0"
              onClick={() => handleToggleFavorite(product)}
            />
          )}
        </div>

        <div className="h-[60px] overflow-hidden"> {/* Fixed height for description */}
          <p className="text-sm h-full text-gray-600 line-clamp-3"> {/* Limit lines */}
            {product.desc}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between mt-2">
          <div className="flex flex-col lg:mr-2 items-start  justify-between w-full">
            <p className="text-gray-500 text-xs lg:text-sm">PRICE</p>
            <p className="font-bold">
              <span className="font-serif">&#8358; </span>
              {product.price}
            </p>
          </div>

          <CustomButton
            type={"cart"}
            text="Add"
            onClick={() => handleAddToCart(product)}
            width={"full"}
          />
        </div>
      </div>
    </div>
  );
}
