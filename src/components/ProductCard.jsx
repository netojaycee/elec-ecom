import React from "react";
import product1 from "@/assets/images/product1.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CustomButton from "./CustomButton";
import { Link, useNavigate } from "react-router-dom";
import slugify from "slugify";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToFavorites, removeFromFavorites } from "../redux/slices/favoriteSlice";


export default function ProductCard({ product }) {
  const isMobile = window.innerWidth <= 640;
  const slug = slugify(product.name, { lower: true });

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1520,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { data, error, isLoading } = useGetAllProductsQuery();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // navigate("/cart");
  };

  const favoriteItems = useSelector((state) => state.favorites.favoriteItems);


  const isFavorite = favoriteItems.some((item) => item._id === product._id);


  const handleToggleFavorite = (product) => {
    if (!isFavorite) {
      dispatch(addToFavorites(product));
    } else {
      dispatch(removeFromFavorites(product));
    }
  };

  return (
    <>
      <div className="flex flex-col shadow-md bg-white shadow-gray-500 rounded-lg p-2">
        {/* <Link to={`/all-products/${product.slug}`} className="cursor-pointer"> */}
        <Link to={`/all-products/${slug}`} className="cursor-pointer">
          <img
            src={product.image.secure_url}
            alt={product.name}
            className="w-[274px] h-[200px] object-contain"
          />
        </Link>
        {/* <div className="slider-container lg:px-2 px-5">
          <Slider {...settings}>
            {product.images.map((image) => (
              <img
                src={image}
                alt={product.name}
                className="w-[274px] h-[200px] object-contain"
              />
            ))}
          </Slider>
        </div> */}
        <hr className="w-[90%] mx-auto border border-gray-400 my-2" />
        <div className="flex flex-col p-2">
          <div className="flex items-center justify-between">
            <p className="font-bold text-[12px] lg:text-lg">{product.name} </p>
            {isFavorite ? (
              <FaHeart
                className="lg:block hidden cursor-pointer lg:w-7 lg:h-7 text-red-500"
                onClick={() => handleToggleFavorite(product)}
              />
            ) : (
              <FaRegHeart
                className="lg:block hidden cursor-pointer lg:w-7 lg:h-7 text-red-500"
                onClick={() => handleToggleFavorite(product)}
              />
            )}          </div>
          {/* <div className="p-2 flex items-center gap-2">
            {product.tags.slice(0, isMobile ? 2 : 4).map((tag) => (
              <p className="border-2 border-gray-300 p-1 text-[10px] lg:text-xs rounded">
                {tag}
              </p>
            ))}
          </div> */}
          <div className="lg:h-[60px] h-[30px] overflow-hidden">
            {" "}
            {/* Fixed height for description */}
            <p className="text-sm text-gray-600 line-clamp-1 lg:line-clamp-3">
              {product.desc}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between mt-1">
            <div className="flex justify-between items-center w-full lg:w-auto">
              <div className="flex flex-col">
                <p className="text-gray-500 text-xs lg:text-sm">PRICE</p>
                <p className="font-bold">
                  {" "}
                  <span className="font-serif">&#8358; </span>
                  {product.price}
                </p>
              </div>
              {isFavorite ? (
                <FaHeart
                  className="cursor-pointer lg:hidden lg:w-7 lg:h-7 text-red-500"
                  onClick={() => handleToggleFavorite(product)}
                />
              ) : (
                <FaRegHeart
                  className="cursor-pointer lg:hidden lg:w-7 lg:h-7 text-red-500"
                  onClick={() => handleToggleFavorite(product)}
                />
              )}            </div>
            {/* <div className="w-full"> */}
            <CustomButton
              type={"cart"}
              text="Add"
              onClick={() => handleAddToCart(product)}
              to={""}
              width={"full"}
            />
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}








