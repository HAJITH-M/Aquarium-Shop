  import React from 'react';
  import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

  const FooterSection = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold">Jannani Aquarium & Pets</h2>
              <p className="mt-2 flex items-center justify-center sm:justify-start">
                <FaPhone className="mr-2" />
                <span>99625 03777</span>
              </p>
            </div>
            <div className="text-center sm:text-right">
              <p className="flex flex-col sm:flex-row items-center sm:items-start">
                <FaMapMarkerAlt className="mb-2 sm:mb-0 sm:mt-1 sm:mr-2 flex-shrink-0" />
                <span className="text-center sm:text-left">
                  No: 17, Yesyes Complex, B2, Anna Nedumpathai,<br />
                  Choolaimedu, Chennai - 600094<br />
                  (Opposite Pari Street)
                </span>
              </p>
            </div>
          </div>
          <div className="mt-8 text-center text-xs sm:text-sm">
            <p>© {new Date().getFullYear()} Jannani Aquarium & Pets. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };

  export default FooterSection;
