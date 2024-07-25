import React from "react";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import contactImage from "@/assets/images/contact.png";
import { BsArrowRight } from "react-icons/bs";

export default function Contact() {
  return (
    <div className="flex 2xl:mt-10">
      <div className="md:relative w-[90%] mx-auto md:bg-black 2xl:w-[70%] flex rounded-md overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 hidden md:block bg-black"></div>
        <div className="w-1/2 hidden md:block">
          <img
            src={contactImage}
            alt="Contact"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:absolute w-full md:w-[60%] lg:w-[50%] xl:w-[40%] bg-white shadow-md p-8 rounded-md md:top-1/2 md:left-1/3 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
          <form className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <CustomInput
                label="Name"
                name="name"
                placeholder="Brian Clark"
                width="full"
              />
              <CustomInput
                label="Email"
                name="email"
                placeholder="example@youremail.com"
                width="full"
              />
            </div>
            <CustomInput
              label="Phone"
              name="phone"
              placeholder="+234 456 7890 243"
              width="full"
            />
            <CustomInput
              label="Message"
              name="message"
              placeholder="Type your message here..."
              width="full"
              textarea // Add this prop to render textarea
            />
            <CustomButton
              type="contact"
              text="Send Message"
              onClick=""
              width=""
              Icon={BsArrowRight}
            />
          </form>
        </div>
      </div>

    </div>

  );
}
