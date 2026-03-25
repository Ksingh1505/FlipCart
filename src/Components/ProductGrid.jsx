import React, { useContext, useState } from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { ThemeContext } from "../Store/ThemeProvider";
import UseProducts from "../Hooks/UseProducts";


const ProductGrid = () => {
  
  const { theme } = useContext(ThemeContext);
 
  const [currentPage, setCurrentPage] = useState(1);
  const {productData,loading,error} = UseProducts(currentPage);


  if (loading) {
    return <ProductCardSkeleton />;
  }
  if (error) {
    return <p>...api failing</p>;
  }

  let checkBtn = "join-item btn btn-square bg-blue-500";
  let uncheckedBtn = "join-item btn btn-square";

  const light = "flex justify-center items-center w-screen flex- z-10 flex-col text-white";
  const dark = "flex bg-gray-500 justify-center items-center w-screen flex- z-10 flex-col";
  return (
    <div className={theme == "light" ? light : dark}>
      <div className="px-6 py-8 flex justify-center items-center w-screen flex-col">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Welcome to our Store.....
        </h1>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productData.map((pObj) => (
            <ProductCard key={pObj.id} data={pObj} />
          ))}
        </div>
        <div className="join mt-10 mb-10">
          <input onClick={() => {
            setCurrentPage(1);
          }}
            className={currentPage == 1 ? checkBtn : uncheckedBtn}
            type="radio"
            name="options"
            aria-label="1"

          />
          <input onClick={() => {
            setCurrentPage(2);
          }}
            className={currentPage == 2 ? checkBtn : uncheckedBtn}
            type="radio"
            name="options"
            aria-label="2"
          />
          <input onClick={() => {
            setCurrentPage(3);
          }}
            className={currentPage == 3 ? checkBtn : uncheckedBtn}
            type="radio"
            name="options"
            aria-label="3"
          />
          <input onClick={() => {
            setCurrentPage(4);
          }}
            className={currentPage == 4 ? checkBtn : uncheckedBtn}
            type="radio"
            name="options"
            aria-label="4"
          />

        </div>
      </div>
    </div>
  );
};

export default ProductGrid;