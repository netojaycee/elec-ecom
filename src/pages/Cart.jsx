import React, { useEffect } from "react";
import productImage from "@/assets/images/product1.png";
import nocart from "@/assets/images/nocart.png";
import { BiTrashAlt } from "react-icons/bi";
import CustomButton from "../components/CustomButton";
import { PiMinusCircleFill, PiPlusCircleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseCartQuantity,
  getTotals,
  removeFromCart,
} from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  const handleDecreaseQuantity = (cartItem) => {
    dispatch(decreaseCartQuantity(cartItem));
  };
  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartData: cart.cartItems, totalAmount: cart.cartTotalAmount } });
  };

  return (
    <>
      {cart.cartItems.length > 0 ? (
        <div className="p-3">
          <div className=" bg-white shadow-md shadow-gray-400 rounded-md p-4 flex flex-col">
            <div className="md:flex items-center w-full hidden px-4">
              <p className="text-sm font-normal w-[40%]">Product</p>
              <p className="text-sm font-normal w-[18%]">Price</p>
              <p className="text-sm font-normal w-[19%]">Quantity</p>
              <p className="text-sm font-normal w-[18%]">SubTotal</p>
              <p className="text-sm font-normal w-[5%]"></p>
            </div>

            <div className="flex flex-col">
              {cart.cartItems?.map((cartItem) => (
                <div className="flex flex-col md:flex-row md:items-center w-full mt-2 border border-gray-300 p-2 md:p-4 rounded-md gap-3 md:gap-10">
                  <div className="flex md:w-[60%] w-full justify-between md:justify-start items-center">
                    <div className="text-sm font-normal flex items-center gap-4 lg:gap-10 w-full">
                      <img
                        src={cartItem.image.secure_url}
                        alt=""
                        className="w-[100px] h-[80px] bg-gray-300 rounded-md"
                      />
                      <div className="flex flex-col gap-3 ">
                        <p className="text-sm font-bold line-clamp-1 md:w-auto w-[90%]">
                          {cartItem.name}
                        </p>
                        <p className="text-xs font-normal line-clamp-3 w-[70%] md:w-auto">
                          {cartItem.desc}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-bold hidden items-center w-[40%] md:flex justify-center">
                      <span className="font-serif">&#8358; </span>
                      {cartItem.price}
                    </p>
                    <p className="text-sm font-bold  md:hidden justify-center">
                      <span className="font-serif">&#8358; </span>
                      {cartItem.price * cartItem.cartQuantity}
                    </p>
                  </div>
                  <div className="flex items-center md:w-[60%] w-full justify-between md:justify-end">
                    <div className="text-sm font-normal md:w-[40%] flex items-center justify-center order-3 md:order-1">
                      <div className="border-2 border-gray-300 gap-3 rounded-md text-sm font-normal md:w-[50%] flex items-center justify-center order-2 md:order-1">
                        <PiMinusCircleFill
                          onClick={() => handleDecreaseQuantity(cartItem)}
                          className="w-6 h-6 text-red-500 cursor-pointer"
                        />
                        {cartItem.cartQuantity}
                        <PiPlusCircleFill
                          onClick={() => handleAddToCart(cartItem)}
                          className=" w-6 h-6 text-primary cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="text-sm font-bold  hidden md:w-[38%] md:flex justify-center order-1 md:order-2">
                      <span className="font-serif">&#8358;</span>
                      {cartItem.price * cartItem.cartQuantity}
                    </p>
                    <div className=" text-red-500 text-sm font-normal md:w-[20%] flex justify-center order-1 md:order-3 items-center">
                      <BiTrashAlt
                        onClick={() => handleRemoveFromCart(cartItem)}
                        className=" w-6 h-6 cursor-pointer"
                      />
                      <p className="text-sm font-bold md:hidden">Remove</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center w-full md:hidden justify-between mt-4 border border-gray-300 p-4 rounded-md">
              <p className="text-sm font-normal w-[40%]">SubTotal: </p>
              <p className="text-sm font-bold  flex justify-center">
                <span className="font-serif">&#8358;</span>
                {cart.cartTotalAmount}
              </p>
            </div>

            <div className="flex items-center w-full justify-between mt-4">
              <CustomButton type={"back"} text={"Back"} to={"/all-products"} />
              <CustomButton
                type={"normal"}
                text="Checkout"
                onClick={handleCheckout}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center">
            <img src={nocart} alt="" className="" />
            <h2 className=" md:text-lg lg:text-xl font-bold mt-2">
              {" "}
              Your Cart is empty!
            </h2>
            <p className="text-center md:text-sm lg:text-lg font-normal mt-2">
              Looks like you haven’t added anything to your cart yet
            </p>
            <CustomButton
              type={"contact"}
              text="Continue Shopping"
              to={"/all-products"}
            />
          </div>
        </>
      )}
    </>
  );
}
