import React, { useState, useEffect } from 'react';

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [customDays, setCustomDays] = useState(5);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Helper functions to replace date-fns
  const formatDate = (date, format) => {
    const options = {
      'yyyy-MM-dd': { year: 'numeric', month: '2-digit', day: '2-digit' },
      'HH:mm:ss': { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false },
      'dd/MM/yyyy': { day: '2-digit', month: '2-digit', year: 'numeric' }
    };
    
    if (format === 'yyyy-MM-dd') {
      return date.toISOString().split('T')[0];
    } else if (format === 'HH:mm:ss') {
      return date.toLocaleTimeString('en-GB', { hour12: false });
    } else if (format === 'EEEE') {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    } else if (format === 'EEEE, MMMM do, yyyy') {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } else if (format === 'dd/MM/yyyy') {
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
    return date.toLocaleDateString();
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const addWeeks = (date, weeks) => {
    return addDays(date, weeks * 7);
  };

  const addMonths = (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  const isFuture = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate > today;
  };

  const handleAddDays = (days) => {
    setSelectedDate(addDays(selectedDate, days));
  };

  const handleSubtractDays = (days) => {
    setSelectedDate(addDays(selectedDate, -days));
  };

  const handleAddWeeks = (weeks) => {
    setSelectedDate(addWeeks(selectedDate, weeks));
  };

  const handleSubtractWeeks = (weeks) => {
    setSelectedDate(addWeeks(selectedDate, -weeks));
  };

  const handleAddMonths = (months) => {
    setSelectedDate(addMonths(selectedDate, months));
  };

  const handleSubtractMonths = (months) => {
    setSelectedDate(addMonths(selectedDate, -months));
  };

  const resetToToday = () => {
    setSelectedDate(new Date());
  };

  const getDateStatus = (date) => {
    if (isToday(date)) return { text: 'Today', color: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900' };
    if (isPast(date)) return { text: 'Past', color: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900' };
    if (isFuture(date)) return { text: 'Future', color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900' };
    return { text: 'Unknown', color: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700' };
  };

  const dateStatus = getDateStatus(selectedDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-4xl text-indigo-600 dark:text-indigo-400">🕐</div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Time Manipulation Center</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Explore dates and time with powerful date functions</p>
        </div>

        {/* Current Time Display */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border-l-4 border-indigo-500 dark:border-indigo-400">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl text-indigo-600 dark:text-indigo-400">🕐</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Current Time</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Date</p>
              <p className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
                {formatDate(currentTime, 'yyyy-MM-dd')}
              </p>
            </div>
            <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Time</p>
              <p className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
                {formatDate(currentTime, 'HH:mm:ss')}
              </p>
            </div>
            <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Day</p>
              <p className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
                {formatDate(currentTime, 'EEEE')}
              </p>
            </div>
          </div>
        </div>

        {/* Selected Date Display */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border-l-4 border-green-500 dark:border-green-400">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl text-green-600 dark:text-green-400">📅</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Selected Date</h2>
          </div>
          <div className="text-center mb-4">
            <p className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {formatDate(selectedDate, 'EEEE, MMMM do, yyyy')}
            </p>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${dateStatus.color}`}>
              {dateStatus.text}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Formatted Date</p>
              <p className="text-lg font-bold text-green-700 dark:text-green-300">
                {formatDate(selectedDate, 'dd/MM/yyyy')}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">ISO Format</p>
              <p className="text-lg font-bold text-green-700 dark:text-green-300">
                {formatDate(selectedDate, 'yyyy-MM-dd')}
              </p>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Days Control */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <div className="text-blue-600 dark:text-blue-400">✅</div>
              Days Control
            </h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleSubtractDays(1)}
                  className="flex-1 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  ➖ -1 Day
                </button>
                <button
                  onClick={() => handleAddDays(1)}
                  className="flex-1 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  ➕ +1 Day
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSubtractDays(7)}
                  className="flex-1 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                >
                  -7 Days
                </button>
                <button
                  onClick={() => handleAddDays(7)}
                  className="flex-1 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                >
                  +7 Days
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={customDays}
                  onChange={(e) => setCustomDays(parseInt(e.target.value) || 0)}
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-center"
                  min="1"
                  max="365"
                />
                <button
                  onClick={() => handleSubtractDays(customDays)}
                  className="flex-1 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                >
                  -{customDays} Days
                </button>
                <button
                  onClick={() => handleAddDays(customDays)}
                  className="flex-1 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                >
                  +{customDays} Days
                </button>
              </div>
            </div>
          </div>

          {/* Weeks & Months Control */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <div className="text-purple-600 dark:text-purple-400">📆</div>
              Weeks & Months
            </h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleSubtractWeeks(1)}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                >
                  -1 Week
                </button>
                <button
                  onClick={() => handleAddWeeks(1)}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                >
                  +1 Week
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSubtractMonths(1)}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                >
                  -1 Month
                </button>
                <button
                  onClick={() => handleAddMonths(1)}
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                >
                  +1 Month
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSubtractMonths(6)}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                >
                  -6 Months
                </button>
                <button
                  onClick={() => handleAddMonths(6)}
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                >
                  +6 Months
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center mb-8">
          <button
            onClick={resetToToday}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 text-white py-3 px-8 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Reset to Today
          </button>
        </div>

        {/* Navigation */}
        {/* <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
          >
            <div>🏠</div>
            Go Back Home
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Time;