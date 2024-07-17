import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import productImage from "@/assets/images/product1.png";
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
import slugify from "slugify";

export function DetailsTab({ activeTab, setActiveTab, product }) {
  const data = [
    {
      label: "Description",
      value: "description",
      desc: product.desc,
    },
    {
      label: "Reviews",
      value: "reviews",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
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

  const images = [productImage, productImage, productImage];

  const product =
    products &&
    products?.find(
      (product) => slugify(product.name, { lower: true }) === slug
    );

  const [mainImage, setMainImage] = useState(images[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (image, index) => {
    setMainImage(image);
    setSelectedIndex(index);
  };
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row gap-10">
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
                {images.map((image, index) => (
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
        </div>
      </div>
    </>
  );
}
