import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
