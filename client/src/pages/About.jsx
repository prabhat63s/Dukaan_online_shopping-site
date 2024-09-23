import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <div className="lg:max-w-7xl mx-auto px-4">
        <div className="py-10 border-b">
          <h1 className="text-2xl font-semibold mb-2">About Dukaan</h1>
          <span className="">
            <Link to="/">Home / </Link>
            <Link to="/all-product">All Products</Link>
          </span>
        </div>

        <div className="my-6 w-full text-neutral-900">
          <p className="">
            At Dukaan, we are committed to revolutionizing the e-commerce experience by providing a seamless platform for shoppers and sellers. Founded with the goal of making online shopping accessible and convenient for everyone, we've dedicated ourselves to offering a diverse range of products that cater to the unique needs of our customers.
          </p>

          <h1 className="text-lg mb-4 font-bold ">Our Mission</h1>
          <p className="">
            Our mission at Dukaan is to empower both consumers and businesses by providing innovative solutions that enhance shopping convenience and broaden market reach. We believe in the potential of technology to transform the retail landscape and improve the shopping experience.
          </p>

          <h1 className="text-lg mb-4 font-bold ">Product Range</h1>
          <p className="">
            At Dukaan, we offer an extensive selection of products across various categories, including electronics, fashion, home goods, and more. Our carefully curated product range is designed to meet the diverse preferences of our customers, ensuring that they find exactly what they are looking for.
          </p>

          <h1 className="text-lg mb-4 font-bold ">Quality Assurance</h1>
          <p className="">
            Quality is paramount at Dukaan. We partner with trusted manufacturers and suppliers to ensure that every product meets our high standards. Our rigorous quality assurance processes guarantee that customers receive only the best.
          </p>

          <h1 className="text-lg mb-4 font-bold ">Sustainable Practices</h1>
          <p className="">
            We recognize the importance of sustainability in the e-commerce sector. That's why we promote eco-friendly products and practices throughout our operations. At Dukaan, we are committed to minimizing our environmental impact while providing exceptional value to our customers.
          </p>

          <h1 className="text-lg mb-4 font-bold ">Customer Commitment</h1>
          <p className="">
            Our customers are at the heart of everything we do at Dukaan. We strive to provide exceptional service and support, ensuring that every shopping experience is positive and fulfilling. Whether you are a casual shopper or a serious buyer, we are here to help you every step of the way.
          </p>

          <h1 className="text-lg mb-4 font-bold ">
            Join Us in Transforming Shopping
          </h1>
          <p className="">
            At Dukaan, we are more than just an e-commerce platform—we are a partner in your shopping journey. Join us in transforming the way you shop online and discover the difference Dukaan can make in your life.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
