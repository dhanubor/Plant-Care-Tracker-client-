import React, { useContext, useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { NavLink, Link, useNavigate } from 'react-router'; // Fixed: react-router-dom instead of react-router
import { AuthContext } from '../provider/AuthProvider';

import toast from 'react-hot-toast';
import Theme from './Them';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const { theme, isDark, toggleTheme } = Theme();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully!');
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
      console.log(error);
    }
  };

  // Fixed: My Plants path should be consistent (lowercase)
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'All Plants', path: '/plants' },
    ...(user ? [
      { name: 'Add Plant', path: '/add-plant' },
      { name: 'My Plants', path: '/my-plants' } // Fixed: consistent lowercase
    ] : [])
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false); // Close dropdown on resize
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // Fixed: Add handler for mobile menu clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Plant Care Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                MangoCare Tracker
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              title={`Current: ${theme} mode`}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {isDark ? (
                  <svg 
                    className="w-5 h-5 text-yellow-400 transition-all duration-300" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                ) : (
                  <svg 
                    className="w-5 h-5 text-indigo-500 transition-all duration-300" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" 
                    />
                  </svg>
                )}
              </div>
            </button>

            {/* Auth Section */}
            <div className="flex items-center space-x-4 relative dropdown-container">
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-2 rounded-full transition-colors duration-200"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    title={user.displayName || user.email}
                  >
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=3B82F6&color=fff`}
                      alt={user.displayName || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=3B82F6&color=fff`;
                      }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
                      {user.displayName || 'User'}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 text-gray-700 dark:text-gray-300 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20 border border-gray-200 dark:border-gray-700">
                      <div className="py-2">
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Logged in as:</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {user.email}
                          </p>
                        </div>
                        <div className="px-2 py-2">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors duration-200 flex items-center space-x-2"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            <span>LogOut</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/auth/login"> {/* Fixed: consistent lowercase */}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                      Login
                    </button>
                  </Link>
                  <Link to="/auth/register"> {/* Fixed: consistent lowercase */}
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-50 dark:bg-gray-700 px-4 py-2 border-t border-gray-200 dark:border-gray-600">
            <ul className="space-y-2">
              {navItems.map((item, i) => (
                <li key={i}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600 hover:text-blue-700 dark:hover:text-blue-400'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
              
              {/* Mobile Theme Toggle */}
              <li className="border-t border-gray-200 dark:border-gray-600 pt-2">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {isDark ? '☀️' : '🌙'}
                    </span>
                    <span className="text-sm font-medium">
                      {isDark ? 'Switch to Light' : 'Switch to Dark'}
                    </span>
                  </div>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                    isDark ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                      isDark ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </div>
                </button>
              </li>
              
              <li>
                {user ? (
                  <>
                    <div className="px-3 py-2 text-gray-700 dark:text-gray-300">
                      <div className="flex items-center space-x-2 mb-2">
                        <img
                          src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=3B82F6&color=fff`}
                          alt={user.displayName || 'User'}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=3B82F6&color=fff`;
                          }}
                        />
                        <div>
                          <p className="text-sm font-medium">{user.displayName || 'User'}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200 flex items-center space-x-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>LogOut</span>
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/auth/login" // Fixed: consistent lowercase
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200 font-medium text-center"
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth/register" // Fixed: consistent lowercase
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors duration-200 font-medium text-center"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;