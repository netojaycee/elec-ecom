import React from "react";
import notfound from "@/assets/images/notfound.png";
import CustomButton from "../components/CustomButton";


export default function Error() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <img src={notfound} alt="" className="" />
        <h2 className=" md:text-lg lg:text-xl font-bold mt-2">
        Oops! Page Not Found!
        </h2>
        <p className="text-center md:text-sm lg:text-lg font-normal mt-2">
        It looks like you've hit a dead end. The page you're looking for doesn't exist...
        </p>
        <CustomButton
          type={"back"}
          text="go to homepage"
          to={"/"}
        />
      </div>
    </>
  );
}
