import useCatgory from "../hooks/useCategory";
import { Link } from "react-router-dom";

export default function Categories() {
  const categories = useCatgory();

  return (
    <div className="w-[85%] mx-auto flex flex-col items-center h-12 justify-between lg:flex-row gap-4">
      {categories?.map((c) => (
        <Link
          key={c._id}
          to={`/category/${c.slug}`}
          className="flex justify-between text-[14px] hover:text-emerald-500"
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}
