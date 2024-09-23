/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "../components/layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "../context/cart";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const features = [
  {
    title: "Free Shipping",
    description: "On orders over $50.00",
    icon: "🚚",
  },
  {
    title: "Very Easy to Return",
    description: "Just phone number.",
    icon: "📞",
  },
  {
    title: "Nationwide Delivery",
    description: "Fast delivery nationwide.",
    icon: "🚀",
  },
  {
    title: "Refunds Policy",
    description: "60 days return for any reason.",
    icon: "💵",
  },
];

export default function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="lg:max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrums */}
        <h3 className="text-sm text-gray-600 mb-5">
          {product?.category?.name} / {product.name}
        </h3>
        {/* Product detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="bg-gray-50 w-full h-[500px] flex items-center justify-center rounded-lg">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
            <p className="text-lg font-medium text-gray-500 mb-4">
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </p>
            <div
              className=" max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            <div className=" rounded-md">
              <button
                className="px-6 py-3 w-full lg:w-fit justify-center flex items-center gap-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  toast.success("Item Added to cart");
                }}
              >
                <HiOutlineShoppingBag size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Return Info */}
      <div className="w-full border-t">
        <div className="lg:max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-gray-50"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-800">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Product */}
      <div className="w-full border-t py-4">
        <div className="lg:max-w-7xl mx-auto my-8 px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold ">Similar Products</h2>
            <Link to="/all-product" className="text-red-600 hover:underline">
              More
            </Link>
          </div>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts?.map((p) => (
              <div key={p._id} onClick={() => navigate(`/product/${p.slug}`)}>
                <div className="flex flex-col">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="w-full h-72 object-cover rounded-2xl bg-red-50"
                  />
                  <div className="pt-2 flex flex-col">
                    <p className="truncate mb-1">{product.name}</p>

                    <p className="text-xl font-semibold mb-0">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
