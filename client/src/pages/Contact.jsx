import React, { useRef } from "react";
import Layout from "../components/layout/Layout";
import { Link, NavLink } from "react-router-dom";
import { BiSolidSend } from "react-icons/bi";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { BiLogoGmail, BiSolidMap, BiSolidPhone } from "react-icons/bi";

const social = [
  {
    id: 1,
    to: "/",
    title: <FaInstagram />,
  },
  {
    id: 2,
    to: "/",
    title: <FaYoutube />,
  },
  {
    id: 3,
    to: "/",
    title: <FaLinkedin />,
  },
  {
    id: 4,
    to: "/",
    title: <FaFacebook />,
  },
  {
    id: 4,
    to: "/",
    title: <FaTwitter />,
  },
];

const details = [
  {
    id: 1,
    icon: <BiSolidMap />,
    title: "Gorakhpr, Utter Pradesh",
  },
  {
    id: 2,
    icon: <BiLogoGmail />,
    title: "agrocart@agrocart.com",
  },
  {
    id: 3,
    icon: <BiSolidPhone />,
    title: "+91 6386144016",
  },
];

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_gdgixjk",
        "template_5t5nz3q",
        form.current,
        "_9yNk3LSpKuacUBbk"
      )
      .then(
        () => {
          form.current.reset();
          toast.success("संदेश सफलतापूर्वक भेजा जा चुका है!");
        },
        (error) => {
          toast.error("संदेश नहीं भेजा गया!");
        }
      );
  };

  return (
    <Layout>
      <div className="lg:max-w-7xl mx-auto px-4">
        <div className="py-10 border-b">
          <h1 className="text-2xl font-semibold mb-2">Get in touch</h1>
          <span className="">
            <Link to="/">Home / </Link>
            <Link to="/all-product">All Products</Link>
          </span>
        </div>
        <div className=" w-full flex justify-between flex-col mt-10 gap-6 items-center text-black md:flex-row">
          <div className=" w-full flex justify-center items-center lg:w-[40%] ">
            <div className=" w-[100%]">
              {details.map(({ id, icon, title }) => (
                <div
                  id={id}
                  className="w-full h-14 rounded-lg flex shadow-sm items-center bg-gray-50 my-8"
                >
                  <span className="text-red-600 mx-3">{icon}</span>
                  {title}
                </div>
              ))}
              <div className="w-full h-14 rounded-lg flex items-center shadow-sm bg-gray-50 text-red-600 text-xl my-4">
                {social.map(({ id, to, title }) => (
                  <NavLink id={id} to={to} className="mx-5">
                    {title}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-[60%]">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="mx-auto max-w-2xl flex-col flex gap-6"
            >
              <div className="grid grid-cols-1 text-black gap-x-8 gap-y-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Enter your name"
                  className="block w-full rounded-md shadow-sm bg-gray-50 border-0 px-3.5 py-3 placeholder:text-gray-800"
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Enter your email"
                  className="block w-full rounded-md  px-3.5 py-3 shadow-sm bg-gray-50 placeholder:text-gray-800"
                />
              </div>

              <div className="sm:col-span-2">
                <textarea
                  name="message"
                  rows={8}
                  placeholder="Enter your message"
                  className="block w-full rounded-md border-0 px-3.5 py-4 shadow-sm bg-gray-50 resize-none placeholder:text-gray-800"
                />
              </div>
              <div>
                <button
                  type="submit"
                  value="Send"
                  className="flex w-full lg:w-fit items-center rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-red-500"
                >
                  Send message
                  <span className="ml-3">
                    <BiSolidSend />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
