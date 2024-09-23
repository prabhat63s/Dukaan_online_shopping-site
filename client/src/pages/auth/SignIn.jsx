import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/helper";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import AuthLayout from "./AuthLayout";

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

      const res = await axios.post("https://dukaan-online-shopping-site.onrender.com/api/v1/auth/sign-in", {
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
        // Redirect based on user role or location state
        const role = res.data.user.role;
        if (role === 1) {
          navigate("/dashboard/admin");
        } else {
          navigate(location.state?.from || "/");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <AuthLayout>
        <div className="w-full pb-10 mb-10 border-b">
          <h1 className="text-2xl font-semibold mb-2">Login</h1>
          <p>Get access to your Orders, Wishlist, and Recommendations</p>
        </div>
        <div className="w-full lg:min-h-[50vh] flex flex-col lg:flex-row gap-10 lg:divide-x">
          <div className="w-full lg:w-[50%] h-full flex items-center justify-center">
            <form
              className="flex flex-col space-y-6 w-full"
              onSubmit={handleSubmit}
            >
              <h1 className="text-xl font-semibold mb-2">Welcome Back!</h1>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border text-sm rounded-lg block w-full p-3"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && (
                  <div className="text-red-600 pt-2 text-xs">{error}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your password
                </label>
                <div className="flex items-center text-gray-900 p-3 border rounded-lg w-full">
                  <input
                    type={isShowPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="w-full outline-none bg-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {isShowPassword ? (
                    <IoEyeOutline
                      size={18}
                      onClick={toggleShowPassword}
                      className="text-neutral-600 cursor-pointer"
                    />
                  ) : (
                    <IoEyeOffOutline
                      size={18}
                      onClick={toggleShowPassword}
                      className="text-neutral-600 cursor-pointer"
                    />
                  )}
                </div>
                {error && (
                  <div className="text-red-600 pt-2 text-xs">{error}</div>
                )}
              </div>
              <Link
                to="/forgot-password"
                className="text-red-600 text-sm hover:text-black"
              >
                Forgot password?
              </Link>
              <button
                type="submit"
                className="w-fit text-white bg-red-600 hover:bg-red-500 gap-2 font-medium rounded-lg px-5 py-2.5 text-center shadow-lg"
              >
                LOGIN
              </button>
            </form>
          </div>

          <div className="w-full lg:w-[50%] lg:pl-10 h-full flex items-center justify-center">
            <div className="space-y-6 w-full flex flex-col gap-2">
              <h1 className="text-xl font-semibold">New Customer</h1>
              <p>
                Be part of our growing family of new customers! Join us today
                and unlock a world of exclusive benefits, offers, and
                personalized experiences.
              </p>
              <Link to="/sign-up">
                <button className="w-fit text-white bg-red-600 hover:bg-red-500 gap-2 font-medium rounded-lg px-5 py-2.5 text-center shadow-lg">
                  SIGNUP
                </button>
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
