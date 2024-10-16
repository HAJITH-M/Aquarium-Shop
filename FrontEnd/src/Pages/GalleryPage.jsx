  import React, { useEffect, useState } from 'react';
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  const GalleryPage = () => {
      const [categories, setCategories] = useState([]);
      const [fishDetails, setFishDetails] = useState({});
      const [loading, setLoading] = useState(true);

      const fetchFishDetails = async () => {
          try {
              const response = await fetch('https://aquarium-shop-ltwi.onrender.com/fish');
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json();
              const groupedFish = {};
              data.forEach(fish => {
                  if (!groupedFish[fish.categoryId]) {
                      groupedFish[fish.categoryId] = [];
                  }
                  groupedFish[fish.categoryId].push(fish);
              });
              setFishDetails(groupedFish);
          } catch (error) {
              console.error('Error fetching fish details:', error.message);
          }
      };

      const fetchCategories = async () => {
          try {
              const response = await fetch('https://aquarium-shop-ltwi.onrender.com/categories');
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json();
              setCategories(data);
          } catch (error) {
              console.error('Error fetching categories:', error.message);
          }
      };

      useEffect(() => {
          const fetchData = async () => {
              setLoading(true);
              await Promise.all([fetchCategories(), fetchFishDetails()]);
              setLoading(false);
          };
          fetchData();
      }, []);

      const SkeletonLoader = () => (
          <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {[...Array(5)].map((_, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4 shadow-md">
                          <div className="w-full h-48 bg-gray-300"></div>
                          <div className="p-4">
                              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      );

      return (
          <div className="px-2 py-10 md:px-8 mx-auto">
              <h1 className="text-3xl font-bold mb-6">Fish Gallery</h1>
              <ToastContainer />
              {loading ? (
                  [...Array(3)].map((_, index) => <SkeletonLoader key={index} />)
              ) : (
                  categories.map(category => (
                      <div key={category.id} className="mb-6">
                          <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                              {fishDetails[category.id]?.map((fish) => (
                                  <div key={fish.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4 shadow-md">
                                      <img src={fish.image} alt={fish.title} className="w-full h-48 object-cover" />
                                      <div className="p-4">
                                          <h3 className="text-lg font-semibold mb-2">{fish.title}</h3>
                                          <span className="text-xl font-extrabold text-gray-900">₹{fish.price.toFixed(2)}</span>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))
              )}
          </div>
      );
  };

  export default GalleryPage;