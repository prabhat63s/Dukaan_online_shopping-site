import { NavLink } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import logo from "../../assets/logo.png";

export default function AuthLayout({ children }) {
  return (
    <div>
      <header className="w-full border-b">
        <div className="lg:max-w-7xl h-[10vh] mx-auto px-4 flex justify-between items-center">
          {/* Logo and Desktop Navigation */}
          <NavLink to="/" className="flex items-center gap-1">
            <img src={logo} alt="logo" className="h-8" />
            <h1 className="text-2xl flex items-center font-semibold mb-0">
              Dukaan
            </h1>
          </NavLink>
        </div>
      </header>
      <main className="w-full min-h-[75vh] flex flex-col items-center justify-center lg:max-w-7xl mx-auto p-4 my-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
