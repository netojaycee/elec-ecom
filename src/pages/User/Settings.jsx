import React from "react";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { FaEdit } from "react-icons/fa"; // Example icon for editing the profile photo
import profile from "@/assets/images/profile.png";

export default function Settings() {
  return (
    <div className="flex md:py-8 py-4 px-4 w-full ">
      <div className="bg-white shadow-md rounded-md py-4 md:py-8 px-5 md:px-[50px] 2xl:px-[100px] w-full max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 lg:px-20">Personal Information</h2>

        {/* Profile Photo */}
        <div className="flex justify-center md:mb-8 mb-4  w-full">
          <div className="relative">
            <img
              src={profile} // Replace with the path to the profile photo
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
              <FaEdit className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:px-20  ">
          <div className="space-y-2 md:space-y-4">
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 ">
              <CustomInput
                label="First Name"
                name="first_name"
                placeholder="Jonathan"
                width="full"
              />
              <CustomInput
                label="Last Name"
                name="last_name"
                placeholder="Psquare"
                width="full"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <CustomInput
                label="Email Address"
                name="email"
                placeholder="Jonathan345@gmail.com"
                width="full"
              />
              <CustomInput
                label="Phone Number"
                name="phone"
                placeholder="+234 90345672322"
                type="tel"
                width="full"
              />
            </div>
            <div className="flex justify-start mt-8">
              <CustomButton
                type="normal"
                text="Save Info"
                onClick=""
                width="auto"
              />
            </div>
          </div>
        </div>

        <hr className="lg:my-6 my-2" />

        {/* Security Information */}
        <div className="lg:px-20">
          <h2 className="text-2xl font-bold mb-4">Security Information</h2>
          <div className="space-y-2 md:space-y-4">
            <CustomInput
              label="Current Password"
              name="current_password"
              placeholder="Current Password"
              type="password"
              width="full"
            />
            <CustomInput
              label="New Password"
              name="new_password"
              placeholder="New Password"
              type="password"
              width="full"
            />
            <CustomInput
              label="Confirm New Password"
              name="confirm_new_password"
              placeholder="Confirm New Password"
              type="password"
              width="full"
            />
          </div>
          <div className="flex justify-start mt-8">
            <CustomButton
              type="normal"
              text="Update Password"
              onClick=""
              width="auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
