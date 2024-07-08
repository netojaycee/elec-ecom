import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import main_hero from "@/assets/images/main-hero.png";
import two_hero from "@/assets/images/2-hero.png";
import one_hero from "@/assets/images/1-hero.png";

export default function Hero() {
  return (
    <div className="">
      <div className="flex flex-row justify-between gap-2 mx-0">
        <div className="w-full lg:w-[70%] h-full">
          <Carousel
            autoPlay
            showThumbs={false}
            infiniteLoop
            emulateTouch
            swipeable
            showStatus={false}
          >
            <div>
              <img src={main_hero} className="object-cover" />
            </div>
            <div>
              <img src={main_hero} />
            </div>
            <div>
              <img src={main_hero} />
            </div>
          </Carousel>
        </div>
        <div className="hidden lg:flex flex-col lg:w-[30%] rounded-xl gap-[10px] ">
          <div className=" h-full">
            <img src={two_hero} className="object-cover w-full h-full rounded-xl" />
          </div>
          <div className="h-full">
            <img src={one_hero} className="object-cover w-full h-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
