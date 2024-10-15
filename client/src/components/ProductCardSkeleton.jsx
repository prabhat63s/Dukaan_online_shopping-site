import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; 

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      {/* Skeleton for the image */}
      <div className="w-full border h-56 lg:h-72 rounded-2xl bg-gray-200">
        <Skeleton
          height="100%"
          width="100%"
          style={{ borderRadius: "16px" }}
        />
      </div>
      {/* Skeleton for the text */}
      <div className="py-2 flex flex-col">
        <Skeleton width="80%" height={20} style={{ marginBottom: "0.5rem" }} />
        <Skeleton width="50%" height={25} />
      </div>
    </div>
  );
}
