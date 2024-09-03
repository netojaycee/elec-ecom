import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import productImage from "@/assets/images/product1.png";
import Slider from "react-slick";
import PageTitle from "@/components/PageTitle";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useGetAllProductQuery } from "../redux/appData";
import SimProductCard from "../components/SimProductCard";
import { BiMinus, BiPlus } from "react-icons/bi";
import CustomButton from "../components/CustomButton";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

export function DetailsTab({ activeTab, setActiveTab, product }) {
  const data = [
    {
      label: "Description",
      value: "description",
      desc: product.desc,
    },
    // {
    //   label: "Reviews",
    //   value: "reviews",
    //   desc: `Because it's about motivating the doers. Because I'm here
    //   to follow my dreams and inspire other people to follow their dreams, too.`,
    // },
  ];
  return (
    <Tabs id="custom-animation" value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-primary shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-primary" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

export default function ProductDetails() {
  const [activeTab, setActiveTab] = React.useState("description");
  const { data: products } = useGetAllProductQuery();
  const { slug } = useParams();

  // const images = [productImage, productImage, productImage];

  const product =
    products && products?.find((product) => product.slug === slug);
  const images = product.images;

  const [mainImage, setMainImage] = useState(images[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (image, index) => {
    setMainImage(image);
    setSelectedIndex(index);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    // **Responsive adjustments for centering:**
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          // Centering for larger screens using `centerMode`
          centerMode: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const similarProducts = products.filter(
    (item) =>
      item.category.name === product.category.name && item._id !== product._id // Exclude the current product
  );

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col gap-3 w-full">
              <div className="bg-white min-h-4 shadow-md p-3 h-[250px] rounded-md">
                <img
                  src={mainImage}
                  alt="Main"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center gap-3 w-full">
                {images.slice(1, 4).map((image, index) => (
                  <div
                    key={index}
                    className={`bg-white min-h-4 shadow-md p-3 w-1/3 h-[120px] cursor-pointer transition-all duration-300 ease-in-out rounded-md ${
                      selectedIndex === index ? "border-2 border-primary" : ""
                    }`}
                    onClick={() => handleImageClick(image, index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full lg:w-1/2">
            <h1 className="font-semibold text-lg lg:text-2xl">
              {product.name}
            </h1>
            <p className="font-bold text-2xl">
              <span className="font-serif">&#8358;</span>
              {product.price}
            </p>
            <p className="font-bold text-xs">
              + shipping from <span className="font-serif">&#8358;</span>450 to
              LEKKI-AJAH (SANGOTEDO)
            </p>

            <div className="flex items-center gap-8">
              {/* <div className="flex items-center gap-8 border border-secondary rounded-md p-2">
              <BiMinus className="h-5 w-5 rounded-full bg-red-500 text-white" />
              <p className="font-semibold">1</p>
              <BiPlus className="h-5 w-5 rounded-full bg-primary text-white" />
              </div>  */}
              <div className="">
                <CustomButton
                  type={"cart"}
                  text="Add to cart"
                  onClick={() => handleAddToCart(product)}
                  width={"full"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <DetailsTab
            product={product}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="">
          <PageTitle title="Similar Items" />

          <div className="slider-container p-2 mt-5">
            <Slider {...settings}>
              {similarProducts.map((product) => (
                <SimProductCard key={product._id} product={product} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
