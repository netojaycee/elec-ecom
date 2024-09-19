import React, { useEffect, useState } from "react";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import { usePaymentMutation } from "../redux/appData";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartData = location.state?.cartData;
  const totalAmount = location.state?.totalAmount;
  const deliveryFee = 800;
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user); // Get user state from Redux
  const { _id, name, email, phoneNumber, address } = user;

  // Set initial form state with user data
  const [formData, setFormData] = useState({
    phone: phoneNumber || "",
    email: email || "",
    pickup_address: address || "",
  });
  // Form validation state
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    if (user) {
      setFormData({
        phone: phoneNumber || "",
        email: email || "",
        pickup_address: address || "",
      });
    }
  }, [user, phoneNumber, email, address]);
  // Redirect to the cart page if no cart data is found
  useEffect(() => {
    if (!cartData || !totalAmount) {
      navigate("/shopping-cart");
    }
  }, [cartData, totalAmount, navigate]);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form fields
  useEffect(() => {
    const { email, pickup_address } = formData;
    if (email && pickup_address) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData]);

  const [payment] = usePaymentMutation();

  const handleFormSubmit = async () => {
    if (!isFormValid) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const credentials = {
        amount: totalAmount + deliveryFee,
        email: formData.email, // Use the updated email from the form
        userId: _id,
        address: formData.pickup_address, // Use the updated address from the form
        products: cartData,
      };

      // console.log(credentials);
      const response = await payment(credentials);
      setLoading(false);
      // console.log(response.data.authorization_url)
      // Redirect to payment if necessary
      if (response?.data?.authorization_url) {
        window.location.href = response.data.authorization_url;
      }
    } catch (error) {
      // console.error("Payment Error: ", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen py-8 px-4">
      <div className="flex flex-col md:flex-row w-full  gap-10">
        {/* First Card */}
        <div className="bg-white shadow-md p-6 w-full lg:w-7/12 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Add Delivery Address</h2>
          <hr className="w-[90%] mx-auto border my-2 md:my-6" />

          <form className="space-y-4">
            {/* <CustomInput
              label="Phone Number"
              name="phone"
              placeholder="+234"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              width={"full"}
            /> */}
            <CustomInput
              label="Email Address"
              name="email"
              placeholder="Type your email address..."
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              width={"full"}
            />
            <CustomInput
              label="Closest Pickup Address"
              name="pickup_address"
              placeholder="Behind Ganaja Junction, Lokoja, Kogi State"
              value={formData.pickup_address}
              onChange={handleInputChange}
              width={"full"}
              required
            />
            <CustomButton
              type={"back"}
              text={"Back"}
              onClick={() => navigate(-1)}
            />
          </form>
        </div>

        {/* Second Card */}
        <div className="w-full lg:w-4/12">
          <div className="bg-white shadow-md p-6 w-full  rounded-md h-[300px] mb-5">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  <span className="font-serif">&#8358; </span>
                  {totalAmount}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  <span className="font-serif">&#8358; </span>
                  {deliveryFee}
                </span>
              </div>
              <hr className="w-[90%] mx-auto border my-2" />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>
                  <span className="font-serif">&#8358; </span>
                  {totalAmount + deliveryFee}
                </span>
              </div>
            </div>
          </div>
          <CustomButton
            type={"normal"}
            text={loading ? "Loading..." : "Pay Now"}
            onClick={handleFormSubmit}
            width="full"
            disabled={loading} // Disable if form is invalid or loading
          />
        </div>
      </div>
    </div>
  );
}
