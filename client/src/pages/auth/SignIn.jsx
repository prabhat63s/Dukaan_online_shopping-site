import Layout from "../../components/layout/Layout";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/helper";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [error, setError] = useState(null);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(email)) {
        setError("Please enter a valid email");
        return;
      }
      if (!validatePassword(password)) {
        setError(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        return;
      }

      setError(""); // Clear the error state if no validation errors

      const res = await axios.post("/api/v1/auth/sign-in", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
      <div className="w-full h-[600px] flex flex-col lg:flex-row gap-8 px-6 items-center justify-center">
        <div className="lg:w-[40%] w-full">
          <img
            src="https://www.sapphiresolutions.net/images/farmer_app/images/farmer_app_about.svg"
            alt=""
          />
        </div>

        <div className="w-full flex items-center flex-col lg:w-[40%]">
          <h2 className=" text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
            Welcome to agrocart.
          </h2>
          <form
            className="space-y-4 w-full lg:w-[70%] mt-5"
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

            <div className="text-sm text-end">
              <Link
                to="/forgot-password"
                className="text-xs text-emerald-500 hover:text-emerald-400"
              >
                Forgot password?
              </Link>
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
            <div className="pt-4">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-2 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400 "
              >
                Login
              </button>
            </div>
          </form>

          <p className="text-center mt-4 text-xs text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/sign-up"
              className="font-semibold leading-6 text-emerald-500 hover:text-emerald-400"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
