import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { ThemeContext } from "../Store/ThemeProvider";
import ProductCardSkeleton from "../Components/ProductCardSkeleton";
import ProductCard from "../Components/ProductCard";
import UseGetProductsByCategory from "../Hooks/UseProductCategory";

const ProductCategory = () => {
  const { theme } = useContext(ThemeContext);
  const { url: category } = useParams();

  const { productData, loading, error } =
    UseGetProductsByCategory(category);

  if (loading) return <ProductCardSkeleton />;

  if (error)
    return (
      <div className="text-center py-20 text-red-500 text-xl font-semibold">
        {error}
      </div>
    );

  const light =
    "flex justify-center items-center w-screen flex-col";
  const dark =
    "flex bg-gray-500 justify-center items-center w-screen flex-col";

  return (
    <div>
      <Navbar />

      <div className={theme === "light" ? light : dark}>
        <div className="flex justify-evenly w-screen min-h-screen flex-wrap gap-5 mt-7">
          {productData.map((pObj) => (
            <ProductCard key={pObj.id} data={pObj} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;