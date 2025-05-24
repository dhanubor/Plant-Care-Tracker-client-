import React from 'react';
import { useLoaderData, Link, useNavigate } from 'react-router';

const PlantDetails = () => {
  const plant = useLoaderData();
  const navigate = useNavigate();

  if (!plant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Plant Not Found</h2>
          <p className="text-gray-600 mb-6">The plant you're looking for doesn't exist.</p>
          <Link 
            to="/plants" 
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            ← Back to Plants
          </Link>
        </div>
      </div>
    );
  }

  const getHealthStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCareStatusColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Plants
          </button>
          
          <div className="flex space-x-3">
            {/* <Link
              to={`/updatePlant/${plant._id}`}
              className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
            >
              ✏️ Edit Plant
            </Link> */}
          </div>
        </div>

        {/* Main Plant Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-80 bg-gradient-to-r from-green-400 to-blue-500">
            {plant.image ? (
              <img
                src={plant.image}
                alt={plant.plantName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-white">
                  <div className="text-8xl mb-4">🌱</div>
                  <p className="text-xl font-medium">No Image Available</p>
                </div>
              </div>
            )}
            
            {/* Overlay with plant name */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
              <h1 className="text-4xl font-bold text-white mb-2">{plant.plantName}</h1>
              <div className="flex items-center space-x-4 text-white/90">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur">
                  📂 {plant.category}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur">
                  👤 {plant.userName}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Status Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Health Status */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">💚</div>
                <h3 className="font-semibold text-gray-700 mb-2">Health Status</h3>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getHealthStatusColor(plant.healthStatus)}`}>
                  {plant.healthStatus}
                </span>
              </div>

              {/* Care Level */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold text-gray-700 mb-2">Care Level</h3>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getCareStatusColor(plant.careLevel)}`}>
                  {plant.careLevel}
                </span>
              </div>

              {/* Watering */}
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">💧</div>
                <h3 className="font-semibold text-gray-700 mb-2">Watering</h3>
                <p className="text-sm font-medium text-gray-600">{plant.wateringFrequency}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Plant Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Plant Information</h2>
                
                <div className="space-y-4">
                  {/* Basic Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Plant Name:</span>
                        <p className="text-gray-900 font-semibold">{plant.plantName}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Category:</span>
                        <p className="text-gray-900 font-semibold">{plant.category}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Owner:</span>
                        <p className="text-gray-900 font-semibold">{plant.userName}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Email:</span>
                        <p className="text-gray-900 font-semibold">{plant.userEmail}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {plant.description && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                      <p className="text-gray-600 leading-relaxed">{plant.description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Care Schedule */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Care Schedule</h2>
                
                <div className="space-y-4">
                  {/* Watering Schedule */}
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">💧</span>
                      <h3 className="font-semibold text-gray-700">Watering Schedule</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Frequency:</span>
                        <span className="text-gray-900 font-semibold">{plant.wateringFrequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Last Watered:</span>
                        <span className="text-gray-900 font-semibold">{plant.lastWateredDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Next Watering:</span>
                        <span className="text-green-600 font-bold">{plant.nextWateringDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Plant Stats */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">📊</span>
                      <h3 className="font-semibold text-gray-700">Plant Stats</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">Health Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getHealthStatusColor(plant.healthStatus)}`}>
                          {plant.healthStatus}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">Care Level:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCareStatusColor(plant.careLevel)}`}>
                          {plant.careLevel}
                        </span>
                      </div>
                      {plant.plantAge && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">Plant Age:</span>
                          <span className="text-gray-900 font-semibold">{plant.plantAge}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Care Notes */}
                  {plant.careNotes && (
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">📝</span>
                        <h3 className="font-semibold text-gray-700">Care Notes</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{plant.careNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Link
                to={`/updatePlant/${plant._id}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors"
              >
                ✏️ Edit Plant Details
              </Link> */}
              <Link
                to="/plants"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                🌱 View All Plants
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;