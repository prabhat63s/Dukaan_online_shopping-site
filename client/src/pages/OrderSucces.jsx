import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { FaRegCircleCheck } from "react-icons/fa6";

export default function OrderSuccess() {
  return (
    <Layout>
      <div className="h-screen flex flex-col items-center justify-center">
        <FaRegCircleCheck size={40} />
        <div className="p-8 max-w-lg w-full text-center">
          <h1 className="text-2xl font-semibold mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been placed and is being
            processed.
          </p>

          <Link to="/">
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
