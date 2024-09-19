import CustomButton from "@/components/CustomButton";
import { useLocation } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/slices/cartSlice";
import React from "react";
import { toast } from "react-toastify";
import { useMarkOrderMutation } from "../../redux/appData";
import { Spinner } from "@material-tailwind/react";

export default function OrderDetails() {
  const location = useLocation();
  // const dispatch = useDispatch();
  const { order: initialOrder } = location.state;
  const [order, setOrder] = React.useState(initialOrder);
  const [delStatus, setDelStatus] = React.useState("");

  console.log(order);

  const itemCount = order.products.length;
  // const handleAddToCart = (product) => {
  //   dispatch(addToCart(product));
  // };

  const [markOrder, { isLoading: isMarkOrderLoading, isSuccess, isError }] =
    useMarkOrderMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const credentials = {
        deliveryStatus: delStatus,
      };
      // console.log(credentials);

      await markOrder({ credentials, id: order._id });
    } catch (error) {
      // console.error(error);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        deliveryStatus: delStatus, // Update order in state
      }));
      toast.success("Status updated successfully!");
    } else if (isError) {
      toast.error("status update failed");
    }
  }, [isSuccess, isError, delStatus]);
  return (
    <>
      {order && (
        <div className="p-2 flex items-center 2xl:h-[80vh] 2xl:w-[90%] 2xl:mx-auto">
          <div className="bg-white shadow-md shadow-gray-400 rounded-md p-4 md:p-8 2xl:p-[60px] flex flex-col h-full w-full">
            <div className="flex flex-col gap-5 2xl:gap-10">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 items-start">
                  <p className="2xl:text-2xl">
                    Order no. <span className="font-bold">{order._id}</span>
                  </p>
                  <p className="2xl:text-2xl">
                    {itemCount} Item{itemCount > 1 ? "s" : ""}
                  </p>
                  <p className="font-bold 2xl:text-2xl">
                    Total:{" "}
                    <span className="font-bold">
                      <span className="font-serif">&#8358;</span>
                      {order.amount}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    className={`${
                      order.deliveryStatus === "pending"
                        ? "bg-red-400"
                        : order.deliveryStatus === "dispatched"
                        ? "bg-blue-400"
                        : "bg-green-400"
                    } text-center text-xs p-2 lg:w-60 cursor-default`}
                  >
                    {order.deliveryStatus}
                  </button>
                  {/* <CustomButton type="invoice" text="Download receipt" /> */}
                  {order && order.deliveryStatus === "dispatched" && (
                    <form
                      onSubmit={handleSubmit}
                      className="flex items-center gap-2"
                    >
                      <select
                        className="border border-gray-600 p-2 rounded-md w-[60%]"
                        value={delStatus}
                        onChange={(e) => setDelStatus(e.target.value)}
                      >
                        <option disabled value="">
                          Mark as Recieved
                        </option>
                        {/* <option value="dispatched">Dispatched</option> */}
                        <option value="delivered">Recieved</option>
                      </select>
                      <CustomButton
                        text={isMarkOrderLoading ? <Spinner /> : "proceed"}
                        type={"normal"}
                      />
                    </form>
                  )}
                </div>
              </div>

              {order.products.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col md:flex-row md:items-center w-full border-2 border-gray-300 p-2 md:p-4 rounded-md gap-2 justify-between"
                >
                  <div className="text-sm font-normal flex items-center gap-4 lg:gap-10 w-full">
                    <img
                      src={product.images[0]} // Assuming the image URL is in the category object
                      alt={product.name}
                      className="w-[100px] h-[80px] 2xl:w-[200px] 2xl:h-[160px] bg-gray-300 rounded-md"
                    />
                    <div className="flex flex-col gap-1 2xl:gap-8">
                      <p className="text-sm 2xl:text-xl font-bold line-clamp-1 md:w-auto w-full">
                        {product.name}
                      </p>
                      <p className="text-xs 2xl:text-xl text-black/60 font-normal line-clamp-3 w-full md:w-auto">
                        Order {order._id}
                      </p>

                      <p className="text-xs text-black/60 font-normal line-clamp-3 w-full md:w-auto 2xl:text-xl">
                        On {order.createdAt.split("T")[0]}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex items-center md:w-[60%] w-full justify-end">
                    <CustomButton
                      type="cart"
                      text="Buy Again"
                      onClick={() => handleAddToCart(product)}
                    />
                  </div> */}
                </div>
              ))}

              <div className="flex flex-col md:flex-row items-center gap-10 md:h-[200px] 2xl:h-[300px]">
                <div className="w-full md:w-1/2 border rounded-md p-3 h-full">
                  <p className="font-bold mb-2 2xl:text-2xl">
                    Payment Information
                  </p>
                  <p className="2xl:text-xl">
                    Items Total Amount:
                    <span className="font-bold">
                      <span className="font-serif">&#8358;</span>
                      {order.products.reduce(
                        (acc, product) =>
                          acc + product.price * product.cartQuantity,
                        0
                      )}
                    </span>
                  </p>
                  <p className="2xl:text-xl">
                    Delivery Fee:
                    <span className="font-bold">
                      <span className="font-serif">&#8358;</span>{order.amount - order.products.reduce(
                        (acc, product) =>
                          acc + product.price * product.cartQuantity,
                        0
                      )}
                    </span>
                  </p>
                  <hr className="w-[90%] mx-auto border my-2" />
                  <p className="2xl:text-xl">
                    Total:
                    <span className="font-bold text-2xl">
                      <span className="font-serif">&#8358;</span>
                      {order.amount}
                    </span>
                  </p>
                </div>
                <div className="w-full md:w-1/2 border rounded-md p-3 h-full">
                  <p className="font-bold mb-2 2xl:text-2xl">
                    Delivery Information
                  </p>
                  <p className="text-sm 2xl:text-xl">{order.address}</p>
                  <hr className="w-[90%] mx-auto border my-2" />
                  {/* <p className="font-bold mb-2 2xl:text-2xl">Pickup Station</p>
                  <p className="text-sm 2xl:text-xl">
                    {}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
