import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import { validateEmail, validatePassword } from "../../utils/helper";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(email)) {
        setError("Please enter a valid email");
        return;
      }
      if (!validatePassword(newPassword)) {
        setError(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        return;
      }
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/sign-in");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="w-full flex flex-col lg:flex-row gap-8 px-6 my-16 lg:my-40 pt-6 items-center justify-center">
        <div className="lg:w-[40%] w-full">
          <img
            src="https://www.sapphiresolutions.net/images/farmer_app/images/farmer_app_about.svg"
            alt=""
          />
        </div>

        <div className="w-full flex items-center flex-col lg:w-[40%]">
          <h2 className=" text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
            Retrieve your password
          </h2>
          <form
            className="space-y-4 w-full lg:w-[80%] mt-5"
            onSubmit={handleSubmit}
          >
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@gmail.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-2">
              <select
                name=""
                id=""
                className="border w-[100%] rounded-md text-sm p-3"
              >
                <option value="" disabled>
                  --Select security question --
                </option>
                <option value="">In what city were you born?</option>
                <option value="">What high school did you attend?</option>
                <option value="">
                  What is the name of your favorite tool?
                </option>
              </select>
              <input
                id="answer"
                name="answer"
                placeholder="Answer"
                type="text"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className="flex items-center border text-gray-900 text-sm rounded-md py-3 px-2 shadow-sm placeholder:text-gray-400 ">
              <input
                name="password"
                type={isShowPassword ? "text" : "password"}
                autoComplete="current-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            <div className="pt-4">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-2 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400 "
              >
                Reset
              </button>
            </div>
          </form>

          <p className="text-center mt-4 text-xs text-gray-500">
            or return{" "}
            <Link
              to="/sign-in"
              className="font-semibold leading-6 text-emerald-500 hover:text-emerald-400"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
