import React from "react";
import Navbar from "../Components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantityInCart,
  removeFormCart,
  addToCart,
} from "../App/ProductSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.product.cartData);

  const items = Object.values(cartData);

  const subtotal = items.reduce((acc, item) => {
    return acc + item.productData.price * item.qunatity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar hideSearchBar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          My Cart 🛒
        </h1>

        {items.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow">
            <div className="text-6xl mb-4">🛍️</div>

            <h2 className="text-xl font-semibold text-gray-800">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mt-2 mb-6 text-center">
              Start adding items to your cart
            </p>

            <Link to="/">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Products */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const product = item.productData;

                return (
                  <div
                    key={product.id}
                    className="flex gap-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                  >
                    {/* Image */}
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-24 h-24 object-contain bg-gray-50 rounded"
                    />

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {product.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {product.brand}
                      </p>

                      <p className="text-indigo-600 font-bold mt-1">
                        ${product.price}
                      </p>

                      {/* Controls */}
                      <div className="flex items-center gap-4 mt-3">

                        {/* Quantity */}
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() =>
                              dispatch(decreaseQuantityInCart(product.id))
                            }
                            className="px-2 py-1 hover:bg-gray-100"
                          >
                            -
                          </button>

                          <span className="px-3">
                            {item.qunatity}
                          </span>

                          <button
                            onClick={() =>
                              dispatch(addToCart(product))
                            }
                            className="px-2 py-1 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() =>
                            dispatch(removeFormCart(product.id))
                          }
                          className="text-red-500 text-sm hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="bg-white p-5 rounded-lg shadow h-fit">
              <h2 className="text-lg font-semibold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-600 mb-4">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-3">
                <span>Total</span>
                <span className="text-indigo-600">${subtotal}</span>
              </div>

              <button className="w-full mt-5 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                Checkout
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
