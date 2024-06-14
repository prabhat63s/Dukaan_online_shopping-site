import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/web.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const company = [

  {
    to: "/about",
    title: "About",
  },
  {
    to: "/teamPage",
    title: "Team",
  },
];

const contact = [
  {
    to: "/",
    title: "Help & Supports",
  },
  {
    to: "/",
    title: "Partners",
  },
  {
    to: "/contact",
    title: "Contact",
  },
];

const legal = [
  {
    to: "/",
    title: "Terms & Condition",
  },
  {
    to: "/",
    title: "Cookies Policy",
  },
  {
    to: "/",
    title: "Privacy Policy",
  },
];

const socials = [
  {
    to: "https://www.instagram.com/_frontend.ui_/",
    title: <FaInstagram />,
    id: 1,
  },
  {
    to: "https://www.youtube.com/_frontend.ui_/",
    title: <FaYoutube />,
    id: 2,
  },
  {
    to: "https://www.linkedin.com/in/prabhat-singh-10a134255/",
    title: <FaLinkedin />,
    id: 3,
  },
  {
    to: "/",
    title: <FaFacebook />,
    id: 4,
  },
  {
    to: "/",
    title: <FaWhatsapp />,
    id: 5,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="z-50 py-10 flex justify-center items-center flex-col bg-[#0d0d0d] shadow-lg text-white">
      <div className="w-[90%] lg:w-[85%] mb-10 lg:mb-0">
        <div className="gap-5 lg:gap-10 flex flex-col lg:flex-row">
          <div className="lg:w-[500px] flex flex-col space-y-2">
            <NavLink to="/" className="flex items-center space-x-2">
              <img className="h-10 w-10" src={logo} alt="Your Company" />
              <h1 className="font-semibold mt-2 text-2xl">
                  agro<span className="text-emerald-500">cart</span>
                </h1>
            </NavLink>
            <Link
              to="/"
              target="_/blank"
              className="text-[10px] text-gray-light"
            >
              By Apni fasal apni suraksha.
            </Link>
            <p className="text-[12px]">
              © {currentYear} agrocart | Inc. All rights reserved.
            </p>
            <div className="flex text-emerald-500">
              {socials.map((s) => (
                <Link
                  to={s.to}
                  key={s.id}
                  target="_blank"
                  className="mr-6 mt-2 text-[20px]"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-60 lg:border-l border-gray-light lg:pl-12">
            <h1 className="text-[14px] text-green">About Us</h1>
            {company.map(({ to, title }) => (
              <NavLink to={to} key={title} className="my-4 flex text-[12px]">
                {title}
              </NavLink>
            ))}
          </div>
          <div className="w-60 lg:border-l border-gray-light lg:pl-12">
            <h1 className="text-[14px] text-green">Contact Us</h1>
            {contact.map(({ to, title }) => (
              <NavLink to={to} key={title} className="my-4 flex text-[12px]">
                {title}
              </NavLink>
            ))}
          </div>
          <div className="w-60 lg:border-l border-gray-light lg:pl-12">
            <h1 className="text-[14px] text-green">Legal Info.</h1>
            {legal.map(({ to, title }) => (
              <NavLink to={to} key={title} className="my-4 flex text-[12px]">
                {title}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
