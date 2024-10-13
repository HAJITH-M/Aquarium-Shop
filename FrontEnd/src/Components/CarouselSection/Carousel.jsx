// "use client"; // Add this line at the top
import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/neon%20tetra.jpg?updatedAt=1728803424118",
    "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/guppy2.jpg?updatedAt=1728803423712",
    "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/10-gal-tank.jpg?updatedAt=1728803424320",
    "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/neon%20tetra.jpg?updatedAt=1728803424118",
    "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/10-gal-tank.jpg?updatedAt=1728803424320",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <div id="default-carousel" className="relative w-full" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96 w-[95%] mx-auto">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            data-carousel-item
          >
            <img src={src} className="w-full h-full object-cover" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
