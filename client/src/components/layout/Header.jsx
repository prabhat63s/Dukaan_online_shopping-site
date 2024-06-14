import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import SearchInput from "../form/SearchInput";
import { useCart } from "../../context/cart";
import { BiSolidGrid, BiCart, BiSearch } from "react-icons/bi";
import { GoHome, GoPerson } from "react-icons/go";
import logo from "../../assets/web.png";
// import { HiOutlineCube } from "react-icons/hi2";

export default function Header() {
  const [auth] = useAuth();
  const [cart] = useCart();

  return (
    <>
      {/* desktop view  */}
      <header className="fixed top-0 w-full h-[70px] z-50 border-b bg-white flex items-center ">
        <div className="lg:w-[85%] lg:mx-auto w-full flex justify-between items-center p-4 lg:p-0">
          <div className="flex gap-4 w-[50%] justify-between">
            <div className="flex w-full items-center gap-4 justify-between">
              <NavLink to="/" className="flex items-center space-x-2">
                <img className="h-10 w-10 " src={logo} alt="Your Company" />
                <h1 className="font-semibold mt-2 text-2xl">
                  agro<span className="text-emerald-500">cart</span>
                </h1>
              </NavLink>
              <div className="hidden w-[50%] lg:flex items-center">
                <SearchInput />
              </div>
            </div>
          </div>
          <div className="w-[50%] flex items-center justify-end gap-10 text-neutral-900">
            <div className="hidden lg:flex items-center gap-8">
              <NavLink
                to="/about"
                className="text-[14px] font-medium hover:text-emerald-400"
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className="text-[14px] font-medium hover:text-emerald-400"
              >
                Contact
              </NavLink>
              {!auth.user ? (
                <>
                  <NavLink
                    to="/sign-in"
                    className="text-[14px] font-medium hover:text-emerald-400"
                  >
                    Sign In
                  </NavLink>
                  <span className="border-r-2 h-6"></span>
                </>
              ) : (
                <>
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                    className="text-[14px] font-medium  hover:text-emerald-400"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <span className="border-r-2 h-6"></span>
                </>
              )}
            </div>

            {!auth.user ? (
              <NavLink to="/cart" className="flex hover:text-emerald-400">
                <BiCart size={24} />
                <span className="ml-1 text-[10px] text-emerald-500 ">
                  {" "}
                  {cart.length}
                </span>
              </NavLink>
            ) : (
              <>
                <NavLink to="/cart" className="flex hover:text-emerald-400">
                  <BiCart size={24} />
                  <span className="ml-1 text-[10px] text-emerald-500">
                    {" "}
                    {cart.length}
                  </span>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>

      {/* mobile nav  */}
      <div className="fixed z-50 bg-gray-100 bottom-0 gap-6 h-16 w-full lg:hidden flex items-center justify-evenly">
        <NavLink
          to="/"
          className="flex flex-col items-center text-[10px] text-gray"
        >
          <GoHome size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink
          className="flex flex-col items-center text-[10px] text-gray"
          to='/search'
        >
          <BiSearch size={20} />
          <span>Search</span>
        </NavLink>
        <NavLink
          className="flex flex-col items-center text-[10px] text-gray"
          to='/mobile-category'
        >
          <BiSolidGrid size={20} />
          <span>Categories</span>
        </NavLink>
        {/* <NavLink
           to={`/dashboard/${
            auth?.user?.role === 0 ? "user" : ""
          }/orders`}
          className="flex flex-col items-center text-[10px] text-gray"
        >
          <HiOutlineCube size={20} />
          <span>My Orders</span>
        </NavLink> */}

        {!auth.user ? (
          <NavLink
            to="/sign-in"
            className="flex flex-col items-center text-[10px] text-gray"
          >
            <GoPerson size={20} />
            <span>Log In</span>
          </NavLink>
        ) : (
          <NavLink
            to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
            className="flex flex-col items-center text-[10px] text-gray"
          >
            <GoPerson size={20} />
            <span className="w-11 truncate text-clip">{auth?.user?.name}</span>
          </NavLink>
        )}
      </div>
    </>
  );
}
