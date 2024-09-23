/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Prices } from "../components/Price";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import Layout from "../components/layout/Layout";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://dukaan-online-shopping-site.onrender.com/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {/* Products For You */}
      <div className="lg:max-w-7xl mx-auto px-4">
        <div className="py-10 border-b">
          <h1 className="text-2xl font-semibold mb-2">Products For You</h1>
          <span className="">
            <Link to="/">Home / </Link>
            <Link to="/all-product">All Products</Link>
          </span>
        </div>
        <div className="w-full flex flex-col gap-8 lg:flex-row my-10">
          {/* filters */}
          <div className="lg:w-[22%] w-full border-b lg:border-b-0">
            <div className="flex flex-col bg-white lg:border rounded-md gap-4 lg:p-4">
              {/* category filter  */}
              <div className="flex flex-col mt-2">
                <h2 className="border-b pb-2 text-[14px] font-medium text-red-600">
                  Category
                </h2>
                <div className="">
                  {categories?.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                      className="flex py-2"
                    >
                      {c.name}
                    </Checkbox>
                  ))}
                </div>
              </div>
              {/* price filter  */}
              <div className="flex flex-col mt-2">
                <h2 className="border-b pb-2 text-[14px] font-medium text-red-600">
                  Price
                </h2>
                <div className="">
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Prices?.map((p) => (
                      <div key={p._id}>
                        <Radio value={p.array} className="py-2">
                          {p.name}
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
                <div className="flex justify-end border-t py-5">
                  <button
                    className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg"
                    onClick={() => window.location.reload()}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* all products  */}
          <div className="w-full lg:lg:w-[78%]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {products &&
                products.length > 0 &&
                products.map((product) => (
                  <NavLink key={product._id} to={`/product/${product.slug}`}>
                    <div className="flex flex-col">
                      <img
                        src={`https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-photo/${product._id}`}
                        alt={product.name}
                        className="w-full h-72 object-contain rounded-2xl bg-gray-50"
                      />
                      <div className="py-2 flex flex-col">
                        <p className="truncate mb-1">
                          {product.name}
                        </p>
                        <p className="text-xl font-semibold mb-0">
                          ₹{product.price}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                ))}
            </div>

            {/* lode more  */}
            <div className="w-full flex items-end justify-end">
              {products && products.length < total && (
                <button
                  className="flex w-fit items-center gap-2 justify-center rounded-md bg-red-600 py-3 lg:py-2 px-4 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-red-400"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    "Loading ..."
                  ) : (
                    <>
                      {" "}
                      Loadmore <AiOutlineReload />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
