import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";
import SearchInput from "../components/form/SearchInput";

export default function Search() {
  const [values] = useSearch();

  return (
    <Layout>
      <div className=" lg:hidden w-[90%] mx-auto">
        <SearchInput />
      </div>
      <div className=" w-[100%] pb-4">
        <div className="lg:w-[85%] p-4 lg:p-0 mx-auto flex flex-col text-[14px] items-center">
          <h2>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} products`}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 w-[100%] mb-5 gap-6 lg:gap-6 py-4">
            {values?.results.map((p) => (
              <Link
                className="border rounded-md cursor-pointer"
                key={p._id}
                to={`/product/${p.slug}`}
              >
                <div className=" bg-gray-200">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt=""
                    className="w-full object-cover object-center rounded-t-md"
                  />
                </div>

                {/* product details */}
                <div className="w-[100%] p-2 flex flex-col bg-gray-50 justify-center border-t rounded-b-md">
                  <p className="truncate text-[12px] font-semibold">{p.name}</p>
                  <p className="text-[10px] lg:text-[12px] text-gray truncate w-full">
                    {p.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-[12px] lg:text-[14px] text-emerald-500">
                      ₹{p.price}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
