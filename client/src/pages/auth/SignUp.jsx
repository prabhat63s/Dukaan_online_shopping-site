import Layout from "../../components/layout/Layout";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../utils/helper";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

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
      if (!validatePhoneNumber(phone)) {
        setError("Please enter a valid phone number");
        return;
      }

      setError(""); // Clear the error state if no validation errors

      const res = await axios.post("/api/v1/auth/sign-up", {
        name,
        email,
        password,
        phone,
        address,
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
      <div className="w-full h- flex flex-col lg:flex-row gap-8 px-6 my-20 lg:my-36 pt-6 items-center justify-center">
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
            className="space-y-4 w-full lg:w-[80%] mt-5"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-between w-[100%] gap-2 flex-col lg:flex-row lg:space-y-0 space-y-4">
              <input
                name="username"
                type="text"
                autoComplete="name"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
              />

              <input
                name="tel"
                type="tel"
                autoComplete="tel"
                value={phone}
                maxLength="10"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="6957484587"
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
                placeholder="name@gmail.com"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
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
            <div className="mt-2">
              <input
                name="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="address"
                placeholder="Address"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 mt-2">
              <select
                name=""
                id=""
                className="border w[100%] rounded-md text-sm p-3"
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
                name="text"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Answer"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <div className="pt-4">
              <button
                type="submit"
                className="flex w-full  justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-2 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-xs text-gray-500">
            Have an account?{" "}
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
