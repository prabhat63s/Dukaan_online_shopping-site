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
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className=" w-[100%] min-h-screen pb-4">
        <div className="lg:w-[85%] p-4 lg:p-0 mx-auto flex flex-col  text-[14px] items-center">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>

          <div className="grid grid-cols-2 lg:grid-cols-4 w-[100%] gap-4 py-4">
          {products?.map((p) => (
              <Link
                className="border rounded-md cursor-pointer"
                key={p._id}
                to={`/product/${p.slug}`}
              >
                <div className="h-[300px] bg-gray-200">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt=""
                    className="w-full h-full object-cover object-center rounded-t-md"
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
};

export default CategoryProduct;
