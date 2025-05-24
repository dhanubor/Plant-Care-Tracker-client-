import React from 'react';
import { FaShieldAlt, FaSeedling, FaCalendarAlt } from 'react-icons/fa';

const BeginnerPlants = () => {
  const beginnerPlants = [
    {
      name: 'Pothos',
      image: 'https://images.unsplash.com/photo-1586093248292-d3fb0c4b86bb?w=300',
      reason: 'Thrives in low light and forgives watering mistakes'
    },
    {
      name: 'ZZ Plant',
      image: 'https://images.unsplash.com/photo-1583408724292-1bfbd72f2c86?w=300',
      reason: 'Extremely drought tolerant and low maintenance'
    },
    {
      name: 'Spider Plant',
      image: 'https://images.unsplash.com/photo-1597166545654-5e7c4b3d1fb4?w=300',
      reason: 'Fast growing and produces baby plants easily'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <FaShieldAlt className="text-green-600" />
            Perfect Plants for Beginners
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Starting your plant journey? These resilient and forgiving plants are perfect for building your confidence and green thumb skills!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {beginnerPlants.map((plant, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img 
                  src={plant.image} 
                  alt={plant.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FaSeedling className="text-green-600" />
                  {plant.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {plant.reason}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <FaCalendarAlt className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Start Your Plant Care Journey Today</h3>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              Ready to become a plant parent? Join our community of plant enthusiasts and start tracking your green friends' care routines. 
              With our easy-to-use plant care tracker, you'll never miss a watering day again!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Add Your First Plant
              </button>
              <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Browse All Plants
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeginnerPlants;