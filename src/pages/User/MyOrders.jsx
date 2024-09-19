import productImage from "@/assets/images/product1.png";
import nocart from "@/assets/images/nocart.png";
import CustomButton from "@/components/CustomButton";
import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { useGetAllUserOrdersQuery } from "../../redux/appData";
import { useSelector } from "react-redux";
import { BsArrowRight } from "react-icons/bs";
import { Spinner } from "@material-tailwind/react";

export default function MyOrders() {
  const user = useSelector((state) => state.user); // Get user state from Redux
  const { _id } = user;

  const { data: allOrders, isLoading } = useGetAllUserOrdersQuery(_id);
  // console.log(orders);
  const orders =
    (allOrders &&
      allOrders.filter((order) => order.paymentStatus === "paid")) ||
    [];
  // console.log(orders);

  const navigate = useNavigate();
  const handleClickOrder = (order) => {
    navigate(`/my-orders/${order._id}`, { state: { order } });
  };
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <div className="p-3" key={order._id}>
            {" "}
            {/* Ensure to use a unique key */}
            <div className="bg-white shadow-md shadow-gray-400 rounded-md p-2 md:p-4 flex flex-col">
              <div className="flex flex-col">
                <div className="flex flex-col md:flex-row md:items-center w-full mt-2 border border-gray-300 p-2 md:p-4 rounded-md gap-2 justify-between">
                  <div className="text-sm font-normal flex items-center gap-4 lg:gap-10 w-full">
                    <img
                      src={order.products[0].images[0] || productImage} // Assuming `productImage` is a fallback
                      alt={order._id.trim() || "Product Image"} // Assuming order has a productName
                      className="w-[100px] h-[80px] bg-gray-300 rounded-md"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-bold line-clamp-1 md:w-auto w-full">
                        {order._id.trim() || "LED Bulb Extension"}{" "}
                        {/* Display product name from order */}
                      </p>
                      <p className="text-[10px] text-black/60 font-normal line-clamp-3 w-full md:w-auto italic">
                        payment status
                        {/* Display order number */}
                      </p>
                      <button
                        className={`${
                          order.paymentStatus === "pending"
                            ? "bg-red-400"
                            : "bg-green-400"
                        } text-center text-xs p-2`}
                      >
                        {order.paymentStatus === "pending"
                          ? "Not Paid"
                          : "Paid"}
                        {/* Display order status */}
                      </button>
                      <p className="text-[10px] text-black/60 font-normal line-clamp-3 w-full md:w-auto italic">
                        delivery status
                        {/* Display order number */}
                      </p>
                      <button
                        className={`${
                          order.deliveryStatus === "pending"
                            ? "bg-red-400"
                            : order.deliveryStatus === "dispatched"
                            ? "bg-blue-400"
                            : "bg-green-400"
                        } text-center text-xs p-2`}
                      >
                        {order.deliveryStatus}
                      </button>
                      <p className="text-xs mt-2 text-black/60 font-normal line-clamp-3 w-full md:w-auto">
                        On {order.createdAt.split("T")[0]}
                        {/* Display delivery date */}
                      </p>
                    </div>
                  </div>
                  <div className="cursor-pointer flex items-center md:w-[60%] w-full justify-end">
                    <div
                      onClick={() => handleClickOrder(order)} // Dynamic link to order details
                      className="text-primary flex items-center gap-1"
                    >
                      See details <FaAngleRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src={nocart} alt="No Cart" />
          <h2 className="md:text-lg lg:text-xl font-bold mt-2">
            No Orders available
          </h2>
          <p className="text-center md:text-sm lg:text-lg font-normal mt-2">
            Looks like you haven&apos;t added anything to your cart yet
          </p>
          <CustomButton
            type={"contact"}
            text="Continue Shopping"
            to={"/all-products"}
            Icon={BsArrowRight}
          />
        </div>
      )}
    </>
  );
}
