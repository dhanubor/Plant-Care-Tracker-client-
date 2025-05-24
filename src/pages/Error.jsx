import React from 'react'
import { Link, useRouteError } from 'react-router';

import { Helmet } from 'react-helmet';


const Error = () => {
  const error = useRouteError();
  console.error(error);

  const errorType = error.status === 404 ? '404' : '500';
  const titles = {
    '404': 'Page Not Found',
    '500': 'Server Error'
  };
  const descriptions = {
    '404': 'The page you are looking for might have been removed, had its name changed or is temporarily unavailable.',
    '500': 'Something went wrong on our servers while processing your request.'
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 text-white">
      <Helmet>
        <title>{titles[errorType]} | Our Platform</title>
        <meta name="description" content={descriptions[errorType]} />
      </Helmet>

      <div className="max-w-2xl w-full text-center">
        {/* Animated 404/500 */}
        <div className="relative mb-12">
          <div className="text-9xl font-bold text-indigo-400 opacity-20 select-none">
            {errorType}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-64 h-64 text-indigo-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {errorType === '404' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              )}
            </svg>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {titles[errorType]}
        </h1>
        
        <p className="text-xl text-gray-300 mb-10 max-w-lg mx-auto">
          {descriptions[errorType]}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link
            to="/"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Additional Help Section */}
        <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-indigo-400">
            Need more help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <h3 className="font-medium mb-2">Contact Support</h3>
              <p className="text-gray-400">
                Our team is available 24/7 to help you.
              </p>
              <a
                href="mailto:joydhanu@gmail.com"
                className="text-indigo-400 hover:underline inline-block mt-2"
              >
                joydhanu@gmail.com
              </a>
            </div>
            <div>
              <h3 className="font-medium mb-2">Report Issue</h3>
              <p className="text-gray-400">
                Help us improve by reporting this problem.
              </p>
              <a
                href="https://github.com/yourrepo/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline inline-block mt-2"
              >
                Report on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Your Platform Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Error