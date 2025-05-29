import React, { useState } from 'react';
import { Shield, Sprout, Calendar } from 'lucide-react';

const BeginnerPlants = () => {
  const [isDark, setIsDark] = useState(false);

  const beginnerPlants = [
    {
      name: 'Pothos',
      image: 'https://i.ibb.co/xqwSn4LT/Dracaena-Sansevieria-Trifasciata-Snake-Plant-Tropical-Indoor-Exotic-Variegated-Easy-Houseplant.jpg',
      reason: 'Thrives in low light and forgives watering mistakes'
    },
    {
      name: 'ZZ Plant',
      image: 'https://i.ibb.co/dzTzz2q/monsteradeliciosa1400x1400.webp',
      reason: 'Extremely drought tolerant and low maintenance'
    },
    {
      name: 'Spider Plant',
      image: 'https://i.ibb.co/8g1TQ81d/2048x1365-Rubber-plant-SEOJI250225-Houseplants232-34239b0.jpg',
      reason: 'Fast growing and produces baby plants easily'
    }
  ];

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors duration-300">
        

        <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
                <Shield className="text-green-600 dark:text-green-400" />
                Perfect Plants for Beginners
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Starting your plant journey? These resilient and forgiving plants are perfect for building your confidence and green thumb skills!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {beginnerPlants.map((plant, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl dark:shadow-gray-900/50 dark:hover:shadow-gray-900/70 transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={plant.image} 
                      alt={plant.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <Sprout className="text-green-600 dark:text-green-400" />
                      {plant.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {plant.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
              <div className="text-center">
                <Calendar className="text-4xl text-blue-500 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Start Your Plant Care Journey Today</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                  Ready to become a plant parent? Join our community of plant enthusiasts and start tracking your green friends' care routines. 
                  With our easy-to-use plant care tracker, you'll never miss a watering day again!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                    Add Your First Plant
                  </button>
                  <button className="border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-500 dark:hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                    Browse All Plants
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BeginnerPlants;