import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";
import Contact from "./pages/Contact";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/Private";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Product from "./pages/admin/Product";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import CategoryProduct from "./pages/CategoryProduct";
import Cart from "./pages/Cart";
import AdminOrder from "./pages/admin/AdminOrder";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSucces";
import AllUsers from "./pages/admin/AllUsers";
import AllBlog from "./pages/admin/blog/AllBlog";
import CreateBlog from "./pages/admin/blog/CreateBlog";
import UpdateBlog from "./pages/admin/blog/UpdateBlog";
import AllProducts from "./pages/AllProducts";
import RedirectIfAuthenticated from "./components/routes/RedirectIfAuthenticated";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/all-product" element={<AllProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderSuccess" element={<OrderSuccess />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="product/:slug" element={<UpdateProduct />} />
          <Route path="products" element={<Product />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="all-blog" element={<AllBlog />} />
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="update-blog" element={<UpdateBlog />} />
        </Route>

        <Route
          path="/sign-up"
          element={
            <RedirectIfAuthenticated>
              <SignUp />
            </RedirectIfAuthenticated>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/sign-in"
          element={
            <RedirectIfAuthenticated>
              <SignIn />
            </RedirectIfAuthenticated>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
