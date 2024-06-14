import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { validatePassword } from "../../utils/helper";

export default function Profile() {
  //context
  const [auth, setAuth] = useAuth();
  //state
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

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
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
      if (data?.errro) {
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
    <Layout>
      <div className="lg:w-[85%] p-4 lg:p-0  mx-auto flex flex-col lg:flex-row gap-4 mb-6">
        <div className="lg:w-1/4 w-full ">
          <div className="flex flex-col bg-white lg:border rounded-md gap-4 lg:p-4 lg:px-6">
            <UserMenu />
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <div className="  mt-4 lg:mt-0 lg:border lg:p-4 rounded-md">
            <h1 className="font-semibold text-xl border-b pb-2">
              Update Profile
            </h1>
            <div className="flex flex-col space-y-2">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="mt-2">
                  <input
                    name="username"
                    type="text"
                    autoComplete="name"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
                  />
                </div>

                <div className="mt-2">
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    placeholder="name@gmail.com"
                    className=" block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
                  />
                </div>
                <div className="flex items-center border text-gray-900 text-sm rounded-md py-3 px-2 shadow-sm placeholder:text-gray-400 ">
                  <input
                    name="password"
                    type={isShowPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full outline-none bg-transparent"
                  />
                  {isShowPassword ? (
                    <IoEyeOutline
                      size={18}
                      onClick={() => toggleShowPassword()}
                      className="text-neutral-600"
                    />
                  ) : (
                    <IoEyeOffOutline
                      size={18}
                      onClick={() => toggleShowPassword()}
                      className="text-neutral-600"
                    />
                  )}
                </div>
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <div className="mt-2">
                  <textarea
                    name="address"
                    type="text"
                    value={address}
                    rows={6}
                    onChange={(e) => setAddress(e.target.value)}
                    autoComplete="address"
                    placeholder="Address"
                    className="block w-full resize-none rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
                  />
                </div>
                <div className="mt-2">
                  <input
                    name="phone"
                    type="phone"
                    autoComplete="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="flex w-fit justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-4 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
                  >
                    Update profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
