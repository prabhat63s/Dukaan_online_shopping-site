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
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminDashboard() {
  const [error, setError] = useState(null);
  const categories = useCategory();
  const [totalProducts, setTotalProducts] = useState(0);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState(0);
  const [auth] = useAuth();

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://dukaan-online-shopping-site.onrender.com/api/v1/auth/users",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users.");
    }
  };

  // Fetch total blogs
  const fetchblogs = async () => {
    try {
      const { data } = await axios.get(
        "https://dukaan-online-shopping-site.onrender.com/api/v1/blog/all-blog"
      );
      if (data.success) {
        setBlogs(data.blogs.length); // Set blogs length
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error fetching total blogs:", error);
      setError("Failed to fetch total blogs.");
    }
  };

  // Fetch total products
  const fetchTotalProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-count"
      );
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
      const { data } = await axios.get(
        "https://dukaan-online-shopping-site.onrender.com/api/v1/auth/all-orders"
      );
      setOrders(data);
    } catch (error) {
      console.log("Error fetching orders:", error);
      setError("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTotalProducts();
    fetchblogs();
    getOrders();
  }, []);

  const boxes = [
    {
      icon: <TbBrandDatabricks size={26} />,
      name: "Total Category",
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
      total: blogs,
    },
  ];

  // Bar chart data
  const barData = {
    labels: ["Categories", "Products", "Users", "Orders", "Blogs"],
    datasets: [
      {
        label: "Total Counts",
        data: [
          categories.length,
          totalProducts,
          users.length,
          orders.length,
          blogs,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Pie chart data
  const pieData = {
    labels: ["Users", "Orders", "Products"],
    datasets: [
      {
        label: "User Distribution",
        data: [users.length, orders.length, totalProducts],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {boxes.map((b, index) => (
            <div
              key={index}
              className="h-28 w-full flex flex-row items-center justify-between px-10 gap-10 bg-white rounded-2xl transition-transform duration-300 hover:scale-105"
            >
              <div className="w-[15%] relative flex items-center justify-center">
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
              <div className="flex justify- flex-col w-[85%]">
                <h1 className="font-medium text-lg">{b.name}</h1>
                <p className="text-2xl mb-0 font-semibold">{b.total}</p>
              </div>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          {/* Bar Chart */}
          <div className="w-full lg:w-1/2 mt-4 lg:mt-8">
            <h2 className="text-base lg:text-lg font-semibold mb-2 lg:mb-4">
              Dashboard Overview
            </h2>
            <div className="p-2 lg:p-4 h-60 lg:h-80">
              <Bar data={barData} />
            </div>
          </div>
          {/* Pie Chart */}
          <div className="w-full lg:w-1/2 mt-4 lg:mt-8">
            <h2 className="text-base lg:text-lg font-semibold mb-2 lg:mb-4">
              User Distribution
            </h2>
            <div className="p-2 lg:p-4 w-full flex items-center justify-center h-60 lg:h-80">
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
