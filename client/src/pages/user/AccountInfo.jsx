import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { toast } from "sonner";
import axios from "axios";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { validatePassword } from "../../utils/helper";

export default function AccountInfo() {
  // Context
  const [auth, setAuth] = useAuth();

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  // Get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validatePassword(password)) {
        setError(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        return;
      }
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Full Name and Email */}
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full p-3 border rounded-md shadow-sm focus:border-emerald-400 focus:ring-emerald-400"
              placeholder="Full Name"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-3 border rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
              placeholder="Email"
              disabled
            />
          </div>
        </div>

        {/* Password and Phone */}
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="flex-1 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={isShowPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full p-3 border rounded-md shadow-sm focus:border-emerald-400 focus:ring-emerald-400"
              />
              <div
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                {isShowPassword ? (
                  <IoEyeOutline size={20} />
                ) : (
                  <IoEyeOffOutline size={20} />
                )}
              </div>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="block w-full p-3 border rounded-md shadow-sm focus:border-emerald-400 focus:ring-emerald-400"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            name="address"
            value={address}
            rows={4}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="block w-full p-3 border rounded-md shadow-sm resize-none focus:border-emerald-400 focus:ring-emerald-400"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="flex lg:w-fit w-full justify-center rounded-md bg-red-600 py-3 lg:py-2 px-2 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-red-500"
          >
            Update Profile
          </button>
        </div>
      </form>
    </>
  );
}
