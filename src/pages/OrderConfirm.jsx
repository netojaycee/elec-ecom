import React from "react";
import CustomButton from "@/components/CustomButton";
import orderImage from "@/assets/images/nocart.png"; // Replace with your actual image path
import { CiDeliveryTruck } from "react-icons/ci";
import { FaAngleRight, FaPhone } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function OrderConfirm() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-start min-h-screen py-8 px-4 ">
      <div className="flex flex-col md:flex-row w-full  gap-10">
        {/* Main Card */}
        <div className="bg-white shadow-md w-full mx-auto lg:w-7/12 rounded-md p-8 flex flex-col justify-center">
          <img
            src={orderImage}
            alt="Order Confirmation"
            className="w-1/2 mx-auto"
          />
          <h2 className="mb-2 text-center">THANK YOU!</h2>
          <p className="text-2xl font-bold mb-2 text-center">YOUR ORDER IS CONFIRMED</p>
          <p className="mb-2 text-center">
            We will send you an email confirmation to example299@gmail.com
            shortly. Kindly check to confirm
          </p>
          <p className="flex justify-end mt-4">
            Expected delivery time:{"  "}
            <span className="font-bold"> 3 - 5 days</span>
          </p>
        </div>

        <div className="flex flex-col w-full lg:w-4/12 gap-6">
          {/* Order Details Card */}
          <div className="bg-white shadow-md p-6 rounded-md">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-bold mb-4">Order Details</h2>
              <div className="">
                <CustomButton
                  type={"invoice"}
                  text={"Download receipt"}
                  onClick=""
                  width="full"
                />
              </div>
            </div>
            <hr className="my-4" />
            <div>
              <h3 className="font-semibold px-2 flex items-center gap-2 ">
                <CiDeliveryTruck className="w-4 h-4" /> Delivery Address
              </h3>
              <p className="text-sm px-8">
                Mr. John Doe, Flat 4B, Block C, Olumide Williams Court, No. 15
                Adeola Odeku Street, Victoria Island, Lagos State, Nigeria.
              </p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold px-2 flex items-center gap-2 ">
                <FaPhone className="w-4 h-4" /> Contact Info
              </h3>
              <p className="text-sm px-8">example299@gmail.com</p>
              <p className="px-8 text-sm">+234 8034567892</p>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white shadow-md p-6 rounded-md">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold mb-4">Order Summary (5)</h2>
              <FaAngleRight
                onClick={() => navigate("/my-orders/order1")}
                className="w-4 h-4 text-primary mb-4 cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>N6,000</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>N800</span>
              </div>
              <hr className="w-[90%] mx-auto border my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>N6,800</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
