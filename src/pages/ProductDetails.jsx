import React from "react";
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

  const product = products?.find(
    (product) => slugify(product.name, { lower: true }) === slug
  );

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10">
          <div className="w-1/2 ">
            {/* <Carousel
        showArrows={false}
            showThumbs={true}
              infiniteLoop
              emulateTouch
              swipeable
              thumbWidth={180}
              showStatus={false}
              width={500}
            >
              <div className="bg-white shadow-md">
                <img src={productImage} className="" />
              </div>
              <div className="bg-white shadow-md ">
                <img src={productImage} />
              </div>
              <div className="bg-white shadow-md ">
                <img src={productImage} />
              </div>
              
            </Carousel> */}
            carousel
          </div>
          <div className="flex flex-col gap-3 w-1/2">
            <h1 className="font-semibold text-lg lg:text-2xl">{product.name}</h1>
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
