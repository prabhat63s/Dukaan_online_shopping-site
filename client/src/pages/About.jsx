import React from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="w-full min-h-screen">
        <div className="mx-auto w-[85%] my-20 text-[14px]">
          <h1 className="text-neutral-900 text-2xl mb-4 font-bold w-fit border-b-4">
            About
          </h1>

          <div className=" w-full text-neutral-900">
            <p className="">
              At agrocart, we're passionate about fostering growth in
              agriculture by providing farmers with the tools and resources they
              need to thrive. Founded with the vision of revolutionizing the
              agricultural industry, we've dedicated ourselves to offering a
              comprehensive range of high-quality products tailored to the needs
              of modern farmers.
            </p>

            <h1 className="text-lg mb-4 font-bold ">Our Mission</h1>
            <p className="">
              Our mission at agrocart is simple: to empower farmers and
              agricultural professionals with innovative solutions that enhance
              productivity, sustainability, and profitability. We believe in the
              transformative power of technology and expertise to address the
              evolving challenges facing the agricultural sector.
            </p>

            <h1 className="text-lg mb-4 font-bold ">Product Range</h1>
            <p className="">
              At agrocart, we understand that every farm is unique, and that's
              why we offer a diverse selection of products carefully curated to
              meet the diverse needs of our customers. From precision farming
              equipment to organic fertilizers, seeds, and crop protection
              solutions, our product range is designed to optimize yield,
              minimize environmental impact, and maximize return on investment.
            </p>

            <h1 className="text-lg mb-4 font-bold ">Quality Assurance</h1>
            <p className="">
              Quality is at the heart of everything we do at agrocart. We
              partner with leading manufacturers and suppliers to ensure that
              our products meet the highest standards of excellence. Through
              rigorous testing and quality assurance processes, we guarantee
              that every product we offer delivers superior performance and
              reliability in the field.
            </p>

            <h1 className="text-lg mb-4 font-bold ">Sustainable Practices</h1>

            <p className="">
              As stewards of the land, we recognize the importance of
              sustainable agriculture in preserving our planet for future
              generations. That's why sustainability is a core value embedded in
              everything we do at agrocart. From promoting eco-friendly farming
              practices to offering organic and environmentally-friendly
              products, we're committed to helping farmers cultivate success in
              harmony with nature.
            </p>

            <h1 className="text-lg mb-4 font-bold ">Customer Commitment</h1>
            <p className="">
              At agrocart, our customers are our top priority. We're dedicated
              to providing exceptional service and support to help our customers
              succeed. Whether you're a small-scale farmer or a large
              agricultural enterprise, you can count on us to be your trusted
              partner in agriculture.
            </p>

            <h1 className="text-lg mb-4 font-bold ">
              Join Us in Cultivating Success
            </h1>
            <p className="">
              At agrocart, we're more than just a supplier of agricultural
              products—we're a partner in your success. Join us in cultivating a
              brighter future for agriculture and experience the difference that
              agrocart can make on your farm.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
