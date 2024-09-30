import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { toast } from "sonner";

export default function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch("https://dukaan-online-shopping-site.onrender.com/api/v1/product/new-arrivals");
        const data = await response.json();

        // console.log(data);
        if (response.ok) {
          setNewArrivals(data.products);
        } else {
          throw new Error(data.message || "Error fetching new arrivals");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="lg:max-w-7xl mx-auto my-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">New Arrivals</h2>
        <Link to="/all-product" className="text-red-600 hover:underline">
          More
        </Link>
      </div>

      {loading ? (
        <div className="">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <Link to={`/product/${product.slug}`} key={product._id}>
              <div className="flex flex-col gap-2 hover:opacity-80">
                <img
                  src={`https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="w-full h-72 object-cover rounded-2xl bg-red-50"
                />
                <div className="py-2 flex flex-col">
                  <p className="truncate mb-1">{product.name}</p>
                  <p className="text-xl font-semibold mb-0">₹{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
