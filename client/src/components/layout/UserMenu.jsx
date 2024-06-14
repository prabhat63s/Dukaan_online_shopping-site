import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

export default function UserMenu() {
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
      <h2 className="border-b pb-2 text-xl font-semibold">User Dashboard</h2>
      <div className="flex flex-col mt-2 gap-4">
        <NavLink
          to="/dashboard/user/profile"
          className={({ isActive }) =>
            isActive
              ? "flex items-center py-3 lg:py-2 px-2 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium py-3 lg:py-2 px-2 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className={({ isActive }) =>
            isActive
              ? "flex items-center py-3 lg:py-2 px-2 text-[14px] gap-4 bg-emerald-500 text-white border rounded-md "
              : "flex items-center font-medium py-3 lg:py-2 px-2 text-[14px] gap-4 hover:shadow-sm bg- border rounded-md"
          }
        >
          My Orders
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
