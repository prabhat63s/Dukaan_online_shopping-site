import Categories from "../pages/Categories";
import Header from "./layout/Header";

export default function MobileCategory() {
  return (
    <div className="lg:hidden h-[600px]">
      <Header />
      <div className="fixed bottom-56 w-full border-t pt-6">
        <Categories />
      </div>
    </div>
  );
}
