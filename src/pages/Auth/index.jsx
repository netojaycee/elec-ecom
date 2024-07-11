import React, { useState } from "react";
import auth from "@/assets/images/auth.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { Link } from "react-router-dom";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="flex items-center justify-center bg-gray-300 min-h-screen">
      <div className="bg-white shadow-md flex rounded-md overflow-hidden w-[90%] lg:w-3/4 2xl:w-2/3 p-4 items-center">
        <div className="md:flex w-1/2 hidden">
          <img src={auth} alt="" className="w-full h-auto lg:h-full" />
        </div>
        <div className="flex flex-col w-full  md:w-1/2 py-5">
          <h2 className="2xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold text-center">
            {isSignUp
              ? "Create an Account"
              : "Welcome Back! Sign in to Your Account"}
          </h2>

          {isSignUp ? (
            <p className="text-center mb-4">
              Already have an account?
              <span
                onClick={toggleForm}
                className="text-primary cursor-pointer"
              >
                {" "}
                Sign in
              </span>
            </p>
          ) : (
            <p className="text-center mb-4">
              Don't have an account?
              <span
                onClick={toggleForm}
                className="text-primary cursor-pointer"
              >
                {" "}
                Sign up
              </span>
            </p>
          )}
          <form className="space-y-4 mx-auto w-[80%]">
            {isSignUp && (
              <CustomInput
                label="Full Name"
                name="name"
                placeholder="Type in your full name..."
                width={"full"}
              />
            )}
            <CustomInput
              label="Email"
              name="email"
              placeholder="Type in your email..."
            />
            <CustomInput
              label="Password"
              name="password"
              placeholder="Type in your password..."
              type="password"
            />
            {isSignUp && (
              <CustomInput
                label="Confirm Password"
                name="confirm_password"
                placeholder="Re-enter your password..."
                type="password"
              />
            )}
            {!isSignUp && (
              <Link
                to={"/forgot-password"}
                className="text-red-500 flex items-center justify-end cursor-pointer"
              >
                forgot password?
              </Link>
            )}
            <CustomButton
              type={"normal"}
              text={isSignUp ? "Sign Up" : "Sign In"}
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
