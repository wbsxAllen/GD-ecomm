import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const items = useSelector((state) => state.cart.items || []);

  return (
    <nav className="bg-[#232f3e] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white mr-2">
                <span role="img" aria-label="shop">🛒</span> E-Shop
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-purple-300 font-medium transition">Home</Link>
            <Link to="/products" className="text-white hover:text-purple-300 font-medium transition">Products</Link>
            <Link to="/about" className="text-white hover:text-purple-300 font-medium transition">About</Link>
            <Link to="/contact" className="text-white hover:text-purple-300 font-medium transition">Contact</Link>
            <Link to="/cart" className="relative text-white hover:text-purple-300 transition">
              <FaShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {items.length}
              </span>
            </Link>
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center text-white hover:text-purple-300">
                  <FaUser className="h-6 w-6" />
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl hidden group-hover:block z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="ml-2 px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-purple-600 hover:to-pink-600 transition flex items-center gap-2">
                <FaUser className="h-4 w-4" /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 