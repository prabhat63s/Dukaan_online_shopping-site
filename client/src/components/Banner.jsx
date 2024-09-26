import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Banner({ title, link, buttonText, promoText }) {
  return (
    <div className="bg-img my-10 w-full">
      <div className="lg:max-w-7xl mx-auto flex flex-col justify-center items-start w-full p-4 pt-8 lg:py-10 text-white">
        <h1 className="text-lg lg:text-4xl font-semibold mb-2">{title}</h1>
        <p className=" mb-4 ">{promoText}</p>
        <Link
          to={link}
          className="text-sm flex items-center gap-2 font-medium bg-red-600 shadow-md hover:bg-red-500 hover:text-white transition-colors duration-300 rounded-md py-2 px-4"
        >
          {buttonText} <FaLongArrowAltRight />
        </Link>
        <div className="pt-4">
          <h2 className="text-lg font-bold mb-2">Exclusive Offers</h2>
          <ul className="list-disc pl-5 flex gap-2 flex-col">
            <li>Fast Delivery on Select Items</li>
            <li>Easy Return Policy</li>
            <li>Exciting Daily Deals</li>
            <li>Secure Payments</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
