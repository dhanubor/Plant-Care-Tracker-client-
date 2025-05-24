import React from 'react';
import { FaLightbulb, FaThermometerHalf } from 'react-icons/fa';
import { MdWaterDrop, MdSunny, MdWarning } from 'react-icons/md';

const PlantCareMistakes = () => {
  const careMistakes = [
    {
      icon: <MdWaterDrop className="text-4xl text-blue-500" />,
      title: 'Overwatering',
      description: 'The most common mistake! Check soil moisture before watering.'
    },
    {
      icon: <MdSunny className="text-4xl text-yellow-500" />,
      title: 'Wrong Light Exposure',
      description: 'Each plant has unique light requirements. Research your plant\'s needs.'
    },
    {
      icon: <FaThermometerHalf className="text-4xl text-red-500" />,
      title: 'Ignoring Temperature',
      description: 'Sudden temperature changes can stress your plants significantly.'
    },
    {
      icon: <MdWarning className="text-4xl text-orange-500" />,
      title: 'Ignoring Signs',
      description: 'Yellow leaves, drooping, or spots are your plant\'s way of communicating.'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <MdWarning className="text-red-500" />
            Top Plant Care Mistakes to Avoid
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn from common mistakes that even experienced plant parents make. Avoid these pitfalls to keep your green friends happy and healthy!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {careMistakes.map((mistake, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="mb-4 flex justify-center">
                {mistake.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {mistake.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {mistake.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <FaLightbulb className="text-5xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Pro Tip</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              The key to successful plant care is observation and consistency. Spend a few minutes each day checking on your plants, 
              and you'll quickly learn to recognize their needs and patterns. Remember, every plant is unique!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlantCareMistakes;