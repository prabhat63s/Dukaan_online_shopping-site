import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

export default function Checkout() {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online"); // State to track payment method
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      if (paymentMethod === "online") {
        const { nonce } = await instance.requestPaymentMethod();
        await axios.post("/api/v1/product/braintree/payment", {
          nonce,
          cart,
        });
        localStorage.removeItem("cart");
        setCart([]);
      } else if (paymentMethod === "cod") {
        // For COD, simply proceed to navigate to order success page
        // No need to make a payment, as it's Cash on Delivery
        // Example:
        await axios.post("/api/v1/product/cash-on-delivery", {
          cart,
          // You might need to send additional data like user details, address, etc.
        });
        localStorage.removeItem("cart");
        setCart([]);
      }
      setLoading(false);
      navigate("/orderSuccess");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="lg:w-[85%] min-h-screen p-4 lg:p-0 mx-auto flex flex-col lg:flex-row gap-8 mb-6">
        <div className="lg:w-[50%] w-full ">
          <div className="flex flex-col divide-y p-4 bg-white rounded-md border">
            <h2 className="mt-2 lg:mt-0 text-xl font-semibold">
              Price details
            </h2>
            <div className="py-2 flex flex-col justify-center space-y-2 text-gray ">
              <p className="flex justify-between">
                <span className="">Price</span> {totalPrice()}
              </p>
              <p className="flex pb-2 justify-between">
                <span className="">Total items in cart</span>{" "}
                {cart?.length
                  ? `${cart.length} items ${auth?.token ? "" : " "}`
                  : " 0"}
              </p>
            </div>
            <p className="pt-2 flex justify-between">
              <span className="">Total amount </span> {totalPrice()}
            </p>
          </div>
          <div className="flex flex-col mt-4 divide-y p-4 bg-white rounded-md border">
            <h2 className="mt-2 pt-2 text-xl font-semibold">Address</h2>
            <div className="flex flex-col gap-2 pt-4">
              <h1 className="text-[14px]"> Name : {auth?.user?.name}</h1>
              <h1 className="text-[14px]"> Email : {auth?.user?.email}</h1>
              <h1 className="text-[14px] leading-6">
                {" "}
                Address : {auth?.user?.address}
              </h1>
              <h1 className="text-[14px]"> Contact : {auth?.user?.phone}</h1>
              <Link
                to="/dashboard/user/profile"
                className="flex w-fit justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-4 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
              >
                Update address
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[50%]">
          <div className="flex flex-col  divide-y bg-white border rounded-md p-4 lg:px-6">
            <h2 className=" text-xl font-semibold">Payment Method</h2>
            <div className="flex flex-col mt-2 pt-4 gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="online"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                <label htmlFor="online">Online Payment</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
            </div>
            <div className="mt-2">
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  {paymentMethod === "online" && (
                    <DropIn
                      options={{
                        authorization: clientToken,
                        // paypal: {
                        //   flow: "vault",
                        // },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                  )}
                  <button
                    className="flex w-fit  justify-center rounded-md bg-emerald-500 py-3 mt-4 lg:py-2 px-2 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
                    onClick={handlePayment}
                    disabled={
                      loading ||
                      (!instance && paymentMethod === "online") ||
                      (paymentMethod === "cod" && !auth?.user?.address)
                    }
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
