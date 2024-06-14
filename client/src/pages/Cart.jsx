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
      <div className="lg:w-[85%] p-4 lg:p-0 min-h-screen mx-auto flex flex-col lg:flex-row gap-8 mb-6">
        <div className="lg:w-[55%] w-full ">
          <div className="flex flex-col  divide-y bg-white border rounded-md p-4 lg:px-6">
            <h2 className=" text-xl font-semibold">Cart</h2>
            <div className="text-center pt-4">
              {cart?.length ? (
                <>
                  {cart?.map((p) => (
                    <div className="py-4 flex w-full gap-8" key={p._id}>
                      <div className="flex justify-center w-[30%]">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="rounded-md"
                          alt={p.name}
                          width="130px"
                          height={"130px"}
                        />
                      </div>
                      <div className="flex flex-col lg:flex-row justify-between w-[70%]">
                        <div className="text-left">
                          <p>{p.name}</p>
                          <p className="text-emerald-500"> ₹{p.price}.00</p>
                        </div>
                        <button
                          className="text-red-500"
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="flex flex-col justify-center items-center min-h-44">
                    <p>Your Cart Is Empty</p>
                    <Link
                      to="/"
                      className="flex w-fit  justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-2 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
                    >
                      Continue shopping
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[45%]">
          <div className="flex flex-col divide-y divide-border p-4 bg-white rounded-md border">
            <h2 className="mt-2 lg:mt-0 text-xl font-semibold">
              Price details
            </h2>
            <div className="py-2 flex flex-col justify-center space-y-2 text-gray ">
              <p className="flex justify-between">
                <span className="">Price</span> ₹{totalPrice()}.00
              </p>
              <p className="flex pb-2 justify-between">
                <span className="">Total items in cart</span>{" "}
                {cart?.length
                  ? `${cart.length} items ${auth?.token ? "" : " "}`
                  : " 0"}
              </p>
            </div>
            <p className="pt-2 flex justify-between">
              <span className="">Total amount </span> ₹{totalPrice()}.00
            </p>
            <div
              className="fle
            x flex-col lg:flex-row gap-2 pt-4"
            ></div>

            {auth?.user ? (
              <button
                className="flex w-full  justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-2 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
            ) : (
              <button
                className="flex w-full  justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-2 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
                onClick={() => navigate("/sign-in", { state: "/cart" })}
              >
                Please login and checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
