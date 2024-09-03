import React from "react";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import contactImage from "@/assets/images/contact.png";
import { BsArrowRight } from "react-icons/bs";
import { useContactMutation } from "../redux/appData";
import { toast } from "react-toastify";

export default function Contact() {
  const [errors, setErrors] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [contact, { isLoading, isSuccess, isError, error }] =
    useContactMutation();

  const handleContact = async (e) => {
    e.preventDefault();
    setErrors("");
    if (!name || !email || !phoneNumber || !message) {
      setErrors("Please Enter All fields");
      return;
    }
    try {
      const credentials = {
        name,
        phoneNumber,
        message,
        email,
      };
      await contact(credentials);
      // console.log(credentials);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Message sent successfully!");
      setEmail("");
      setName("");
      setPhoneNumber("");
      setMessage("");
    } else if (isError) {
      toast.error("failed to send message");
      setErrors(error.data);
    }
  }, [isSuccess, isError]);
  return (
    <div className="flex 2xl:mt-10">
      <div className="md:relative w-[90%] mx-auto md:bg-black 2xl:w-[70%] flex rounded-md overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 hidden md:block bg-black"></div>
        <div className="w-1/2 hidden md:block">
          <img
            src={contactImage}
            alt="Contact"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:absolute w-full md:w-[60%] lg:w-[50%] xl:w-[40%] bg-white shadow-md p-8 rounded-md md:top-1/2 md:left-1/3 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
          <form onSubmit={handleContact} className="space-y-4">
            {errors && <p className="text-red-500">{errors}</p>}
            <div className="flex flex-col lg:flex-row gap-4">
              <CustomInput
                label="Name"
                name="name"
                placeholder="Brian Clark"
                width="full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <CustomInput
                label="Email"
                name="email"
                placeholder="Type in your email..."
                width={"full"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <CustomInput
              label="PhoneNumber"
              name="phoneNumber"
              placeholder="+234 456 7890 243"
              width="full"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <CustomInput
              label="Message"
              name="message"
              placeholder="Type your message here..."
              width="full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              textarea // Add this prop to render textarea
            />
            <CustomButton
              type="contact"
              text={isLoading ? "Sending..." : "Send Message"}
              onClick=""
              width=""
              Icon={BsArrowRight}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
