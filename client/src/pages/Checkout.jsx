/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { toast } from "sonner";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

export default function Checkout() {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");
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
      const { data } = await axios.get(
        "https://dukaan-online-shopping-site.onrender.com/api/v1/product/braintree/token"
      );
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
        await axios.post(
          "https://dukaan-online-shopping-site.onrender.com/api/v1/product/braintree/payment",
          {
            nonce,
            cart,
          }
        );
        localStorage.removeItem("cart");
        setCart([]);
      } else if (paymentMethod === "cod") {
        // For COD, simply proceed to navigate to order success page
        // No need to make a payment, as it's Cash on Delivery
        // Example:
        await axios.post(
          "https://dukaan-online-shopping-site.onrender.com/api/v1/product/cash-on-delivery",
          {
            cart,
            // You might need to send additional data like user details, address, etc.
          }
        );
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
      <div className="w-full min-h-screen mb-10">
        <div className="lg:max-w-7xl mx-auto px-4 gap-6 flex flex-col">
          <div className="py-10 border-b">
            <h1 className="text-2xl font-semibold mb-2">Checkout</h1>
            <span className="">
              <Link to="/">Home / </Link>
              <Link to="/all-product">All Products / </Link>
              <Link to="/cart">Cart</Link>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping Info */}
            <div className="flex p-4 flex-col bg-white rounded-2xl border">
              <h2 className="text-xl font-semibold">Shipping Information</h2>
              <div className="flex flex-col lg:flex-row justify-between py-2">
                <div className="flex flex-col">
                  <p className="text-sm"> Name : {auth?.user?.name}</p>
                  <p className="text-sm"> Email : {auth?.user?.email}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm "> Address : {auth?.user?.address}</p>
                  <p className="text-sm"> Contact : {auth?.user?.phone}</p>
                </div>
              </div>
              <Link
                to={
                  auth.user.role === 1 ? "/dashboard/admin" : "/dashboard/user"
                }
                className="bg-red-600 w-fit text-white px-6 py-2 rounded-lg hover:bg-red-500 transition-colors"
              >
                Update address
              </Link>
            </div>

            {/* Order Summary */}
            <div className="flex flex-col p-4 bg-white rounded-2xl border">
              <h2 className="text-xl font-semibold">Payment Information</h2>
              <div className="py-2 flex flex-col justify-center text-sm">
                <p className="flex justify-between">
                  <span className="">Price</span> {totalPrice()}
                </p>
                <p className="flex justify-between">
                  <span className="">Total items in cart</span>{" "}
                  {cart?.length
                    ? `${cart.length} items ${auth?.token ? "" : " "}`
                    : " 0"}
                </p>
                <p className="flex justify-between">
                  <span className="">Total amount </span> {totalPrice()}
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="lg:col-span-2 p-4 rounded-2xl border">
              <h2 className=" text-xl font-semibold">Payment Method</h2>
              <div className="flex flex-col py-2 gap-2">
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
              <div className="">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    {paymentMethod === "online" && (
                      <DropIn
                        options={{
                          authorization: clientToken,
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                    )}
                    <button
                      className="flex lg:w-fit w-full justify-center rounded-md bg-red-600 py-3 mt-4 lg:py-2 px-2 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-red-500"
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
      </div>
    </Layout>
  );
}
