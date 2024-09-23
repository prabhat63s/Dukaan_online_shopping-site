/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "../components/layout/Layout";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Price";
import axios from "axios";
import { AiOutlineReload } from "react-icons/ai";
import Categories from "./Categories";
import { FaStar } from "react-icons/fa";
import NewArrivals from "../components/NewArrivals";

const steps = [
  {
    step: "Step 1",
    title: " Filter & Discover",
    description:
      "Smart filtering and suggestions make it easy to find exactly what you're looking for.",
    icon: "🔍",
  },
  {
    step: "Step 2",
    title: " Add to Bag",
    description:
      "Easily select the correct items and add them to the cart for a smooth shopping experience.",
    icon: "🛒",
  },
  {
    step: "Step 3",
    title: " Fast Shipping",
    description:
      "The carrier will confirm and ship quickly to you, ensuring your items arrive promptly.",
    icon: "🚚",
  },
  {
    step: "Step 4",
    title: " Enjoy the Product",
    description:
      "Have fun and enjoy your 5-star quality products delivered to your doorstep.",
    icon: "🎉",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    title: "Fashion Enthusiast",
    feedback:
      "I absolutely love the new collection! The quality is fantastic, and the styles are so trendy. Highly recommend!",
    img: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "John Smith",
    title: "Satisfied Customer",
    feedback:
      "Great experience shopping here. The customer service was excellent, and my order arrived quickly. Will shop again!",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 4,
  },
  {
    id: 3,
    name: "Emily Johnson",
    title: "Fashion Blogger",
    feedback:
      "The outfits are stylish and comfortable. Perfect for my fashion blog! The attention to detail is impressive.",
    img: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Michael Brown",
    title: "New Customer",
    feedback:
      "I was pleasantly surprised by the variety and quality of the products. Excellent value for money.",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 4,
  },
];

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
      {/* Category Section */}
      <Categories />

      {/* New Arrivals */}
      <NewArrivals />


      {/* How It Works */}
      <div className="my-16 border-t border-b">
        <div className="lg:max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 "
              >
                <div className="text-6xl mb-4">{s.icon}</div>
                <h3 className="bg-red-100 mb-2 rounded-full px-2 py-1">
                  {s.step}
                </h3>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="lg:max-w-7xl mx-auto my-16 px-4">
        <h2 className="text-2xl font-semibold mb-6">What Our Customers Say.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className=" flex flex-col items-center">
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <div className="flex items-center mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-center mb-4">
                {testimonial.feedback}
              </p>
              <h3 className="text-lg font-medium text-gray-800">
                {testimonial.name}
              </h3>
              <p className="text-gray-500">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
