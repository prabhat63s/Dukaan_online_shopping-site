import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { validateEmail, validatePassword } from "../../utils/helper";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import AuthLayout from "./AuthLayout";

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
      const res = await axios.post("https://dukaan-online-shopping-site.onrender.com/api/v1/auth/forgot-password", {
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
    <AuthLayout>
      <div className="w-full pb-10 mb-10 border-b">
        <h1 className="text-2xl font-semibold mb-2">Forgot Password</h1>
        <p className="text-gray-600">Welcome to our Community</p>
      </div>
      <div className="w-full lg:max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="my-4 w-full px-3 py-2 border rounded-md "
              placeholder="example@example.com"
              required
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
              <option value="">What is the name of your favorite tool?</option>
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
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Continue
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/sign-in" className="text-red-600 hover:text-black">
            Go back for Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
