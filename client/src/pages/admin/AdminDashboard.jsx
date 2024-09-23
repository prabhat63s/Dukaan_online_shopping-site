/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import AdminLayout from "../admin/AdminLayout";
import { FiUsers } from "react-icons/fi";
import { TbBrandDatabricks } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { IoBookOutline } from "react-icons/io5";
import { GoPackage } from "react-icons/go";
import useCategory from "../../hooks/useCategory";
import axios from "axios";
import { useAuth } from "../../context/auth";

export default function AdminDashboard() {
  const [error, setError] = useState(null);
  const categories = useCategory();
  const [totalProducts, setTotalProducts] = useState(0);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [auth] = useAuth();

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("https://dukaan-online-shopping-site.onrender.com/api/v1/auth/users", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users.");
    }
  };

  // Fetch total products
  const fetchTotalProducts = async () => {
    try {
      const { data } = await axios.get("https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-count");
      if (data.success) {
        setTotalProducts(data.total);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error fetching total products:", error);
      setError("Failed to fetch total products.");
    }
  };

  // Fetch total orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get("https://dukaan-online-shopping-site.onrender.com/api/v1/auth/all-orders");
      setOrders(data);
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
    fetchTotalProducts();
    getOrders();
  }, []);

  const boxes = [
    {
      icon: <TbBrandDatabricks size={26} />,
      name: "Total Categories",
      total: categories.length,
    },
    {
      icon: <AiOutlineProduct size={26} />,
      name: "Total Products",
      total: totalProducts,
    },
    {
      icon: <FiUsers size={26} />,
      name: "Total Users",
      total: users.length,
    },
    {
      icon: <GoPackage size={26} />,
      name: "Total Orders",
      total: orders.length,
    },
    {
      icon: <IoBookOutline size={26} />,
      name: "Total Blogs",
      total: "0",
    },
  ];

  return (
    <AdminLayout>
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {boxes.map((b, index) => (
            <div
              key={index}
              className="h-40 lg:h-36 flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:px-10 gap-6 lg:gap-8 bg-white rounded-2xl"
            >
              <div className="relative pt-6 lg:pt-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 48 52"
                  fill="none"
                  className="absolute"
                >
                  <path
                    d="M19.1094 2.12943C22.2034 0.343099 26.0154 0.343099 29.1094 2.12943L42.4921 9.85592C45.5861 11.6423 47.4921 14.9435 47.4921 18.5162V33.9692C47.4921 37.5418 45.5861 40.8431 42.4921 42.6294L29.1094 50.3559C26.0154 52.1423 22.2034 52.1423 19.1094 50.3559L5.72669 42.6294C2.63268 40.8431 0.726688 37.5418 0.726688 33.9692V18.5162C0.726688 14.9435 2.63268 11.6423 5.72669 9.85592L19.1094 2.12943Z"
                    fill="#DC2626"
                  />
                </svg>
                <div className="relative z-10 text-white">{b.icon}</div>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <h1 className="font-medium">{b.name}</h1>
                <p className="text-2xl font-semibold">{b.total}</p>
              </div>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Display error if any */}
      </div>
    </AdminLayout>
  );
}
