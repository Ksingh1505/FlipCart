import React, { useContext } from "react";
import SearchBar from "./Searchbar";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Store/ThemeProvider";


const Navbar = ({ hideSearchBar = false }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const light =
    "flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg sticky top-0 z-50 transition-all duration-300";

  const dark =
    "flex items-center justify-between px-8 py-4 bg-gradient-to-r from-gray-900 to-black shadow-lg sticky top-0 z-50 transition-all duration-300";

  return (
    <div className={theme === "light" ? light : dark}>
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-wide text-white hover:scale-105 transition-transform"
      >
        Flip<span className="text-yellow-300">Cart</span>
      </Link>

      {/* Search Bar */}
      {!hideSearchBar && (
        <div className="flex-1 mx-6">
          <SearchBar />
        </div>
      )}

      {/* Menu */}

      <div className="flex items-center gap-6 text-white font-medium">
        <button>Home</button>
        <button>Login</button>


        {/* Theme Toggle and Cart */}


        {/* Toggal */}
        <div
          onClick={() =>
            theme === "light" ? setTheme("dark") : setTheme("light")
          }
          className="cursor-pointer"
        >
          <input
            type="checkbox"
            checked={theme === "light"}
            className="toggle border-indigo-600 bg-indigo-500 checked:border-yellow-400 checked:bg-yellow-300"
          />
        </div>

        {/* Cart */}
        <Link to={`/wishlist`}>Wishlist</Link>
        <Link to={`/cart`}>Cart</Link>
      </div>
    </div>


  );
};

export default Navbar;