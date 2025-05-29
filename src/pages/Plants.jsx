import React, { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Plants = () => {
  const plantData = useLoaderData();
  console.log(plantData)
  const [plants, setPlants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Unique categories for filtering
  const categories = ['all', ...new Set(plantData.map(plant => plant.category))];

  // Sort options
  const sortOptions = [
    { value: 'default', label: 'Default Order' },
    { value: 'nextWatering', label: 'Next Watering Date' },
    { value: 'careLevel', label: 'Care Level (Easy → Hard)' },
    { value: 'careLevelReverse', label: 'Care Level (Hard → Easy)' }
  ];

  // Helper function to parse date strings
  const parseDate = (dateString) => {
    if (!dateString) return new Date(0); // Return epoch for invalid dates
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? new Date(0) : date;
  };

  // Helper function to get care level priority for sorting
  const getCareLevelPriority = (careLevel) => {
    const priorities = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
    return priorities[careLevel] || 4;
  };

  // Sort plants based on selected option
  const sortPlants = (plantsToSort, sortOption) => {
    const sorted = [...plantsToSort];
    
    switch (sortOption) {
      case 'nextWatering':
        return sorted.sort((a, b) => {
          const dateA = parseDate(a.nextWateringDate);
          const dateB = parseDate(b.nextWateringDate);
          return dateA - dateB;
        });
      
      case 'careLevel':
        return sorted.sort((a, b) => {
          const priorityA = getCareLevelPriority(a.careLevel);
          const priorityB = getCareLevelPriority(b.careLevel);
          return priorityA - priorityB;
        });
      
      case 'careLevelReverse':
        return sorted.sort((a, b) => {
          const priorityA = getCareLevelPriority(a.careLevel);
          const priorityB = getCareLevelPriority(b.careLevel);
          return priorityB - priorityA;
        });
      
      default:
        return sorted;
    }
  };

  // Filter and sort plants based on selected category and sort option
  useEffect(() => {
    let filtered;
    if (selectedCategory === 'all') {
      filtered = [...plantData];
    } else {
      filtered = plantData.filter(plant => plant.category === selectedCategory);
    }
    
    const sorted = sortPlants(filtered, sortBy);
    setPlants(sorted);
  }, [selectedCategory, sortBy, plantData]);

  // Delete handler with proper error handling
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
        fetch(`https://mango-care-tracker-server.vercel.app/plants/${_id}`, {
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

  return (
    <div className="p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto text-black dark:text-white">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-white">
        All Plants
      </h1>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col space-y-4 mb-6 lg:mb-8">
        {/* Category Filter Buttons */}
        <div className="w-full">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center sm:text-left">
            Filter by Category:
          </h3>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-md transform scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 hover:shadow-sm'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label htmlFor="sortSelect" className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center sm:text-left">
            Sort by:
          </label>
          <select
            id="sortSelect"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Plants Display */}
      {plants.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Desktop Table - Hidden on mobile and tablet */}
          <div className="hidden xl:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Plant Info
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Watering
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Care Level
                    {(sortBy === 'careLevel' || sortBy === 'careLevelReverse') && (
                      <span className="ml-1 text-green-600 dark:text-green-400">
                        {sortBy === 'careLevel' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Health
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {plants.map((plant, index) => (
                  <tr key={plant._id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {plant.image ? (
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={plant.image} 
                              alt={plant.plantName} 
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                              <span className="text-gray-500 dark:text-gray-400 text-xs">🌱</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{plant.plantName}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Next: {plant.nextWateringDate}
                            {sortBy === 'nextWatering' && (
                              <span className="ml-1 text-green-600 dark:text-green-400">📅</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        {plant.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {plant.userName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {plant.wateringFrequency}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        plant.careLevel === 'Easy' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                        plant.careLevel === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                        'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {plant.careLevel}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        plant.healthStatus === 'Healthy' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                        plant.healthStatus === 'Good' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                        plant.healthStatus === 'Fair' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                        'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {plant.healthStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Link 
                          to={`/plantDetails/${plant._id}`}
                          className="inline-flex items-center px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors duration-200"
                          title="View Details"
                        >
                          👁️
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tablet Grid Layout - Visible on lg screens */}
          <div className="hidden lg:grid xl:hidden grid-cols-2 gap-4 p-4">
            {plants.map((plant) => (
              <div key={plant._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {plant.image ? (
                      <img 
                        className="h-16 w-16 rounded-lg object-cover" 
                        src={plant.image} 
                        alt={plant.plantName} 
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400 text-xl">🌱</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 truncate">{plant.plantName}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
                      <div>
                        <span className="font-medium">Category:</span>
                        <span className="block text-xs">{plant.category}</span>
                      </div>
                      <div>
                        <span className="font-medium">Owner:</span>
                        <span className="block text-xs">{plant.userName}</span>
                      </div>
                      <div>
                        <span className="font-medium">Care:</span>
                        <span className="block text-xs">{plant.careLevel}</span>
                      </div>
                      <div>
                        <span className="font-medium">Health:</span>
                        <span className="block text-xs">{plant.healthStatus}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="font-medium">Next Watering:</span> {plant.nextWateringDate}
                      {sortBy === 'nextWatering' && (
                        <span className="ml-1 text-green-600 dark:text-green-400">📅</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link 
                        to={`/plantDetails/${plant._id}`}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md"
                      >
                        👁️ View
                      </Link>
                      <Link 
                        to={`/updatePlant/${plant._id}`}
                        className="inline-flex items-center px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium rounded-md"
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(plant._id)}
                        className="inline-flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Card Layout - Visible on small to medium screens */}
          <div className="lg:hidden">
            {plants.map((plant) => (
              <div key={plant._id} className="border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {plant.image ? (
                      <img 
                        className="h-14 w-14 sm:h-16 sm:w-16 rounded-lg object-cover" 
                        src={plant.image} 
                        alt={plant.plantName} 
                      />
                    ) : (
                      <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl">🌱</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 break-words">
                      {plant.plantName}
                    </h3>
                    
                    {/* Key Info - Always visible */}
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300 mb-3">
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <span><span className="font-medium">Category:</span> {plant.category}</span>
                        <span><span className="font-medium">Owner:</span> {plant.userName}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <span><span className="font-medium">Care:</span> {plant.careLevel}</span>
                        <span><span className="font-medium">Health:</span> {plant.healthStatus}</span>
                      </div>
                      <p className="text-xs">
                        <span className="font-medium">Next Watering:</span> {plant.nextWateringDate}
                        {sortBy === 'nextWatering' && (
                          <span className="ml-1 text-green-600 dark:text-green-400">📅</span>
                        )}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Link 
                        to={`/plantDetails/${plant._id}`}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors"
                      >
                        <span className="sm:hidden">👁️</span>
                        <span className="hidden sm:inline">👁️ View</span>
                      </Link>
                      <Link 
                        to={`/updatePlant/${plant._id}`}
                        className="inline-flex items-center px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium rounded-md transition-colors"
                      >
                        <span className="sm:hidden">✏️</span>
                        <span className="hidden sm:inline">✏️ Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(plant._id)}
                        className="inline-flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md transition-colors"
                      >
                        <span className="sm:hidden">🗑️</span>
                        <span className="hidden sm:inline">🗑️ Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="text-4xl sm:text-6xl mb-4">🌱</div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
            No plants found
          </h3>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 px-4">
            {selectedCategory !== 'all' 
              ? `No plants found in the "${selectedCategory}" category.`
              : 'No plants have been added yet.'
            }
          </p>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              View All Plants
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Plants;