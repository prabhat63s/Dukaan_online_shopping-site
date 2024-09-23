import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className=" text-black py-10 border-t">
      <div className="lg:max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <img src={logo} alt="logo" className="h-8" />
            Dukaan
          </h2>
          <p className="text-gray-400">
            Your one-stop shop for all your needs. From electronics to clothing,
            we offer the best products at affordable prices.
          </p>
          <div className="mt-4 flex gap-4">
            {/* Social Media Icons */}
            <FaInstagram />
            <FaFacebook />
            <FaLinkedinIn />
            <FaXTwitter />
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2">
            <li className="text-sm">
              <NavLink to="/products/electronics" className="hover:underline">
                Electronics
              </NavLink>
            </li>
            <li className="text-sm">
              <NavLink to="/products/fashion" className="hover:underline">
                Fashion
              </NavLink>
            </li>
            <li className="text-sm">
              <NavLink to="/products/home-kitchen" className="hover:underline">
                Home & Kitchen
              </NavLink>
            </li>
            <li className="text-sm">
              <NavLink to="/products/groceries" className="hover:underline">
                Groceries
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li className="text-sm">
              <NavLink to="/contact" className="hover:underline">
                Contact Us
              </NavLink>
            </li>
            <li className="text-sm">
              <NavLink to="/faq" className="hover:underline">
                FAQs
              </NavLink>
            </li>
            <li className="text-sm">
              <NavLink to="/shipping" className="hover:underline">
                Shipping Info
              </NavLink>
            </li>
            <li className="text-sm">
              <NavLink to="/returns" className="hover:underline">
                Return Policy
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li className="text-sm">
              <NavLink to="/about" className="hover:underline">
                About Us
              </NavLink>
            </li>
            <li className="text-sm">
              <NavLink to="/careers" className="hover:underline">
                Careers
              </NavLink>
            </li>
            <li className="text-sm">
              <NavLink to="/press" className="hover:underline">
                Press & Media
              </NavLink>
            </li>
            <li className="text-sm">
              <NavLink to="/affiliate" className="hover:underline">
                Affiliate Program
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t mt-8 py-4">
        <div className="lg:max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Dukaan. All rights reserved.
          </p>
          <ul className="flex space-x-4 text-gray-400 text-sm">
            <li className="text-sm">
              <NavLink to="/privacy" className="hover:underline">
                Privacy Policy
              </NavLink>
            </li>
            <li className="text-sm">
              <NavLink to="/terms" className="hover:underline">
                Terms of Service
              </NavLink>
            </li>
            <li className="text-sm">
              <NavLink to="/cookies" className="hover:underline">
                Cookie Policy
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
