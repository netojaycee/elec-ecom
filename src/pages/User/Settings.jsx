import React, { useEffect, useState } from "react";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { FaEdit } from "react-icons/fa";
import profile from "@/assets/images/profile.png";
import {
  useEditUserMutation,
  useEditUserPasswordMutation,
} from "../../redux/appData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications
import { setUserInfo } from "../../redux/slices/userSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const user = useSelector((state) => state.user); // Get user state from Redux
  const {
    _id: id,
    name: currentName,
    email: currentEmail,
    phoneNumber: currentPhoneNumber,
    address: currentAddress,
  } = user;

  const [editUser, { isLoading, isSuccess, isError, error }] =
    useEditUserMutation();
  const [
    editUserPassword,
    {
      isLoading: passwordLoading,
      isSuccess: passwordIsSuccess,
      isError: passwordIsError,
      error: passwordError,
    },
  ] = useEditUserPasswordMutation();

  useEffect(() => {
    // Initialize the form with current user data
    setName(currentName || "");
    setAddress(currentAddress || "");

    setPhoneNumber(currentPhoneNumber || "");
  }, [currentName, currentPhoneNumber, currentAddress]);

  const handleEditUser = async (e) => {
    e.preventDefault();
    setErrors("");

    const credentials = {};
    if (name && name !== currentName) credentials.name = name;
    if (phoneNumber && phoneNumber !== currentPhoneNumber)
      credentials.phoneNumber = phoneNumber;
    if (address && address !== currentAddress) credentials.address = address;

    // console.log(credentials);
    try {
      await editUser({ credentials, id });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Update successful!");
      dispatch(
        setUserInfo({
          ...user,
          name: name,
          address: address,
          phoneNumber: phoneNumber,
        })
      );
    } else if (isError) {
      toast.error("Update failed");
      setErrors(error?.data || "An error occurred");
    }
  }, [isSuccess, isError]);

  const handleEditUserPassword = async (e) => {
    e.preventDefault();
    setErrors("");

    if (newPassword !== confirmPassword) {
      setErrors("New Passwords do not match.");
      toast.error("New Passwords do not match.");
      return;
    }

    const credentials = {};
    if (currentPassword) credentials.currentPassword = currentPassword;
    if (newPassword) credentials.newPassword = newPassword;
    if (confirmPassword) credentials.confirmPassword = confirmPassword;
    console.log(credentials);

    try {
      await editUserPassword({ credentials, id });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (passwordIsSuccess) {
      toast.success("Update password successful!");
    } else if (passwordError) {
      toast.error("Update password failed");
      setPasswordErrors(passwordError?.data || "An error occurred");
    }
  }, [passwordIsSuccess, passwordError]);

  return (
    <div className="flex md:py-8 py-4 px-4 w-full">
      <div className="bg-white shadow-md rounded-md py-4 md:py-8 px-5 md:px-[50px] 2xl:px-[100px] w-full max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 lg:px-20">
          Personal Information
        </h2>

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
              <CustomInput
                label="Email Address"
                name="email"
                placeholder={currentEmail}
                width="full"
                disabled
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <CustomInput
                label="Address"
                name="address"
                value={currentAddress}
                placeholder="123 st..."
                width="full"
                onChange={(e) => setAddress(e.target.value)}
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
                text={isLoading ? "Updating..." : "Save Info"}
                width="auto"
              />
            </div>
          </form>
        </div>

        <hr className="lg:my-6 my-2" />

        {/* Security Information */}
        <form
          onSubmit={handleEditUserPassword}
          className="space-y-2 md:space-y-4"
        >
          {passwordErrors && <p className="text-red-500">{passwordErrors}</p>}

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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                text={passwordLoading ? "Updating..." : "Update Password"}
                width="auto"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
