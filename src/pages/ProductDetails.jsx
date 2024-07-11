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

export function DetailsTab({ activeTab, setActiveTab }) {
  const data = [
    {
      label: "Description",
      value: "description",
      desc: `Our energy-efficient LED bulb extension provides bright and long-lasting illumination, perfect for any room. With advanced LED technology, it reduces energy consumption and lowers electricity bills.

Key Features
Energy Efficiency: The LED Extension Bulb consumes significantly less energy compared to traditional incandescent bulbs, helping you reduce your electricity bills and environmental footprint. It delivers bright light while maintaining low power consumption.
Bright and Long-lasting Illumination: This bulb provides a high lumen output, ensuring your space is well-lit. The LED technology ensures a long lifespan, offering up to 25,000 hours of continuous use, reducing the need for frequent replacements.
Durable Construction: Made from high-quality materials, the LED Extension Bulb is designed to withstand daily wear and tear. Its robust construction ensures long-term durability and consistent performance.
Versatile Design: The extension design allows for easy installation in various lighting fixtures, making it suitable for a wide range of applications. Whether you need to light up a large room, a small corner, or an outdoor area, this bulb is up to the task.
Eco-friendly: Free from harmful chemicals like mercury, this LED bulb is an environmentally friendly choice. It also emits lower levels of heat compared to traditional bulbs, contributing to a safer and more comfortable environment.
Instant On: Unlike some energy-saving bulbs that take time to reach full brightness, the LED Extension Bulb provides instant, full-brightness illumination the moment you switch it on.
Wide Beam Angle: With a wide beam angle, this bulb ensures a broader and more even distribution of light, eliminating dark spots and shadows.

Technical Specifications
Power Consumption: 10 watts
Lumen Output: 800 lumens
Color Temperature: 2700K (Warm White) / 4000K (Neutral White) / 6500K (Cool White)
Lifespan: 25,000 hours
Base Type: E27/B22
Voltage: AC 100-240V
Beam Angle: 180 degrees
Dimensions: 60mm (Diameter) x 120mm (Height)
Material: Aluminum and PC (Polycarbonate)
CRI (Color Rendering Index): >80
Dimmable: Optional (depending on the model)

Applications
Home Lighting: Ideal for living rooms, bedrooms, kitchens, and bathrooms. Its warm light creates a cozy atmosphere, while the cool light is perfect for task lighting.
Office Lighting: Suitable for workspaces, meeting rooms, and reception areas, providing bright and efficient lighting to boost productivity.
Retail and Commercial Spaces: Perfect for shops, showrooms, and lobbies, enhancing the visibility and appeal of products.
Outdoor Lighting: Weather-resistant design makes it suitable for outdoor fixtures, providing reliable illumination for gardens, patios, and walkways.

Installation Instructions
Turn Off Power: Ensure the power is turned off at the switch or circuit breaker before installation.
Remove Old Bulb: Carefully remove the old bulb from the socket.
Install LED Extension Bulb: Screw the LED Extension Bulb into the socket until it is securely in place.
Turn On Power: Restore power and switch on the light to enjoy bright, energy-efficient illumination.

Warranty and Support
Warranty: Comes with a 3-year limited warranty covering manufacturing defects.
Customer Support: Our dedicated customer support team is available to assist with any questions or issues. Contact us via email or phone for prompt and reliable service.

Upgrade to the LED Extension Bulb and experience the perfect combination of efficiency, durability, and high-quality lighting. This bulb is designed to meet all your lighting needs while offering significant energy savings and a long operational life.`,
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
            <h1 className="font-semibold text-2xl">Led Bulb Extension</h1>
            <p className="font-bold text-2xl">N1, 500</p>
            <p className="font-bold text-xs">
              + shipping from ₦450 to LEKKI-AJAH (SANGOTEDO)
            </p>
          </div>
        </div>

        <div className="">
          <DetailsTab activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="">
          <PageTitle title="Similar Items" />
        </div>
      </div>
    </>
  );
}
