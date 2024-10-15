/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import Layout from "../components/layout/Layout";

export default function Cart() {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="w-full min-h-screen ">
        <div className="lg:max-w-7xl mx-auto px-4 gap-6 flex flex-col justify-between">
          <div className="py-10 border-b">
            <h1 className="text-2xl font-semibold mb-2">Shopping Cart</h1>
            <span className="">
              <Link to="/">Home / </Link>
              <Link to="/all-product">All Products</Link>
            </span>
          </div>

          <div className="w-full flex lg:flex-row flex-col gap-14 lg:divide-x">
            <div className="lg:w-[60%] h-full flex flex-col gap-6">
              {cart?.length ? (
                <div className="flow-root py-8">
                  <ul role="list" className="-my-6 divide-y">
                    {cart?.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border">
                          <img
                            src={`https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-photo/${product._id}`}
                            alt={product.name}
                            width="130px"
                            height={"130px"}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-col">
                          <p className="">{product.name}</p>
                          <p className="mb-0">₹{product.price}.00</p>
                          <button
                            type="button"
                            className="font-medium text-red-600 hover:text-red-500"
                            onClick={() => removeCartItem(product._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center min-h-52">
                  <p>Your Cart Is Empty</p>
                  <Link
                    to="/"
                    className="flex w-fit  justify-center rounded-md bg-red-600 py-3 lg:py-2 px-4 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-red-500"
                  >
                    Continue shopping
                  </Link>
                </div>
              )}
            </div>
            <div className="lg:w-[40%] h-full mb-12 lg:pl-10">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

              {/* Subtotal */}
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-medium">₹{totalPrice()}.00</span>
              </div>

              {/* Shipping Estimate */}
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 flex items-center">
                  Shipping estimate
                  <span className="ml-2 text-blue-600 text-sm cursor-pointer hover:underline">
                    Learn more
                  </span>
                </span>
                <span className="font-medium">₹5.00</span>
              </div>

              {/* Tax Estimate */}
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 flex items-center">
                  Tax estimate
                  <span className="ml-2 text-blue-600 text-sm cursor-pointer hover:underline">
                    Learn more
                  </span>
                </span>
                <span className="font-medium">₹8.32</span>
              </div>

              {/* Total items */}
              <div className="flex justify-between mb-4">
                <span className="">Total items in cart</span>{" "}
                <span className="font-medium">
                  {cart?.length
                    ? `${cart.length} items ${auth?.token ? "" : " "}`
                    : " 0"}
                </span>
              </div>

              {/* Order Total */}
              <div className="flex justify-between text-lg font-semibold border-t pt-4">
                <span>Order total</span>
                <span>₹{totalPrice()}.00</span>
              </div>

              {/* Checkout Button */}
              {auth?.user ? (
                <button
                  className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-500 transition-colors"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </button>
              ) : (
                <button
                  className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-500 transition-colors"
                  onClick={() => navigate("/sign-in", { state: "/cart" })}
                >
                  Please login and checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
