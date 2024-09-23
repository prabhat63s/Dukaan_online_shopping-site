import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import AccountInfo from "./AccountInfo"
import OrderHistory from "./OrderHistory"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const apiUrl = "d/s";
  
  // Fetch user data on component mount
  useEffect(() => {
    if (auth?.token) {
      // Replace with your actual API call to fetch user details
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/v1/user/profile`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          // Assuming response contains user data
          setAuth((prevAuth) => ({
            ...prevAuth,
            user: response.data.user,
          }));
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast("Failed to fetch user data.");
        }
      };

      fetchUserData();
    }
  }, [auth?.token, setAuth]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    try {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      toast("Logout successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast("Failed to logout. Please try again.");
    }
  };

  console.log("Auth data on profile page:", auth); // Log auth data for debugging


  return (
    <Layout>
      <div className="w-full min-h-screen">
        <div className="lg:max-w-7xl mx-auto px-4 gap-6 flex flex-col justify-between">
          <div className="py-10 border-b">
            <h1 className="text-2xl font-semibold mb-2">
              {auth?.user?.role === 1 ? "Admin" : "User"} Account
            </h1>
            <p className="text-sm flex items-center gap-1 text-neutral-800">
              <span className="text-lg font-semibold text-black">
                {auth?.user?.name} ·
              </span>{" "}
              {auth?.user?.email} · {auth?.user?.phone} · {auth?.user?.address}
            </p>
            <button
              onClick={handleLogout}
              className="w-fit text-start mt-4 px-4 py-2 rounded-md hover:bg-red-500 bg-red-600 text-white"
            >
              Logout
            </button>
          </div>

          <div className="w-full mt-10">
            {/* Tab Buttons */}
            <div className="flex justify-between border-b overflow-x-auto scrollbar-hide">
              <button
                className={`py-2 px-4 ${
                  activeTab === "profile"
                    ? "border-b-2 border-red-500 text-red-500 whitespace-nowrap"
                    : "whitespace-nowrap"
                }`}
                onClick={() => handleTabClick("profile")}
              >
                Profile
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "wishlist"
                    ? "border-b-2 border-red-500 text-red-500 whitespace-nowrap"
                    : "whitespace-nowrap"
                }`}
                onClick={() => handleTabClick("wishlist")}
              >
                Wishlist
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "my-order"
                    ? "border-b-2 border-red-500 text-red-500 whitespace-nowrap"
                    : "whitespace-nowrap"
                }`}
                onClick={() => handleTabClick("my-order")}
              >
                My Order
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "change-password"
                    ? "border-b-2 border-red-500 text-red-500 whitespace-nowrap"
                    : "whitespace-nowrap"
                }`}
                onClick={() => handleTabClick("change-password")}
              >
                Change Password
              </button>
            </div>

            {/* Tab Content */}
            <div className="py-4">
              {activeTab === "profile" && (
                <div className="my-5">
                  <h2 className="text-2xl font-semibold">
                    Update Information
                  </h2>
                  <AccountInfo />
                </div>
              )}
              {activeTab === "wishlist" && (
                <div className="my-5">
                  <h2 className="text-2xl font-semibold">My Wishlist</h2>
                  {/* <Wishlist /> */}
                </div>
              )}
              {activeTab === "my-order" && (
                <div className="my-5">
                  <h2 className="text-2xl font-semibold">My Orders</h2>
                  <OrderHistory />
                </div>
              )}
              {activeTab === "change-password" && (
                <div className="my-5">
                  <h2 className="text-2xl font-semibold">
                    Update your password
                  </h2>
                  {/* <UpdatePassword /> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
