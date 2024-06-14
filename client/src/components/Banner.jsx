import React from "react";
import afas from "../assets/afas.png";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Banner({ title, link, buttonText }) {
  return (
    <div className="w-[92%] lg:w-full mx-auto border rounded-md bg-gradient-to-tr mb-6 from-emerald-100 via-emerald-50 to-emerald-100">
      <div className="flex justify-between m-4">
        <div className="w-[50%] lg:w-[60%] flex flex-col justify-center items-start">
          <h1 className="text-lg lg:text-2xl font-semibold">{title}</h1>
          <Link
            to={link}
            target="_/blank"
            className="text-[15px] flex items-center gap-2 font-medium border border-white shadow-md bg-white hover:shadow-lg rounded-md py-1.5 px-3 text-gray-light"
          >
            {buttonText} <FaLongArrowAltRight />
          </Link>
        </div>
        <div className="w-[50%] lg:w-[40%] flex items-center justify-end">
          <img src={afas} alt="" className="lg:h-32" />
        </div>
      </div>
    </div>
  );
}
