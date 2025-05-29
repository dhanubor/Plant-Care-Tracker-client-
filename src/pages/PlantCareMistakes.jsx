import React, { useState } from 'react';
import { Lightbulb, Thermometer, Sun, AlertTriangle } from 'lucide-react';

const PlantCareMistakes = () => {
  const [isDark, setIsDark] = useState(false);

  const careMistakes = [
    {
      icon: <div className="text-4xl text-blue-500">💧</div>,
      title: 'Overwatering',
      description: 'The most common mistake! Check soil moisture before watering.'
    },
    {
      icon: <Sun className="text-4xl text-yellow-500" />,
      title: 'Wrong Light Exposure',
      description: 'Each plant has unique light requirements. Research your plant\'s needs.'
    },
    {
      icon: <Thermometer className="text-4xl text-red-500" />,
      title: 'Ignoring Temperature',
      description: 'Sudden temperature changes can stress your plants significantly.'
    },
    {
      icon: <AlertTriangle className="text-4xl text-orange-500" />,
      title: 'Ignoring Signs',
      description: 'Yellow leaves, drooping, or spots are your plant\'s way of communicating.'
    }
  ];

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors duration-300">
        

        <section className="py-16 px-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-700">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
                <AlertTriangle className="text-red-500" />
                Top Plant Care Mistakes to Avoid
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Learn from common mistakes that even experienced plant parents make. Avoid these pitfalls to keep your green friends happy and healthy!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {careMistakes.map((mistake, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl dark:shadow-gray-900/50 dark:hover:shadow-gray-900/70 transition-all duration-300 hover:-translate-y-1 text-center border border-gray-100 dark:border-gray-700"
                >
                  <div className="mb-4 flex justify-center">
                    {mistake.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                    {mistake.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {mistake.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 max-w-4xl mx-auto border border-gray-100 dark:border-gray-700">
                <Lightbulb className="text-5xl text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Pro Tip</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  The key to successful plant care is observation and consistency. Spend a few minutes each day checking on your plants,
                  and you'll quickly learn to recognize their needs and patterns. Remember, every plant is unique!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlantCareMistakes;