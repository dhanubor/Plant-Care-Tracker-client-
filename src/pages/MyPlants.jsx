import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router';

import Swal from 'sweetalert2';
import { AuthContext } from './../provider/AuthProvider';

const MyPlants = () => {
  const { user } = useContext(AuthContext);
  const Navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Unique categories for filtering (from user's plants only)
  const categories = ['all', ...new Set(plants.map(plant => plant.category))];

  // Fetch user's plants
  useEffect(() => {
    if (user?.email) {
      fetchUserPlants();
    }
  }, [user]);

  const fetchUserPlants = async () => {
    try {
      setLoading(true);
      // Fetch all plants and filter by user email
      const response = await fetch('http://localhost:3000/plants');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const allPlants = await response.json();
      
      // Filter plants by current user's email
      const userPlants = allPlants.filter(plant => 
        plant.userEmail === user.email || plant.userName === user.email
      );
      
      setPlants(userPlants);
    } catch (error) {
      console.error('Error fetching plants:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load your plants. Please try again.",
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter plants by category
  const filteredPlants = selectedCategory === 'all' 
    ? plants 
    : plants.filter(plant => plant.category === selectedCategory);

  // Delete handler
  const handleDelete = (_id) => {
    console.log('Deleting plant with ID:', _id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Start deleting the plant
        fetch(`http://localhost:3000/plants/${_id}`, {
          method: 'DELETE'
        })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          if (data.deletedCount && data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your plant has been deleted successfully.",
              icon: "success"
            });

            // Remove the plant from the state
            const remainingPlants = plants.filter(plant => plant._id !== _id);
            setPlants(remainingPlants);
          } else {
            throw new Error('Plant not found or already deleted');
          }
        })
        .catch(error => {
          console.error('Delete error:', error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the plant. Please try again.",
            icon: "error"
          });
        });
      }
    });
  };

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to view your plants.</p>
          <Link 
            to="/login" 
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your plants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Plants Collection</h1>
          <p className="text-gray-600">Welcome back, <span className="font-semibold text-green-600">{user.displayName || user.email}</span></p>
          <p className="text-sm text-gray-500 mt-1">You have {plants.length} plant{plants.length !== 1 ? 's' : ''} in your collection</p>
        </div>

        {/* Add New Plant Button */}
        <div className="text-center mb-8">
          <Link
            to={'/add-plant'}
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Plant
          </Link>
        </div>

        {plants.length > 0 ? (
          <>
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  <span className="ml-2 text-xs">
                    ({category === 'all' ? plants.length : plants.filter(p => p.category === category).length})
                  </span>
                </button>
              ))}
            </div>

            {/* Plants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlants.map(plant => (
                <div key={plant._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 relative">
                    {plant.image ? (
                      <img
                        src={plant.image}
                        alt={plant.plantName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-400">
                          <div className="text-4xl mb-2">🌱</div>
                          <p className="text-sm">No Image</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {plant.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{plant.plantName}</h2>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Care Level:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          plant.careLevel === 'Easy' ? 'bg-green-100 text-green-800' :
                          plant.careLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {plant.careLevel}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Health:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          plant.healthStatus === 'Healthy' ? 'bg-green-100 text-green-800' :
                          plant.healthStatus === 'Good' ? 'bg-blue-100 text-blue-800' :
                          plant.healthStatus === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {plant.healthStatus}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Watering:</span>
                        <span className="text-gray-800 font-medium">{plant.wateringFrequency}</span>
                      </div>
                    </div>

                    {/* Next Watering Alert */}
                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center text-sm">
                        <span className="text-blue-600 mr-2">💧</span>
                        <span className="text-gray-600">Next watering:</span>
                        <span className="ml-2 font-semibold text-blue-700">{plant.nextWateringDate}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        to={`/plantDetails/${plant._id}`}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        👁️ View
                      </Link>
                      
                      <Link
                        to={`/updatePlant/${plant._id}`}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        ✏️ Update
                      </Link>
                      
                      <button
                        onClick={() => handleDelete(plant._id)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Plants in Category */}
            {filteredPlants.length === 0 && selectedCategory !== 'all' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No plants in this category</h3>
                <p className="text-gray-600 mb-4">Try selecting a different category.</p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  View All Plants
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🌱</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No plants yet!</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start your plant collection by adding your first plant. Track their care schedule and watch them grow!
            </p>
            <Link
              to={'/add-plant'}
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Your First Plant
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlants;