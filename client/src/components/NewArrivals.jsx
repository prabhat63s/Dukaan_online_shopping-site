import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductCardSkeleton from "./ProductCardSkeleton"; 

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p>{categoryName} will be available soon. Stay tuned!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link to={`/product/${product.slug}`} key={product._id}>
              <div className="flex flex-col gap-2">
                <div className="w-full border h-56 lg:h-72 rounded-2xl">
                  <img
                    src={`https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-2xl hover:opacity-80"
                  />
                </div>
                <div className="py-2 flex flex-col">
                  <p className="truncate text-sm mb-1">{product.name}</p>
                  <p className="text-xl font-semibold mb-0">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
