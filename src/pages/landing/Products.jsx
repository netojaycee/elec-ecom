import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
// import products from "../../redux/data";
import { useGetAllProductQuery } from "../../redux/appData";

export default function Products() {
  const { data: products } = useGetAllProductQuery();
  // console.log(products);
  return (
    <>
      <div className="bg-background_bl text-white p-4 flex items-center justify-between">
        <h1>Popular Items</h1>
        <Link
          className="text-sm hover:underline cursor-pointer hover:text-primary"
          to="/all-products"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 p-2">
        {products && products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </>
  );
}
