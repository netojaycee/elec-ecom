import React, { useState } from "react";
import auth from "@/assets/images/auth.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../../redux/appData";
import { toast } from "react-toastify";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const [
    register,
    {
      isLoading: isLoadingRegister,
      isSuccess: isSuccessRegister,
      isError: isErrorRegister,
      error: errorRegister,
    },
  ] = useRegisterMutation();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors("");
    if (password !== confirmPassword) {
      setErrors("Passwords do not match.");
      return;
    }

    try {
      const credentials = {
        name,
        email,
        password,
      };
      await register(credentials);
      // console.log(credentials);
    } catch (error) {
      console.log("hello", errorRegister);
      setErrors(errorRegister.error.data);
    }
  };

  React.useEffect(() => {
    if (isSuccessRegister) {
      toast.success("Register successful!");
      setIsSignUp(!isSignUp);
    } else if (isErrorRegister) {
      toast.error("Register failed");
      setErrors(errorRegister.data);
    }
  }, [isSuccessRegister, isErrorRegister, navigate]);

  // if (isLoading) {
  //   return <Loader />;
  // }
  // if (loading) {
  //   return <Loader />;
  // }

  const [
    login,
    {
      isLoading: isLoadingLogin,
      isSuccess: isSuccessLogin,
      isError: isErrorLogin,
      error: errorLogin,
    },
  ] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = {
        email,
        password,
      };
      await login(credentials);
      // console.log(credentials);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (isSuccessLogin) {
      toast.success("Login successful!");
      navigate("/");
    } else if (isErrorLogin) {
      toast.error("Login failed");
      setErrors(errorLogin.data);
    }
  }, [isSuccessLogin, isErrorLogin, navigate]);

  // if (isLoading) {
  //   return <Loader />;
  // }

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
          <form
            onSubmit={isSignUp ? handleRegister : handleLogin}
            className="space-y-4 mx-auto w-[80%]"
          >
            {errors && <p className="text-red-500">{errors}</p>}
            {isSignUp && (
              <CustomInput
                label="Full Name"
                name="name"
                placeholder="Type in your full name..."
                width={"full"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <CustomInput
              label="Email"
              name="email"
              placeholder="Type in your email..."
              width={"full"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
              label="Password"
              name="password"
              placeholder="Type in your password..."
              type="password"
              width={"full"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isSignUp && (
              <CustomInput
                label="Confirm Password"
                name="confirm_password"
                placeholder="Re-enter your password..."
                type="password"
                width={"full"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              text={
                isSignUp && isLoadingRegister
                  ? "Registering..."
                  : isSignUp
                  ? "Sign Up"
                  : !isSignUp && isLoadingLogin
                  ? "Logging in..."
                  : "Sign In"
              }
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
