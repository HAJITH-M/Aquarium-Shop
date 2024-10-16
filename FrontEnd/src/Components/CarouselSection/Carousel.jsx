// "use client"; // Add this line at the top
import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/Carousal-Images/fish-aquarium-hd-8k-wallpaper-stock-photographic-image_979520-12123.jpg",
    "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/Carousal-Images/R.9ca8ca6285b2a3913d850c47f1a68369_rik=L2j69QDfKUjk1Q&riu=http_3a_2f_2fwww.pixelstalk.net_2fwp-content_2fuploads_2f2016_2f11_2fFree-Fish-Tank-Screensavers-Aquarium.jpg&ehk=A6ojUYkVr7Che9HqZxKQeVvQbvW4Wgw3xGekv63Bq00_3d&risl=&pid=ImgRaw&r=0?updatedAt=1729070015594",
    "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/Carousal-Images/sea-water-aquarium-captures-caral-tropical-fishes_505557-5668.jpg",
    "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/Carousal-Images/R.da0d33d679b395c2c87cc2116227697a_rik=Yngy8aPaFS44xQ&riu=http_3a_2f_2fperfectaquatics.com_2fcdn_2fshop_2farticles_2fAquarium_543275b5-bc77-4640-8c42-25347dcb17e5.jpg_3fv_3d1703138110&ehk=pjI0FVN445Ged2FHlJ1046l12qkHaMPxi9n_2fr8h0VmM_3d&risl=&pid=ImgRaw&r=0",
    // "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/Carousal-Images/OIP.-DQN6nUHJ_OjeTY5hes_xAHaFj_rs=1&pid=ImgDetMain?updatedAt=1729070138200",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <div id="default-carousel" className="relative w-full my-10" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-[300px] overflow-hidden rounded-lg w-[95%] md:h-[550px] md:w-[85%] mx-auto">
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
