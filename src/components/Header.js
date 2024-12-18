import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-800">
            Justin Guo
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-600 hover:text-blue-600 transition duration-300">
              Home
            </a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition duration-300">
              About
            </a>
            <a href="#projects" className="text-gray-600 hover:text-blue-600 transition duration-300">
              Projects
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition duration-300">
              Contact
            </a>
          </div>

          {/* Mobile menu button - you can add mobile menu functionality later */}
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header; 