import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const timerId = useRef(null);

  async function getData() {
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery.length === 0) {
      setSearchSuggestion([]);
      return;
    }

    const apiData = await fetch(
      `https://dummyjson.com/products/search?q=${trimmedQuery}`
    );
    const jsonData = await apiData.json();
    setSearchSuggestion(jsonData.products);
  }

  useEffect(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(getData, 400);

    return () => clearTimeout(timerId.current);
  }, [searchQuery]);

  const showSearchSuggestion =
    searchQuery.trim().length > 0 && searchSuggestion.length > 0;

  return (
    <div className="relative w-62 h-10 z-20">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-white w-full h-full rounded-2xl focus:outline-none px-5"
      />

      {showSearchSuggestion && (
        <div className="absolute top-11 left-0 w-full bg-white rounded-xl border border-gray-200 p-2 shadow">
          {searchSuggestion.map((pObj) => (
            <Link
              key={pObj.id}
              to={`/products/${pObj.id}`}
              className="block bg-gray-100 mb-1 p-2 rounded-xl hover:bg-gray-200"
            >
              <p className="text-sm text-gray-600">{pObj.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;