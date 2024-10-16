import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const userEmail = localStorage.getItem('userEmail');
  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : '';
  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('cartItems');
    window.location.href = '/';
  };

  const isActive = (path) => activePath === path;

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex sm:hidden">
            <button onClick={toggleMobileMenu} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-12 w-20" src="https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/1729080067264.png?updatedAt=1729080147041" alt="Your Company" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to="/" className={`nav-item rounded-md px-3 py-2 text-sm font-medium ${isActive('/') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>Home</Link>
                <Link to="/gallery" className={`nav-item rounded-md px-3 py-2 text-sm font-medium ${isActive('/gallery') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>Gallery</Link>
                <Link to="/userorder" className={`nav-item rounded-md px-3 py-2 text-sm font-medium ${isActive('/userorder') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>Orders</Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex gap-5 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link to="/cart" className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-100">
              <FaShoppingCart className="h-8 w-8 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {userEmail ? (
              <div className="relative flex items-center mr-4">
                <div
                  className="bg-gray-200 text-gray-900 rounded-full flex items-center justify-center h-8 w-8 font-bold cursor-pointer"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  {userInitial}
                </div>
                {isDropdownOpen && (
                  <div className="absolute top-11 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className={`text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium ${isActive('/login') ? 'bg-gray-100 text-gray-900' : ''}`}>Login</Link>
            )}
          </div>
        </div>
      </div>

      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link to="/" className={`nav-item block rounded-md px-3 py-2 text-base font-medium ${isActive('/') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>Home</Link>
          <Link to="/gallery" className={`nav-item block rounded-md px-3 py-2 text-base font-medium ${isActive('/gallery') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>Gallery</Link>
          <Link to="/userorder" className={`nav-item block rounded-md px-3 py-2 text-base font-medium ${isActive('/userorder') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>Orders</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;