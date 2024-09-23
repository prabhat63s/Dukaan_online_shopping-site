/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="lg:max-w-7xl mx-auto px-4">
        <div className="py-10 border-b">
          <h1 className="text-2xl font-semibold mb-2">
            Category {category?.name}
          </h1>
          <span className="">
            <Link to="/">Home / </Link>
            <Link to="/all-product">All Products</Link>
          </span>
        </div>
        <div className="w-full p-4 lg:p-0 flex flex-col">
          <h2 className="pt-6 text-2xl font-semibold ">
            {products?.length} result found
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-[100%] gap-4 py-4">
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <Link key={product._id} to={`/product/${product.slug}`}>
                  <div className="flex flex-col">
                    <img
                      src={`https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                      className="w-full h-72 object-contain rounded-2xl bg-gray-50"
                    />
                    <div className="py-2 flex flex-col">
                      <p className="truncate mb-1">{product.name}</p>
                      <p className="text-xl font-semibold mb-0">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
