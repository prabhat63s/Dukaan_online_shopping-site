import useCatgory from "../hooks/useCategory";
import { Link } from "react-router-dom";

export default function Categories() {
  const categories = useCatgory();

  return (
    <div className="w-full">
      <div className="lg:max-w-7xl mx-auto px-4 pt-4 pb-1.5 lg:p-6 gap-8 flex lg:justify-center items-center overflow-x-auto scrollbar-hide">
        {categories?.map((c) => (
          <Link
            key={c._id}
            to={`/category/${c.slug}`}
            className="hover:text-red-600 whitespace-nowrap"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
