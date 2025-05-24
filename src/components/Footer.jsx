import React from 'react';
import { NavLink } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-green-800 dark:bg-gray-900 text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Website Info Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-100">MangoCare Tracker</h3>
            <p className="text-green-200 dark:text-gray-300 mb-4">
              Your ultimate companion for managing and nurturing your mango plants. Track care schedules, monitor health, and grow beautiful mangoes with ease.
            </p>
            <div className="flex items-center space-x-2 text-green-200 dark:text-gray-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Trusted by 10,000+ plant enthusiasts</span>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="font-bold mb-4 text-green-100">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/" 
                  className="text-green-200 dark:text-gray-300 hover:text-white dark:hover:text-green-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/plants" 
                  className="text-green-200 dark:text-gray-300 hover:text-white dark:hover:text-green-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>All Plants</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/add-plant" 
                  className="text-green-200 dark:text-gray-300 hover:text-white dark:hover:text-green-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span>Add Plant</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/my-Plants" 
                  className="text-green-200 dark:text-gray-300 hover:text-white dark:hover:text-green-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>My Plants</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Plant Care Resources Section */}
          <div>
            <h4 className="font-bold mb-4 text-green-100">Plant Care Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-200 dark:text-gray-300 hover:text-white dark:hover:text-green-400 transition-colors duration-200 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Mango Care Guide</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 dark:text-gray-300 hover:text-white dark:hover:text-green-400 transition-colors duration-200 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>Plant Disease Guide</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 dark:text-gray-300 hover:text-white dark:hover:text-green-400 transition-colors duration-200 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>Watering Schedule</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 dark:text-gray-300 hover:text-white dark:hover:text-green-400 transition-colors duration-200 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.414 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  <span>Growth Tracking Tips</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social Section */}
          <div>
            <h4 className="font-bold mb-4 text-green-100">Get In Touch</h4>
            <ul className="space-y-3 text-green-200 dark:text-gray-300 mb-6">
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-sm">+880 1234-567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-sm">support@mangocare.com</span>
              </li>
            </ul>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-green-200 dark:text-gray-300 hover:text-white dark:hover:text-green-400 transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-green-200 dark:text-gray-300 hover:text-white dark:hover:text-green-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-green-200 dark:text-gray-300 hover:text-white dark:hover:text-green-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348C10.797 15.937 9.746 16.988 8.449 16.988zM12.017 7.062c2.74 0 4.95 2.211 4.95 4.95c0 2.74-2.211 4.95-4.95 4.95c-2.74 0-4.95-2.211-4.95-4.95C7.067 9.272 9.278 7.062 12.017 7.062zM15.585 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348C17.933 15.937 16.882 16.988 15.585 16.988z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-green-200 dark:text-gray-300 hover:text-white dark:hover:text-green-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-green-700 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-green-200 dark:text-gray-300 text-sm">
                &copy; 2024 MangoCare Tracker. All rights reserved.
              </p>
              <p className="text-green-300 dark:text-gray-400 text-xs mt-1">
                Made with 🌱 for plant lovers everywhere
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-green-200 dark:text-gray-300 hover:text-white dark:hover:text-green-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-green-200 dark:text-gray-300 hover:text-white dark:hover:text-green-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-green-200 dark:text-gray-300 hover:text-white dark:hover:text-green-400 transition-colors duration-200">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;