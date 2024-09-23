import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";

export default function Search() {
  const [values] = useSearch();

  return (
    <Layout>
      <div className="lg:max-w-7xl mx-auto px-4">
        <div className="py-10 border-b">
          <h1 className="text-2xl font-semibold mb-2">Search</h1>
          <span className="">
            <Link to="/">Home / </Link>
            <Link to="/all-product">All Products</Link>
          </span>
        </div>

        <div className="w-full p-4 lg:p-0 flex flex-col">
          <h2 className="pt-6 text-2xl font-semibold ">
            {values?.results.length < 1
              ? "No Products Found"
              : `${values?.results.length} product found`}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-[100%] gap-4 py-4">
          {values?.results.map((product) => (
            <Link key={product._id} to={`/product/${product.slug}`}>
              <div className="flex flex-col">
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="w-full h-72 object-contain rounded-2xl bg-gray-50"
                />
                <div className="py-2 flex flex-col">
                  <p className="truncate mb-1">{product.name}</p>
                  <p className="text-xl font-semibold mb-0">₹{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
