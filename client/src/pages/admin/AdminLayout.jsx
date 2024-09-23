import { useState } from "react";
import AdminNav from "./AdminNav";
import { HiBars2 } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { RiCloseLine } from "react-icons/ri";
import { useAuth } from "../../context/auth";
import { FiSearch } from "react-icons/fi";
import { GoPerson } from "react-icons/go";

export default function AdminLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [auth] = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Search query:", searchQuery);
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Header with menu bar for mobile */}
      <header className="w-full bg-white p-4 lg:px-10 flex justify-between items-center border-b">
        <NavLink to="/" className="flex items-center gap-1">
          <img src={logo} alt="logo" className="h-8" />
          <h1 className="text-2xl flex text-red-600 items-center mb-0 font-semibold">
            Dukaan
          </h1>
        </NavLink>
        <div className="lg:w-[60%] flex justify-between">
          <div className="hidden lg:flex justify-between w-full">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search here..."
                className="border rounded-full py-2 px-4 pl-10 w-96"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <FiSearch size={20} />
              </button>
            </form>
            <div className="flex gap-3 items-center">
              <GoPerson size={40} className="border-2 text-red-600 border-red-50 rounded-full" />
              <p className="flex flex-col mb-0">
                {auth?.user?.name}
                <span className="text-xs text-neutral-600">
                  {auth?.user?.role === 1 ? "Admin" : ""}
                </span>
              </p>
            </div>
          </div>
          <div className="flex lg:hidden">
            {!isMenuOpen ? (
              <HiBars2
                className="cursor-pointer text-red-600 "
                size={30}
                onClick={toggleMenu}
              />
            ) : (
              <RiCloseLine
                className="cursor-pointer text-red-600"
                size={30}
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
      </header>

      {/* Menu content, visible only when isMenuOpen is true */}
      {isMenuOpen && (
        <nav className="fixed z-50 top-16 right-0 w-[100%] bg-white border-b p-4 lg:hidden">
          <AdminNav />
        </nav>
      )}

      <div className="flex h-screen bg-gray-50">
        <div className="hidden lg:flex p-4 lg:px-10 bg-white whitespace-nowrap">
          <AdminNav />
        </div>
        <main className="flex-grow p-4 pb-24 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
