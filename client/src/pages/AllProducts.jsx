/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Prices } from "../components/Price";
import { Link, NavLink } from "react-router-dom";
import { AiOutlinePlus, AiOutlineReload } from "react-icons/ai";
import Layout from "../components/layout/Layout";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const features = [
  {
    title: "Free Shipping",
    description: "On orders over ₹500.00",
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
    description: "7 days return for any reason.",
    icon: "💵",
  },
];

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState({
    // State for accordion
    category: true,
    price: false,
  });

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://dukaan-online-shopping-site.onrender.com/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch products with pagination and sorting
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Fetch total count of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Load more products when page is incremented
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Handle category filtering
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Fetch filtered products based on selected categories, price range, and sorting
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Initial fetch for categories and total products
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Fetch products initially or when filters are applied
  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    } else {
      filterProduct();
    }
  }, [checked, radio]);

  // Load more products when page changes
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Toggle accordion sections
  const toggleAccordion = (section) => {
    setAccordionOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <Layout>
      <div className="lg:max-w-7xl mx-auto px-4">
        <div className="py-10 border-b">
          <h1 className="text-2xl font-semibold mb-2">Products For You</h1>
          <span>
            <Link to="/">Home</Link>
          </span>
        </div>
        <div className="w-full flex flex-col gap-8 lg:flex-row my-10">
          {/* Filters Section */}
          <div className="lg:w-[22%] w-full">
            <div className="flex flex-col bg-white gap-4">
              {/* Category Filter */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h2 className="mb-0 font-medium text-red-600 cursor-pointer">
                    Category
                  </h2>
                  <button onClick={() => toggleAccordion("category")}>
                    {" "}
                    <AiOutlinePlus />{" "}
                  </button>
                </div>
                {accordionOpen.category &&
                  categories?.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                      className="flex pt-4"
                    >
                      {c.name}
                    </Checkbox>
                  ))}
              </div>

              {/* Price Filter */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h2 className="mb-0 font-medium text-red-600 cursor-pointer">
                    Price
                  </h2>
                  <button onClick={() => toggleAccordion("price")}>
                    <AiOutlinePlus />{" "}
                  </button>
                </div>
                {accordionOpen.price && (
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Prices?.map((p) => (
                      <div key={p._id}>
                        <Radio value={p.array} className="pt-4">
                          {p.name}
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                )}
              </div>
            </div>
            <button
              className="bg-red-600 mt-4 hover:bg-red-500 w-full text-white p-2.5 rounded-md"
              onClick={() => {
                setChecked([]);
                setRadio([]);
              }}
            >
              Reset
            </button>
          </div>

          {/* Products Display Section */}
          <div className="w-full lg:w-[78%]">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {loading ? (
                Array.from({ length: 7 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              ) : products.length > 0 ? (
                products.map((product) => (
                  <NavLink key={product._id} to={`/product/${product.slug}`}>
                    <div className="flex flex-col">
                      <div className="w-full border h-56 lg:h-72 rounded-2xl">
                        <img
                          src={`https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                          className="w-full h-full object-contain rounded-2xl bg-gray-50"
                        />
                      </div>
                      <div className="py-2 flex flex-col">
                        <p className="truncate text-sm mb-1">{product.name}</p>
                        <p className="text-xl font-semibold mb-0">
                          ₹{product.price}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>

            {/* Load More Button */}
            <div className="w-full flex items-center justify-end">
              {products.length < total && (
                <button
                  className="flex w-fit items-center gap-2 justify-center rounded-md bg-red-600 py-3 lg:py-2 px-4 text-[14px] font-semibold text-white hover:bg-red-400"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    "Loading ..."
                  ) : (
                    <>
                      Load More <AiOutlineReload />
                    </>
                  )}
                </button>
              )}
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
    </Layout>
  );
}
