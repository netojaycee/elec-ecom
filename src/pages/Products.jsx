import React, { useContext, useEffect, useState } from "react";
import SortContext from "../hooks/SortContext";
import products, { categories } from "../redux/data";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination"; // Ensure you have a Pagination component

export default function Products() {
  const { sortValue } = useContext(SortContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortValue === "lowest") {
        return a.price - b.price;
      } else if (sortValue === "highest") {
        return b.price - a.price;
      } else if (sortValue === "alphabetical") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    if (sortedProducts.length > 0) {
      setFilteredProducts(sortedProducts);
    } else {
      setFilteredProducts(products);
    }
  }, [sortValue]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="w-full flex gap-5 items-start">
        <div className="hidden lg:flex w-1/4 flex-col gap-5 items-start p-2">
          <div className="flex flex-col gap-2 w-full border-2 border-black py-8 px-5 rounded-lg">
            <h1 className="text-[10px] lg:text-lg font-bold uppercase">
              Product Categories
            </h1>
            <div className="flex flex-col gap-2 w-full">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/all-categories/${category.slug}`}
                  className="flex gap-2 p-2 cursor-pointer duration-300 transform hover:scale-95 transition ease-linear"
                >
                  <span className="border border-black rounded px-[11px] py-[5px]"></span>
                  <p>{category.title}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full border-2 border-black py-8 px-5 rounded-lg">
            <h1 className="text-[10px] lg:text-lg font-bold uppercase">
              Filter By Price
            </h1>
            <div className="flex flex-col gap-2 w-full">price filter</div>
          </div>
        </div>
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
     
    </>
  );
}
