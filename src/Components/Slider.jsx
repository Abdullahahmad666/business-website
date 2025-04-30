import React, { useState, useEffect } from "react";
import "./Slider.css";

const images = [
  "/asuppal/www.png",
  "/asuppal/hehe.png",
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Autoplay every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5000ms = 5s

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]);

  return (
    <div className="slider">
      <button className="slider-btn left" onClick={prevSlide}>
        &#10094;
      </button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slide-img" />
      <button className="slider-btn right" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
