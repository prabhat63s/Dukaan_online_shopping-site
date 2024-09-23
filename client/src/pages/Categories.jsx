import useCatgory from "../hooks/useCategory";
import { Link } from "react-router-dom";

export default function Categories() {
  const categories = useCatgory();

  return (
    <div className="w-full border-b ">
      <div className="lg:max-w-7xl h-[10vh] mx-auto px-4 gap-6 flex lg:justify-center items-center overflow-x-auto scrollbar-hide">
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
