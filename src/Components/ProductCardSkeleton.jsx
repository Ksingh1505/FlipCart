import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="flex justify-evenly w-screen min-h-screen flex-wrap gap-6 mt-7">
      {Array.from({ length: 30 }).map((_, index) => (
        <div
          key={index}
          className="w-[20rem] h-[42vh] rounded-xl bg-base-100 shadow-lg p-4 flex flex-col gap-4"
        >
          {/* Image Skeleton */}
          <div className="skeleton h-40 w-full rounded-xl"></div>

          {/* Title */}
          <div className="skeleton h-5 w-3/4"></div>

          {/* Description lines */}
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-5/6"></div>

          {/* Price + Button */}
          <div className="flex justify-between items-center mt-auto">
            <div className="skeleton h-6 w-20"></div>
            <div className="skeleton h-9 w-24 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;