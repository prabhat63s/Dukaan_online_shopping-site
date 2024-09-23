import Layout from "../components/layout/Layout";
import Categories from "./Categories";
import { FaStar } from "react-icons/fa";
import NewArrivals from "../components/NewArrivals";
import Banner from "../components/Banner";

const steps = [
  {
    step: "Step 1",
    title: " Filter & Discover",
    description:
      "Smart filtering and suggestions make it easy to find exactly what you're looking for.",
    icon: "🔍",
  },
  {
    step: "Step 2",
    title: " Add to Bag",
    description:
      "Easily select the correct items and add them to the cart for a smooth shopping experience.",
    icon: "🛒",
  },
  {
    step: "Step 3",
    title: " Fast Shipping",
    description:
      "The carrier will confirm and ship quickly to you, ensuring your items arrive promptly.",
    icon: "🚚",
  },
  {
    step: "Step 4",
    title: " Enjoy the Product",
    description:
      "Have fun and enjoy your 5-star quality products delivered to your doorstep.",
    icon: "🎉",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    title: "Fashion Enthusiast",
    feedback:
      "I absolutely love the new collection! The quality is fantastic, and the styles are so trendy. Highly recommend!",
    img: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "John Smith",
    title: "Satisfied Customer",
    feedback:
      "Great experience shopping here. The customer service was excellent, and my order arrived quickly. Will shop again!",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 4,
  },
  {
    id: 3,
    name: "Emily Johnson",
    title: "Fashion Blogger",
    feedback:
      "The outfits are stylish and comfortable. Perfect for my fashion blog! The attention to detail is impressive.",
    img: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Michael Brown",
    title: "New Customer",
    feedback:
      "I was pleasantly surprised by the variety and quality of the products. Excellent value for money.",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 4,
  },
];

export default function Home() {
  return (
    <Layout>
      {/* Category Section */}
      <Categories />

      {/* banner */}
      <Banner
        title="Welcome to Dukaan!"
        link="/all-products"
        buttonText="Shop Now"
        promoText="Get the best deals on top brands!"
      />

      {/* New Arrivals */}
      <NewArrivals />

      {/* How It Works */}
      <div className="my-16 border-t border-b">
        <div className="lg:max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 "
              >
                <div className="text-6xl mb-4">{s.icon}</div>
                <h3 className="bg-red-100 mb-2 rounded-full px-2 py-1">
                  {s.step}
                </h3>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="lg:max-w-7xl mx-auto my-16 px-4">
        <h2 className="text-2xl font-semibold mb-6">What Our Customers Say.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className=" flex flex-col items-center">
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <div className="flex items-center mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-center mb-4">
                {testimonial.feedback}
              </p>
              <h3 className="text-lg font-medium text-gray-800">
                {testimonial.name}
              </h3>
              <p className="text-gray-500">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
