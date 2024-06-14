import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

export default function AdminMenu() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate('/')
    toast.success("Logout Successfully");
  };

  return (
    <div className="flex flex-col">
      <h2 className="border-b pb-2 text-xl font-semibold">Admin Dashboard</h2>
      <div className="flex flex-col mt-2 gap-4">
        <NavLink
          to="/dashboard/admin/create-category"
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-3 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium p-3 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          Create category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-3 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium p-3 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          Create product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-3 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium p-3 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-3 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium p-3 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          Orders
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex w-full justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-4 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
