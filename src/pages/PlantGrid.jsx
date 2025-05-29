import React, { useState, useEffect } from 'react';
import { FaEye, FaLeaf, FaTint, FaHeart, FaSeedling } from 'react-icons/fa';
import { Link } from 'react-router';

import Swal from 'sweetalert2';
import Lodding from '../components/Lodding';

const PlantGrid = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real API call to fetch latest 6 plants
  useEffect(() => {
    const fetchLatestPlants = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://mango-care-tracker-server.vercel.app/plants?limit=6');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Additional safety check to ensure maximum 6 plants
        const limitedPlants = Array.isArray(data) ? data.slice(0, 6) : [];
        setPlants(limitedPlants);
      } catch (error) {
        console.error('Error fetching plants:', error);
        
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load plants. Please try again later.',
          icon: 'error',
          confirmButtonColor: '#10b981'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPlants();
  }, []);

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'succulent': return <FaSeedling className="text-green-600" />;
      case 'tropical': return <FaLeaf className="text-green-700" />;
      case 'fern': return <FaLeaf className="text-emerald-600" />;
      case 'flowering': return <FaHeart className="text-pink-600" />;
      default: return <FaLeaf className="text-green-600" />;
    }
  };

  const getCareColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': 
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'hard':
      case 'difficult': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'healthy':
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
          <FaSeedling className="text-green-600" />
          Latest Plant Additions
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the newest additions to our plant community. These beautiful plants are waiting for their perfect caretaker!
        </p>
      </div>

      {loading ? (
        <Lodding/>
      ) : plants.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No plants found</h3>
          <p className="text-gray-500 mb-4">No plants have been added yet.</p>
          <Link 
            to="/addPlant" 
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
          >
            Add First Plant
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plants.map((plant) => (
              <div key={plant._id} className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <figure className="relative h-64 overflow-hidden rounded-t-lg">
                  {plant.image ? (
                    <img 
                      src={plant.image} 
                      alt={plant.plantName}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-4xl">🌱</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full">
                    {getCategoryIcon(plant.category)}
                  </div>
                </figure>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {plant.plantName}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {plant.description || `Beautiful ${plant.category} plant perfect for your collection.`}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Care Level:</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getCareColor(plant.careLevel)}`}>
                        {plant.careLevel}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <FaTint className="text-blue-500" />
                        Watering:
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {plant.wateringFrequency}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Health Status:</span>
                      <span className={`text-sm font-semibold capitalize ${getHealthColor(plant.healthStatus)}`}>
                        {plant.healthStatus}
                      </span>
                    </div>

                    {plant.userName && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Owner:</span>
                        <span className="text-sm font-medium text-gray-700">
                          {plant.userName}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <Link 
                      to={`/plantDetails/${plant._id}`}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 mx-auto w-fit"
                    >
                      <FaEye />
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Show "View All Plants" button if there are plants */}
          <div className="text-center mt-12">
            <Link 
              to="/plants" 
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaLeaf className="mr-2" />
              View All Plants
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default PlantGrid;