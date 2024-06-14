import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="mt-24">{children}</main>
      <Footer />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 500,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 500,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
}
