import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { toast } from "sonner";

export default function ProductsByCategory({ categoryId, categoryName }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(
          `https://dukaan-online-shopping-site.onrender.com/api/v1/product/category/${categoryId}`
        );
        const data = await response.json();
        // console.log(data);

        if (response.ok) {
          setProducts(data.products);
        } else {
          throw new Error(
            data.message || "Error fetching products by category"
          );
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  return (
    <div className="lg:max-w-7xl mx-auto my-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{categoryName}</h2>
        <Link to="/all-product" className="text-red-600 hover:underline">
          More
        </Link>
      </div>

      {loading ? (
        <div>
          <Spinner />
          <p>Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <p>No products available in {categoryName}.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
