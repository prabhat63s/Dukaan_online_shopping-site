import {
  IoBagAddOutline,
  IoBookOutline,
  IoCreateOutline,
} from "react-icons/io5";
import { TbBrandDatabricks } from "react-icons/tb";
import { FiHome, FiUsers, FiLogOut } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";
import { useAuth } from "../../context/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AdminNav() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    try {
      // Clear auth state and local storage
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

  return (
    <div className="flex flex-col space-y-2">
      {/* Home */}
      <NavLink
        to="/dashboard/admin"
        className={({ isActive }) =>
          `p-4 flex items-center gap-4 transition-colors duration-200 ${
            isActive
              ? "bg-red-600 text-white rounded-lg"
              : "bg-white text-black hover:bg-red-600 hover:text-white rounded-lg "
          }`
        }
      >
        <FiHome size={24} />
        <span>Dashboard</span>
      </NavLink>
      {/* Category */}
      <NavLink
        to="/dashboard/create-category"
        className={({ isActive }) =>
          `p-4 flex items-center gap-4 transition-colors duration-200 ${
            isActive
              ? "bg-red-600 text-white rounded-lg"
              : "bg-white text-black hover:bg-red-600 hover:text-white rounded-lg"
          }`
        }
      >
        <TbBrandDatabricks size={26} />
        <span>Category</span>
      </NavLink>
      {/* Create Product */}
      <NavLink
        to="/dashboard/create-product"
        className={({ isActive }) =>
          `p-4 flex items-center gap-4 transition-colors duration-200 ${
            isActive
              ? "bg-red-600 text-white rounded-lg"
              : "bg-white text-black hover:bg-red-600 hover:text-white rounded-lg"
          }`
        }
      >
        <IoBagAddOutline size={26} />
        <span>Create Product</span>
      </NavLink>
      {/* All Product */}
      <NavLink
        to="/dashboard/products"
        className={({ isActive }) =>
          `p-4 flex items-center gap-4 transition-colors duration-200 ${
            isActive
              ? "bg-red-600 text-white rounded-lg"
              : "bg-white text-black hover:bg-red-600 hover:text-white rounded-lg"
          }`
        }
      >
        <AiOutlineProduct size={26} />
        <span>All Product</span>
      </NavLink>
      {/* All orders */}
      <NavLink
         to="/dashboard/orders"
        className={({ isActive }) =>
          `p-4 flex items-center gap-4 transition-colors duration-200 ${
            isActive
              ? "bg-red-600 text-white rounded-lg"
              : "bg-white text-black hover:bg-red-600 hover:text-white rounded-lg"
          }`
        }
      >
        <IoCreateOutline size={24} />
        <span>All Orders</span>
      </NavLink>
      {/* Create Blogs */}
      <NavLink
        to="/dashboard/create-blog"
        className={({ isActive }) =>
          `p-4 flex items-center gap-4 transition-colors duration-200 ${
            isActive
              ? "bg-red-600 text-white rounded-lg"
              : "bg-white text-black hover:bg-red-600 hover:text-white rounded-lg"
          }`
        }
      >
        <IoCreateOutline size={24} />
        <span>Create Blog</span>
      </NavLink>
      {/* All Blogs */}
      <NavLink
        to="/dashboard/all-blog"
        className={({ isActive }) =>
          `p-4 flex items-center gap-4 transition-colors duration-200 ${
            isActive
              ? "bg-red-600 text-white rounded-lg"
              : "bg-white text-black hover:bg-red-600 hover:text-white rounded-lg"
          }`
        }
      >
        <IoBookOutline size={24} />
        <span>All Blogs</span>
      </NavLink>
      {/* All Users */}
      <NavLink
        to="/dashboard/all-users"
        className={({ isActive }) =>
          `p-4 flex items-center gap-4 transition-colors duration-200 ${
            isActive
              ? "bg-red-600 text-white rounded-lg"
              : "bg-white text-black hover:bg-red-600 hover:text-white rounded-lg"
          }`
        }
      >
        <FiUsers size={24} />
        <span>All Users</span>
      </NavLink>

      <button
        className="p-4 flex text-black items-center gap-4 hover:bg-red-600 hover:text-white rounded-lg cursor-pointer transition-colors duration-200"
        onClick={handleLogout}
      >
        <FiLogOut size={24} />
        <span>Logout</span>
      </button>
    </div>
  );
}
