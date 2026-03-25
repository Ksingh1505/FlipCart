import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import PdpSkeleton from "../Components/PdpSkeleton";
import ProductReviews from "../Components/ProductReviews";
import UseGetProductById from "../Hooks/UseGetProductById";
import UseWishlistproduct from "../Hooks/UseWishlistproduct";
import UseCartProduct from "../Hooks/UseCartProduct";

const Pdp = () => {

  const { id } = useParams();
  const {loading, error, productData} = UseGetProductById(id);
  const { isProductInWishlist, handleWishlist} = UseWishlistproduct(productData);
  const {handleCartProduct, isProductInCart} = UseCartProduct(id);
  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
    if (!loading && productData.thumbnail) {
      setSelectedImage(productData.thumbnail);
    }
  }, [productData]);

  const discountedPrice = productData && ( productData.price - (productData.price * productData.discountPercentage) / 100).toFixed(2);

  return (
    <>
      {/* Navbar already has theme toggle */}
      <Navbar hideSearchBar={true} />

      {loading && <PdpSkeleton />}

      {error && (
        <div className="text-center py-20 text-error text-xl font-semibold">
          {error}
        </div>
      )}

      {!loading && !error && productData && (
        <div className="max-w-7xl mx-auto px-6 py-12 bg-base-100 text-base-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* IMAGE SECTION */}
            <div className="space-y-4">
              <div className="card bg-base-200 shadow-xl p-6">
                <img
                  src={selectedImage}
                  alt={productData.title}
                  className="w-full h-96 object-contain"
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                {productData.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    onClick={() => setSelectedImage(img)}
                    className={`h-20 w-20 object-cover rounded-lg cursor-pointer border transition
                      ${selectedImage === img ? "border-primary scale-105" : "border-base-300"}`}
                  />
                ))}
              </div>
            </div>

            {/* DETAILS SECTION */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">{productData.title}</h1>

              <div className="flex gap-3">
                <span className="badge badge-primary">{productData.brand}</span>
                <span className="badge badge-outline">
                  Stock: {productData.stock}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-success">
                  ${discountedPrice}
                </span>
                <span className="line-through text-base-content/50">
                  ${productData.price}
                </span>
                <span className="badge badge-error">
                  {productData.discountPercentage}% OFF
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="rating rating-sm">
                  {[...Array(5)].map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      className="mask mask-star-2 bg-orange-400"
                      checked={i < Math.round(productData.rating)}
                      readOnly
                    />
                  ))}
                </div>
                <span className="text-sm">
                  {productData.rating} / 5
                </span>
              </div>

              {/* Description */}
              <p className="leading-relaxed text-base-content/80">
                {productData.description}
              </p>

              {/* Extra Info */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <p>📦 {productData.stock} items left</p>
                <p>🛡 Warranty included</p>
                <p>🔁 Easy returns</p>
                <p>🚚 Fast delivery</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleCartProduct}
                  style={{
                    backgroundColor: isProductInCart ? "#4CBB17" : "white",
                    borderColor: isProductInCart ? "transparent" : "black",
                    color: isProductInCart ? "white" : "black",
                    width: "50%",
                  }}
                  className="border  px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                >
                  {isProductInCart ? "Remove from Cart" : "Add to Cart"}
                </button>

                <button
                  onClick={handleWishlist}
                  style={{
                    backgroundColor: isProductInWishlist ? "#D62828" : "white",
                    borderColor: isProductInWishlist ? "transparent" : "black",
                    color: isProductInWishlist ? "white" : "black",
                    width: "50%",
                  }}
                  className="border  px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                >
                  {isProductInWishlist
                    ? "Remove from wishlist"
                    : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>


          {/* Reviews */}
          <div className="mt-14">
            <ProductReviews reviews={productData.reviews} />
          </div>
        </div>
      )}
    </>
  );
};

export default Pdp;