import Layout from "../components/layout/Layout";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Price";
import axios from "axios";
import { AiOutlineReload } from "react-icons/ai";
import Categories from "./Categories";
import { FaPaypal, FaThumbsUp } from "react-icons/fa";
import { LiaShippingFastSolid } from "react-icons/lia";
import Banner from "../components/Banner";

export default function Home() {
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
      const { data } = await axios.get("/api/v1/category/get-category");
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
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
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
      const { data } = await axios.get("/api/v1/product/product-count");
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
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
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
      const { data } = await axios.post("/api/v1/product/product-filters", {
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
      <div className="hidden  lg:flex w-full fixed bg-white top-[70px] z-50 border-b mb-6">
        <Categories />
      </div>

      <div className="w-full lg:w-[85%] mx-auto flex lg:pt-12 flex-col">
        {/* banner */}
        <Banner title="अपनी फसल अपनी सुरक्षा" link="/" buttonText=" Go to " />

        {/* Products For You */}
        <h1 className="text-2xl pl-4 lg:pl-0 font-semibold text-neutral-800">
          Products For You
        </h1>
        <div className="w-full flex flex-col lg:flex-row mb-5">
          {/* filters */}
          <div className="lg:w-3/12 w-full border-b lg:border-b-0">
            <div className="flex flex-col bg-white lg:border rounded-md gap-4 p-4 lg:px-6">
              {/* category filter  */}
              <div className="flex flex-col mt-2">
                <h2 className="border-b pb-2 text-[14px] font-medium text-emerald-500">
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
                <h2 className="border-b pb-2 text-[14px] font-medium text-emerald-500">
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
                <div className="flex justify-end border-t pt-5">
                  <button
                    className="flex w-fit justify-center rounded-md bg-emerald-500 py-2 px-4 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
                    onClick={() => window.location.reload()}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* all products  */}
          <div className="w-full lg:w-9/12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[100%] my-5 lg:mt-0 gap-4 px-4">
              {products &&
                products.length > 0 &&
                products.map((product) => (
                  <NavLink
                    key={product._id}
                    to={`/product/${product.slug}`}
                    className="w-full flex flex-col rounded-md border hover:shadow-md"
                  >
                    {/* product image */}
                    <div className="h-[100%] w-[100%] bg-gray-200">
                      <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        alt=""
                        className="h-full w-full object-cover object-center rounded-t-md"
                      />
                    </div>
                    {/* product details */}
                    <div className="w-[100%] p-2 flex flex-col justify-center border-t bg-gray-50 rounded-b-md">
                      <p className="truncate text-[12px] font-semibold">
                        {product.name}
                      </p>
                      <p className="text-[10px] lg:text-[12px] truncate w-full">
                        {product.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <h2 className="text-[12px] lg:text-[14px] text-emerald-500">
                          ₹{product.price}
                        </h2>
                      </div>
                    </div>
                  </NavLink>
                ))}

              {/* lode more  */}
              <div className="w-full flex items-end justify-end">
                {products && products.length < total && (
                  <button
                    className="flex w-fit items-center gap-2 justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-4 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
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

        {/* services  */}
        <div className="flex flex-col lg:flex-row justify-between border bg-gradient-to-tr from-emerald-100 via-emerald-50 to-emerald-100 rounded-md mx-4 mb-5 lg:mx-0">
          <div className="w-full flex flex-col p-5 items-center lg:w-4/12">
            <div className="text-emerald-950 pb-2">
              {" "}
              <FaThumbsUp size={30} />{" "}
            </div>
            <h1 className="text-lg text-neutral-700 font-semibold">
              Best Quality
            </h1>
            <p className="text-center text-sm">
              Assured Genuine Products from Trusted well-known Brands of India
            </p>
          </div>
          <div className="w-full flex flex-col p-5 items-center lg:w-4/12">
            <div className="text-emerald-950 pb-2">
              {" "}
              <FaPaypal size={30} />{" "}
            </div>
            <h1 className="text-lg text-neutral-700 font-semibold">
              Online payment
            </h1>
            <p className="text-center text-sm">Ease to Pay for your product</p>
          </div>
          <div className="w-full flex flex-col p-5 items-center lg:w-4/12">
            <div className="text-emerald-950 pb-2">
              {" "}
              <LiaShippingFastSolid size={30} />{" "}
            </div>
            <h1 className="text-lg text-neutral-700 font-semibold">
              {" "}
              Fast Delivery
            </h1>
            <p className="text-center text-sm">
              Your Order is very prior to us, we deliver it faster as much we
              can.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
