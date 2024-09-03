import React, { useContext, useEffect, useState } from "react";
import { Range } from "react-range";
import SortContext from "../hooks/SortContext";
import ProductCard from "../components/ProductCard";
import { Link, useLocation, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import cancel from "@/assets/images/cancel.png";
import CustomButton from "../components/CustomButton";
import { useGetAllCategoryQuery, useGetAllProductQuery } from "@/redux/appData";
import nosearch from "@/assets/images/nosearch.png";

export function MobileFilter({ open, handleOpen, priceRange, setPriceRange }) {
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
          <FilterBar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            handleOpen={handleOpen}
            specialClass={"w-full"}
          />
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

const SuperSimple = ({ values, setValues }) => {
  if (!values) {
    return null; // or return some fallback UI
  }
  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <Range
        step={1}
        min={0}
        max={999999}
        values={values}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              backgroundColor: "#ccc",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: "15px",
              width: "15px",
              backgroundColor: "#000",
            }}
          />
        )}
      />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <input
          type="number"
          value={values[0]}
          readOnly
          style={{
            backgroundColor: "#000",
            width: "80px",
            textAlign: "center",
            marginLeft: "5px",
            color: "#fff",
          }}
        />
        <span> -- </span>
        <input
          type="number"
          value={values[1]}
          readOnly
          style={{
            backgroundColor: "#000",
            width: "80px",
            textAlign: "center",
            marginLeft: "5px",
            color: "#fff",
          }}
        />
      </div>
    </div>
  );
};

function FilterBar({ specialClass, handleOpen, priceRange, setPriceRange }) {
  const { data: categories = [] } = useGetAllCategoryQuery();

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
                onClick={window.innerWidth < 768 ? handleOpen : null}
                key={category._id}
                to={`/all-categories/${category.slug}`}
                className="flex gap-2 p-2 cursor-pointer duration-300 transform hover:scale-95 transition ease-linear"
              >
                <span className="border border-black rounded p-1 lg:px-[11px] lg:py-[5px]"></span>
                <p className="text-[8px] lg:text-lg">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 w-full border-2 border-black py-8 px-5 rounded-lg">
          <h1 className="text-[10px] lg:text-lg font-bold uppercase">
            Filter By Price
          </h1>
          <div className="flex flex-col gap-2 w-full">
            <SuperSimple values={priceRange} setValues={setPriceRange} />
          </div>
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
  const [priceRange, setPriceRange] = useState([300, 300000]); // Price range state
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isSearch = searchParams.get("search");
  const searchResults = location.state?.SearchResults || [];
  const { slug } = useParams(); // Get the category slug from the URL

  useEffect(() => {
    // Determine the products to use: search results, all products, or filtered by category
    let productsToUse = products;

    if (slug) {
      productsToUse = products
        .slice(0, 34)
        .filter((product) => product.category.slug === slug);
    } else if (isSearch && searchResults.length > 0) {
      productsToUse = searchResults; // Use search results if available
    }

    // Filter by price range
    productsToUse = productsToUse.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

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
  }, [sortValue, products, searchResults, isSearch, slug, priceRange]);

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
        <FilterBar
          specialClass={"hidden lg:flex w-1/4"}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          handleOpen={handleOpen}
        />
        <div className="w-full lg:w-3/4 flex flex-col gap-5 items-start">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full py-10">
              <h2 className="md:text-lg lg:text-xl font-bold">
                No products available in this category.
              </h2>
              <p className="text-center md:text-sm lg:text-lg font-normal mt-2">
                Try checking other categories or products.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 p-2">
                {currentProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              {filteredProducts.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
      <MobileFilter
        handleOpen={handleOpen}
        open={open}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      {isSearch && searchResults.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <img src={nosearch} alt="" className="lg:w-[15%]" />
          <h2 className="md:text-lg lg:text-xl font-bold mt-2">
            Ooops! We couldn’t find what you were looking for.
          </h2>
          <p className="text-center md:text-sm lg:text-lg font-normal mt-2">
            Try checking your spelling or use different keywords.
          </p>
        </div>
      )}
    </>
  );
}
