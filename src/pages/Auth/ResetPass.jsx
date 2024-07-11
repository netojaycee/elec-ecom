import React from "react";
import auth from "@/assets/images/auth.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

export default function ResetPass() {
  return (
    <div className="flex items-center justify-center bg-gray-300 min-h-screen">
      <div className="bg-white shadow-md flex rounded-md overflow-hidden w-[90%] lg:w-3/4 2xl:w-2/3 p-4 items-center">
        <div className="md:flex w-1/2 hidden">
          <img src={auth} alt="" className="w-full h-auto lg:h-full" />
        </div>
        <div className="flex flex-col w-full  md:w-1/2 py-5">
          <h2 className="2xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold text-center">
            Set a New password
          </h2>

          <p className="text-center mb-4">Make your account secure always </p>

          <form className="space-y-4 mx-auto w-[80%]">
            <CustomInput
              label="New Password"
              name="password"
              placeholder="Type in a new password..."
              type="password"
            />
            <CustomInput
              label="Confirm Password"
              name="confirm_password"
              placeholder="Re-enter your password..."
              type="password"
            />

            <CustomButton
              type={"normal"}
              text={"Request Link"}
              width={"full"}
              onClick={""}
            />
          </form>
          <p className="text-center mt-4"></p>
        </div>
      </div>
    </div>
  );
}
