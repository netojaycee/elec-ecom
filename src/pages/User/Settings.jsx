import React, { useEffect, useState } from "react";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { FaEdit } from "react-icons/fa";
import profile from "@/assets/images/profile.png";
import { useEditUserMutation } from "../../redux/appData";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

export default function Settings() {
  const [errors, setErrors] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const user = useSelector((state) => state.user); // Get user state from Redux
  const { id: _id, name: currentName, email: currentEmail, phoneNumber: currentPhoneNumber } = user;

  const [editUser, { isLoading, isSuccess, isError, error }] = useEditUserMutation();

  useEffect(() => {
    // Initialize the form with current user data
    setName(currentName || "");
    setPhoneNumber(currentPhoneNumber || "");
  }, [currentName, currentPhoneNumber]);

  const handleEditUser = async (e) => {
    e.preventDefault();
    setErrors("");

    if (password !== confirmPassword) {
      setErrors("New Passwords do not match.");
      return;
    }

    const credentials = {};
    if (name && name !== currentName) credentials.name = name;
    if (phoneNumber && phoneNumber !== currentPhoneNumber) credentials.phoneNumber = phoneNumber;
    if (password) credentials.password = password;

    try {
      await editUser({ credentials, id: _id });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Update successful!");
    } else if (isError) {
      toast.error("Update failed");
      setErrors(error?.data || "An error occurred");
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex md:py-8 py-4 px-4 w-full">
      <div className="bg-white shadow-md rounded-md py-4 md:py-8 px-5 md:px-[50px] 2xl:px-[100px] w-full max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 lg:px-20">Personal Information</h2>

        {/* Profile Photo */}
        <div className="flex justify-center md:mb-8 mb-4 w-full">
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
        <div className="lg:px-20">
          <form onSubmit={handleEditUser} className="space-y-2 md:space-y-4">
            {errors && <p className="text-red-500">{errors}</p>}
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <CustomInput
                label="Full Name"
                name="name"
                placeholder="Psquare"
                width="full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <CustomInput
                label="Email Address"
                name="email"
                placeholder={currentEmail}
                width="full"
                disabled
              />
              <CustomInput
                label="Phone Number"
                name="phoneNumber"
                placeholder="+234 90345672322"
                type="tel"
                width="full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="flex justify-start mt-8">
              <CustomButton
                type="normal"
                text="Save Info"
                width="auto"
              />
            </div>
          </form>
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
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <CustomInput
              label="New Password"
              name="password"
              placeholder="New Password"
              type="password"
              width="full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CustomInput
              label="Confirm Password"
              name="confirm_password"
              placeholder="Re-enter your new password..."
              type="password"
              width="full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-start mt-8">
            <CustomButton
              type="normal"
              text={isLoading ? "Updating..." : "Update Password"}
              width="auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
