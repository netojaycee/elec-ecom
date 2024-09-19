import  { useEffect, useState } from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import Products from "./Products";
import { useGetVerifyPaymentQuery } from "../../redux/appData";
import { useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";

export default function Landing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const dispatch = useDispatch();
  // Call the query hook with the reference
  const {
    data: paymentData,
    isSuccess: isSuccessPayment,
    error: errorPayment,
  } = useGetVerifyPaymentQuery(reference, {
    skip: !reference, // Skip the query if there is no reference
  });

  useEffect(() => {
    if (isSuccessPayment) {
      dispatch(clearCart());
      // console.log("Payment verification successful:", paymentData);
      setSearchParams({}); // Clear search params after verification
      setIsModalOpen(true); // Open the modal on successful verification
    } else if (errorPayment) {
      // console.error("Error verifying payment:", errorPayment);
    }
  }, [isSuccessPayment, errorPayment, paymentData, setSearchParams]);
  return (
    <>
      <div className="flex flex-col gap-5">
        <Hero />
        <Categories />
        <Products />
      </div>
      <Dialog open={isModalOpen} handler={setIsModalOpen}>
        <DialogHeader>Payment Successful!</DialogHeader>
        <DialogBody>
          <p>Your payment was successful! Thank you for your purchase.</p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
