import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../utils/helper";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import AuthLayout from "./AuthLayout";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState({});
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email.";
    }
    if (!validatePassword(password)) {
      validationErrors.password =
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    if (!validatePhoneNumber(phone)) {
      validationErrors.phone = "Please enter a valid phone number.";
    }
    if (!answer.trim()) {
      validationErrors.answer = "Please provide an answer.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setErrors({});
      const res = await axios.post("https://dukaan-online-shopping-site.onrender.com/api/v1/auth/sign-up", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/sign-in");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <AuthLayout>
        <div className="w-full pb-10 mb-10 border-b">
          <h1 className="text-2xl font-semibold mb-2">
            Looks like you're new here!
          </h1>
          <p>Sign up with your email to get started</p>
        </div>
        <div className="w-full lg:min-h-[70vh] flex flex-col lg:flex-row gap-10 lg:divide-x">
          <div className="w-full lg:w-[50%] h-full flex items-center justify-center">
            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
              <h1 className="text-xl font-semibold mb-2">Sign Up</h1>

              <div className="flex flex-col lg:flex-row w-full gap-4">
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full name"
                    className="border text-sm rounded-lg block w-full p-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <p className="text-red-600 pt-2 text-xs">{errors.name}</p>
                  )}
                </div>

                <div className="w-full">
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
                  {errors.email && (
                    <p className="text-red-600 pt-2 text-xs">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row w-full gap-4">
                <div className="w-full ">
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
                        className="cursor-pointer text-neutral-600"
                      />
                    ) : (
                      <IoEyeOffOutline
                        size={18}
                        onClick={toggleShowPassword}
                        className="cursor-pointer text-neutral-600"
                      />
                    )}
                  </div>
                  {errors.password && (
                    <p className="text-red-600 pt-2 text-xs">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="w-full ">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Phone number"
                    className="border text-sm rounded-lg block w-full p-3"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && (
                    <p className="text-red-600 pt-2 text-xs">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Address
                </label>
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
                  name="securityQuestion"
                  className="border w-full rounded-md text-sm p-3"
                >
                  <option value="" disabled>
                    --Select security question--
                  </option>
                  <option value="In what city were you born?">
                    In what city were you born?
                  </option>
                  <option value="What high school did you attend?">
                    What high school did you attend?
                  </option>
                </select>
                {errors.securityQuestion && (
                  <p className="text-red-600 pt-2 text-xs">
                    {errors.securityQuestion}
                  </p>
                )}
                <input
                  name="answer"
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Answer"
                  className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
                />
                {errors.answer && (
                  <p className="text-red-600 pt-2 text-xs">{errors.answer}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-fit text-white bg-red-600 hover:bg-red-500 gap-2 font-medium rounded-lg px-5 py-2.5 text-center"
              >
                SIGNUP
              </button>
            </form>
          </div>

          <div className="w-full lg:w-[50%] lg:pl-10 h-full flex items-center justify-center">
            <div className="space-y-6 w-full flex flex-col gap-2">
              <h1 className="text-xl font-semibold">
                Already have an account?
              </h1>
              <p>
                Welcome back. Sign in to access your personalized experience,
                saved preferences, and more. We're thrilled to have you with us
                again!
              </p>
              <Link to="/sign-in">
                <button className="w-fit text-white bg-red-600 hover:bg-red-500 gap-2 font-medium rounded-lg px-5 py-2.5 text-center shadow-lg">
                  LOGIN
                </button>
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
