import React from "react";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

export default function Checkout() {
  return (
    <div className="flex justify-center items-start min-h-screen py-8 px-4">
      <div className="flex flex-col md:flex-row w-full  gap-10">
        {/* First Card */}
        <div className="bg-white shadow-md p-6 w-full lg:w-7/12 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Add Delivery Address</h2>
          <hr className="w-[90%] mx-auto border my-2 md:my-6" />

          <form className="space-y-4">
            <CustomInput
              label="Housing Address"
              name="address"
              placeholder="Type your address..."
              width={"full"}
            />
            <CustomInput
              label="State of Residence"
              name="state"
              placeholder="Type your state of residence..."
              width={"full"}
            />
            <CustomInput
              label="Phone Number"
              name="phone"
              placeholder="+234"
              type="tel"
              width={"full"}
            />
            <CustomInput
              label="Email Address"
              name="email"
              placeholder="Type your email address..."
              type="email"
              width={"full"}
            />
            <CustomInput
              label="Closest Pickup Address"
              name="pickup_address"
              placeholder="Behind Ganaja Junction, Lokoja, Kogi State"
              width={"full"}
            />
            <CustomButton type={"back"} text={"Back"} onClick="" />
          </form>
        </div>

        {/* Second Card */}
        <div className="w-full lg:w-4/12">
          <div className="bg-white shadow-md p-6 w-full  rounded-md h-[300px] mb-5">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span><span className="font-serif">&#8358;</span>6,000</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span><span className="font-serif">&#8358;</span>800</span>
              </div>
              <hr className="w-[90%] mx-auto border my-2" />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span><span className="font-serif">&#8358;</span>6,800</span>
              </div>
            </div>
          </div>
          <CustomButton type={"normal"} text={"Pay Now"} onClick="" width="full" />
        </div>
      </div>
    </div>
  );
}
