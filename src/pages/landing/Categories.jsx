import { Link } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard";
import Slider from "react-slick";
import { useGetAllCategoryQuery } from "../../redux/appData";

export default function Categories() {
  const { data: categories } = useGetAllCategoryQuery();

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

  // console.log(categories);

  return (
    <>
      <div className="bg-background_bl text-white p-4 flex items-center justify-between">
        <h1>Categories</h1>
        <Link
          className="text-sm hover:underline cursor-pointer hover:text-primary"
          to="/all-categories"
        >
          View all
        </Link>
      </div>

      <div className="slider-container lg:px-2 px-5">
        <Slider {...settings}>
          {categories &&
            categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
        </Slider>
      </div>
    </>
  );
}
