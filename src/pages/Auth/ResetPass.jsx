import React from "react";
import auth from "@/assets/images/auth.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPassMutation } from "../../redux/appData";
import { toast } from "react-toastify";

export default function ResetPass() {
  const [errors, setErrors] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { token } = useParams();

  const [resetPass, { isLoading, isSuccess, isError, error }] =
    useResetPassMutation();

  const handleResetPass = async (e) => {
    e.preventDefault();
    setErrors("");
    if (password !== confirmPassword) {
      setErrors({message:"Passwords do not match."});
      return;
    }
    try {
      const credentials = {
        password,
        confirmPassword,
      };
     await resetPass({ credentials, token });
      // console.log(credentials);
    } catch (error) {
      // console.log(error.data);
      setErrors({message: "password Reset failed"});
    }
  };
  const navigate = useNavigate();
  // console.log(token);

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("password Reset successful!");
      navigate("/auth");
    } else if (isError) {
      toast.error(error.data.error);
      setErrors({message: error.data.error});
    }
  }, [isSuccess, isError, error, navigate]);
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

          <form
            onSubmit={handleResetPass}
            className="space-y-4 mx-auto w-[80%]"
          >
            {errors && <p className="text-red-500">{errors.message}</p>}
            <CustomInput
              label="Password"
              name="password"
              placeholder="Type in your password..."
              type="password"
              width={"full"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CustomInput
              label="Confirm Password"
              name="confirm_password"
              placeholder="Re-enter your password..."
              type="password"
              width={"full"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <CustomButton
              type={"normal"}
              text={isLoading ? "Resetting..." : "Reset password"}
              width={"full"}
            />
          </form>
          <p className="text-center mt-4"></p>
        </div>
      </div>
    </div>
  );
}
