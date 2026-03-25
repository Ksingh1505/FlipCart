import React, { useEffect, useRef, useState } from "react";
import image1 from "../Assets/image1.webp";
import image2 from "../Assets/image2.webp";
import image3 from "../Assets/image3.webp";
import image4 from "../Assets/image4.webp";

import ChevronLeft from "../Icons/ChevronLeft";
import ChevronRight from "../Icons/ChevronRight";
import { useNavigate } from "react-router-dom";

const images = [
  { image: image1, url: "beauty" },
  { image: image2, url: "fragrances" },
  { image: image3, url: "furniture" },
  { image: image4, url: "groceries" },
];

const Carousal = () => {

  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const addTimer = () => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);
  };

  useEffect(() => {
    addTimer();
    return () => clearTimer();
  }, []);

  const handleLeft = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleRight = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handleClick = () => {
    navigate(`/category/${images[activeIndex].url}`);
  };

  const handleMouseEnter = () => {
    clearTimer();
  };

  const handleMouseLeave = () => {
    addTimer();
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h-[50vh] w-full relative cursor-pointer overflow-hidden"
    >


      
      <button
        onClick={handleLeft}
        className="absolute left-4 top-1/2 -translate-y-1/2 
    bg-white/80 hover:bg-white shadow-lg 
    h-10 w-10 rounded-full flex items-center justify-center z-10"
      >
        <ChevronLeft />
      </button>

      
      <button
        onClick={handleRight}
        className="absolute right-4 top-1/2 -translate-y-1/2 
    bg-white/80 hover:bg-white shadow-lg 
    h-10 w-10 rounded-full flex items-center justify-center z-10"
      >
        <ChevronRight />
      </button>

    
      <div className="h-full w-full">
        <img
          src={images[activeIndex].image}
          alt="banner"
          className="h-full w-full object-cover"

        />
      </div>

    
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(index);
            }}
            className={`h-3 w-3 rounded-full cursor-pointer ${index === activeIndex ? "bg-white" : "bg-white/50"
              }`}
          ></div>
        ))}
      </div>

    </div>
  );
};

export default Carousal;
