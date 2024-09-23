import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiBars2, HiOutlineShoppingBag } from "react-icons/hi2";
import { FiLogOut, FiSearch, FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";
import { GoPerson } from "react-icons/go";
import { useAuth } from "../../context/auth";
import { toast } from "sonner";
import { AiOutlineProduct } from "react-icons/ai";
import { useCart } from "../../context/cart";
import SearchInput from "../form/SearchInput";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

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
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <header className="w-full border-b">
      <div className="lg:max-w-7xl h-[10vh] mx-auto px-4 flex justify-between items-center">
        {/* Logo and Desktop Navigation */}
        <NavLink to="/" className="flex items-center gap-1">
          <img src={logo} alt="logo" className="h-8" />
          <h1 className="text-2xl font-semibold mb-0">Dukaan</h1>
        </NavLink>

        {/* Search Box (Desktop) */}
        <div className="hidden lg:flex">
          <SearchInput />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <NavLink
            to="/all-product"
            className="btn flex flex-col relative group hover:text-red-600"
          >
            <span className="flex items-center gap-1">
              <AiOutlineProduct size={20} />
              All Products
            </span>
            <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-red-600 transform origin-center transition-transform scale-x-0 group-hover:scale-x-100"></span>
          </NavLink>
          <NavLink
            to="/cart"
            className="btn flex flex-col relative group hover:text-red-600"
          >
            <span className="flex items-center gap-1">
              <HiOutlineShoppingBag size={18} />
              Cart
              <span className="-mt-5 text-[10px] px-2 py-1 rounded-full text-white bg-red-400">
                {cart.length}
              </span>
            </span>
            <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-red-600 transform origin-center transition-transform scale-x-0 group-hover:scale-x-100"></span>
          </NavLink>

          {auth?.user ? (
            <>
              <button
                onClick={toggleDropdown}
                className="btn flex flex-col relative group hover:text-red-600"
              >
                <span className="flex items-center gap-1">
                  <GoPerson size={20} />
                  Profile
                </span>
                <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-red-600 transform origin-center transition-transform scale-x-0 group-hover:scale-x-100"></span>
              </button>
              {isOpen && (
                <div className="absolute right-36 top-12 bg-white z-50 mt-2 p-4 w-60 border rounded-lg shadow-xl">
                  {auth.user.role === 1 ? (
                    <NavLink
                      to="/dashboard/admin"
                      className="block px-4 py-2 rounded-md hover:bg-red-50"
                    >
                      Admin Dashboard
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/dashboard/user"
                      className="block px-4 py-2 rounded-md hover:bg-red-50"
                    >
                      My Account
                    </NavLink>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-start px-4 py-2 rounded-md hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <NavLink
              to="/sign-in"
              className="btn flex flex-col relative group hover:text-red-600"
            >
              <span className="flex items-center gap-1">
                <GoPerson size={20} />
                Login
              </span>
              <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-red-600 transform origin-center transition-transform scale-x-0 group-hover:scale-x-100"></span>
            </NavLink>
          )}
        </div>

        {/* Mobile Search Icon and Nav Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Mobile Search Icon */}
          {!mobileSearchOpen ? (
            <FiSearch
              className="cursor-pointer text-red-600"
              size={24}
              onClick={toggleMobileSearch}
            />
          ) : (
            ""
          )}

          {/* Mobile Navigation Toggle */}
          {!navOpen ? (
            <HiBars2
              className="cursor-pointer text-red-600 "
              size={30}
              onClick={toggleNav}
            />
          ) : (
            <RiCloseLine
              className="cursor-pointer text-red-600"
              size={30}
              onClick={toggleNav}
            />
          )}
        </div>

        {/* Mobile Search Box */}
        {mobileSearchOpen && (
          <div className="fixed z-50 top-0 left-0 w-full bg-white p-4 flex items-center">
            <SearchInput />
            <button
              type="button"
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={toggleMobileSearch}
            >
              <FiX size={20} />
            </button>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {navOpen && (
          <div className="absolute z-50 top-20 right-0 w-[100%] bg-white text-black border-b p-5">
            <div className="flex flex-col gap-5">
              <NavLink
                to="/all-product"
                onClick={toggleNav}
                className={({ isActive }) =>
                  `p-4 flex items-center gap-4 transition-colors duration-200 ${
                    isActive
                      ? "bg-red-600 text-white rounded-lg"
                      : "bg-white text-black hover:bg-red-600 hover:text-white rounded-lg "
                  }`
                }
              >
                <AiOutlineProduct size={26} />
                <span>All Products</span>
              </NavLink>

              <NavLink
                to="/cart"
                onClick={toggleNav}
                className={({ isActive }) =>
                  `p-4 flex items-center gap-4 transition-colors duration-200 ${
                    isActive
                      ? "bg-red-600 text-white rounded-lg"
                      : "bg-white text-black hover:bg-red-600 hover:text-white rounded-lg "
                  }`
                }
              >
                <HiOutlineShoppingBag size={24} />
                <span>Cart</span>
                <span className="-mt-5 text-[10px] px-2 py-1 rounded-full text-white bg-red-400 ">
                  {cart.length}
                </span>
              </NavLink>
              {auth?.user ? (
                <>
                  <NavLink
                    to={
                      auth.user.role === 1
                        ? "/dashboard/admin"
                        : "/dashboard/user"
                    }
                    onClick={toggleNav}
                    className={({ isActive }) =>
                      `p-4 flex items-center gap-4 transition-colors duration-200 ${
                        isActive
                          ? "bg-red-600 text-white rounded-lg"
                          : "bg-white text-black hover:bg-red-600 hover:text-white rounded-lg "
                      }`
                    }
                  >
                    <GoPerson size={24} />
                    {auth.user.role === 1 ? "Admin Dashboard" : "My Account"}
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex p-4 gap-4 items-center hover:bg-red-600 hover:text-white rounded-lg"
                  >
                    <FiLogOut size={24} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <NavLink
                  to="/sign-in"
                  onClick={toggleNav}
                  className={({ isActive }) =>
                    `p-4 flex items-center gap-4 transition-colors duration-200 ${
                      isActive
                        ? "bg-red-600 text-white rounded-lg"
                        : "bg-white text-black hover:bg-red-600 hover:text-white rounded-lg "
                    }`
                  }
                >
                  <GoPerson size={24} />
                  <span>Login</span>
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
