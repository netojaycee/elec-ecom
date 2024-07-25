import React, { useContext, useEffect, useState } from "react";
import SortContext from "../hooks/SortContext";
import { categories } from "../redux/data";
import ProductCard from "../components/ProductCard";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination"; // Ensure you have a Pagination component
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import cancel from "@/assets/images/cancel.png";
import CustomButton from "../components/CustomButton";
import { useGetAllProductQuery } from "../redux/appData";
import nosearch from "@/assets/images/nosearch.png";

export function MobileFilter({ open, handleOpen }) {
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <img
            onClick={handleOpen}
            src={cancel}
            alt=""
            className="cursor-pointer"
          />
        </DialogHeader>
        <DialogBody>
          <FilterBar handleOpen={handleOpen} specialClass={"w-full"} />
        </DialogBody>
        <DialogFooter>
          <CustomButton
            type={"normal"}
            width={"full"}
            text="Apply Price Filter"
            onClick={handleOpen}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
}

function FilterBar({ specialClass, handleOpen }) {
  return (
    <>
      <div className={` ${specialClass} flex-col gap-5 items-start p-2`}>
        <div className="flex flex-col gap-2 w-full border-2 border-black py-8 px-5 rounded-lg">
          <h1 className="text-[10px] lg:text-lg font-bold uppercase">
            Product Categories
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col gap-1 w-full">
            {categories.map((category) => (
              <Link
                onClick={handleOpen}
                key={category.id}
                to={`/all-categories/${category.slug}`}
                className="flex gap-2 p-2 cursor-pointer duration-300 transform hover:scale-95 transition ease-linear"
              >
                <span className="border border-black rounded p-1 lg:px-[11px] lg:py-[5px]"></span>
                <p className="text-[8px] lg:text-lg">{category.title}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 w-full border-2 border-black py-8 px-5 rounded-lg">
          <h1 className="text-[10px] lg:text-lg font-bold uppercase">
            Filter By Price
          </h1>
          <div className="flex flex-col gap-2 w-full">price filter</div>
        </div>
      </div>
    </>
  );
}

export default function Products() {
  const { sortValue, handleOpen, open } = useContext(SortContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { data: products = [] } = useGetAllProductQuery();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isSearch = searchParams.get("search");
  const searchResults = location.state?.SearchResults || [];

  useEffect(() => {
    // Determine the products to use: search results or all products
    const productsToUse =
      isSearch && searchResults.length > 0 ? searchResults : products;

    const sortedProducts = [...productsToUse].sort((a, b) => {
      if (sortValue === "lowest") {
        return a.price - b.price;
      } else if (sortValue === "highest") {
        return b.price - a.price;
      } else if (sortValue === "alphabetical") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    setFilteredProducts(sortedProducts);
  }, [sortValue, products, searchResults, isSearch]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log(isSearch);

  return (
    <>
      <>
        <div className="w-full flex gap-5 items-start">
          <FilterBar specialClass={"hidden lg:flex w-1/4"} />
          <div className="w-full lg:w-3/4 flex flex-col gap-5 items-start">
            <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 p-2">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
        <MobileFilter handleOpen={handleOpen} open={open} />
      </>
      <>
        {isSearch && searchResults.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <img src={nosearch} alt="" className="lg:w-[15%]" />
            <h2 className="md:text-lg lg:text-xl font-bold mt-2">
              Ooops! We couldn’t find what you were looking for
            </h2>
            <p className="text-center md:text-sm lg:text-lg font-normal mt-2">
              Try searching for something else...
            </p>
          </div>
        )}
      </>
    </>
  );
}
