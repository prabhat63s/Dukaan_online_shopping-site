import Layout from "../components/layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

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
      <div className="lg:w-[85%] p-4 lg:p-0 mx-auto flex flex-col lg:flex-row gap-4 mb-6">
        <div className="lg:w-[45%] w-full ">
          <h3 className="text-[12px] text-gray-600">
            {product?.category?.name} / {product.name}
          </h3>
          <div className="flex flex-col bg-white rounded-md gap-4 p-4 w-[400px] h-[400px]">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="h-full w-full object-cover object-center border rounded-md"
              alt={product.name}
            />
          </div>
        </div>

        <div className="w-full lg:w-[55%]">
          <div className=" rounded-md">
            <h1 className="text-[16px] font-semibold">{product.name}</h1>
            <h2 className="text-xl text-emerald-500 font-semibold">
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </h2>
            <p className="whitespace-pre-line leading-6 text-sm">
              {product.description}
            </p>
            <button
              className="flex w-full lg:w-fit  justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-2 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item Added to cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="w-full border-t py-4">
        <h2 className="text-xl text-center">Similar Products</h2>
        <div className="lg:w-[85%] p-4 lg:p-0 mx-auto flex flex-col lg:flex-row gap-4 mb-6">
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-[100%] mb-5 gap-4 lg:gap-6 py-4">
            {relatedProducts?.map((p) => (
              <div
                className="flex flex-col border rounded-md"
                key={p._id}
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="h-full w-full object-cover object-center rounded-t-md"
                  alt={p.name}
                />
                <div className="p-2 border-t bg-gray-50">
                  <h2 className=" text-[14px]">{p.name}</h2>
                  <h2 className="text-emerald-500">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
