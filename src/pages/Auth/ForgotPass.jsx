import React from "react";
import auth from "@/assets/images/auth.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useForgotPassMutation } from "../../redux/appData";
import { toast } from "react-toastify";

export default function ForgotPass() {
  const [errors, setErrors] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [forgotPass, { isLoading, isSuccess, isError, error }] =
    useForgotPassMutation();

  const handleForgotPass = async (e) => {
    e.preventDefault();
    try {
      const credentials = {
        email,
      };
      await forgotPass(credentials);
      // console.log(credentials);
    } catch (error) {
      // console.log(error);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Reset link sent to your email successfully!");
      setEmail("");
    } else if (isError) {
      toast.error("resent link send failed");
      setErrors(error.data);
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex items-center justify-center bg-gray-300 min-h-screen">
      <div className="bg-white shadow-md flex rounded-md overflow-hidden w-[90%] lg:w-3/4 2xl:w-2/3 p-4 items-center">
        <div className="md:flex w-1/2 hidden">
          <img src={auth} alt="" className="w-full h-auto lg:h-full" />
        </div>
        <div className="flex flex-col w-full  md:w-1/2 py-5">
          <h2 className="2xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold text-center">
            Forgot your Password?
          </h2>

          <p className="text-center mb-4">
            Type in your Email Address to reset password
          </p>

          <form
            onSubmit={handleForgotPass}
            className="space-y-4 mx-auto w-[80%]"
          >
            {errors && <p className="text-red-500">{errors}</p>}

            <CustomInput
              label="Email"
              name="email"
              placeholder="Type in your email..."
              width={"full"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <CustomButton
              type={"normal"}
              text={isLoading ? "Loading" : "Request Link"}
              width={"full"}
            />
          </form>
          <p className="text-center mt-4"></p>
        </div>
      </div>
    </div>
  );
}
