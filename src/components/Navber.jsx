import React, { useContext, useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { NavLink, Link, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

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

  const toggleTheme = () => {
    setIsDark(!isDark);
    // You can add localStorage to persist theme preference
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  // Load theme preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Updated navigation items according to requirements
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'All Plants', path: '/plants' },
    ...(user ? [
      { name: 'Add Plant', path: '/add-plant' },
      { name: 'My Plants', path: '/my-Plants' }
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

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Plant Care Logo" className="h-10" />
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

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Auth Section - Updated according to requirements */}
            <div className="flex items-center space-x-4 relative dropdown-container">
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-2 rounded-full transition-colors duration-200"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    title={user.displayName || user.email} // Display name on hover
                  >
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=3B82F6&color=fff`}
                      alt={user.displayName || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=3B82F6&color=fff`;
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
                        {/* <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Balance:</span>
                            <span className="text-lg font-bold text-green-600 dark:text-green-400">
                              ৳{amount.toLocaleString()}
                            </span>
                          </div>
                        </div> */}
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
                // When user is not logged in, show Login and Register buttons
                <div className="flex items-center space-x-2">
                  <Link to="/Auth/login">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                      Login
                    </button>
                  </Link>
                  <Link to="/Auth/register">
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
              <li className="border-t border-gray-200 dark:border-gray-600 pt-2">
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
                >
                  <span>{isDark ? '☀️' : '🌙'}</span>
                  <span className="text-sm">
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </button>
              </li>
              <li>
                {user ? (
                  <>
                    <div className="px-3 py-2 text-gray-700 dark:text-gray-300">
                      <div className="flex items-center space-x-2 mb-2">
                        <img
                          src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=3B82F6&color=fff`}
                          alt={user.displayName || 'User'}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=3B82F6&color=fff`;
                          }}
                        />
                        <div>
                          <p className="text-sm font-medium">{user.displayName || 'User'}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-green-600 dark:text-green-400">
                        Balance: ৳{amount.toLocaleString()}
                      </p>
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
                  // Mobile auth buttons for non-logged in users
                  <div className="space-y-2">
                    <Link
                      to="/Auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200 font-medium text-center"
                    >
                      Login
                    </Link>
                    <Link
                      to="/Auth/register"
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