import React, { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Plants = () => {
  const plantData = useLoaderData();
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

  return (
    <div className="p-4 max-w-7xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Plants</h1>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center">
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sortSelect" className="text-sm font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sortSelect"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Plants Table */}
      {plants.length > 0 ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Plant Info
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Watering Frequency
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Care Level
                    {(sortBy === 'careLevel' || sortBy === 'careLevelReverse') && (
                      <span className="ml-1 text-green-600">
                        {sortBy === 'careLevel' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Health Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {plants.map((plant, index) => (
                  <tr key={plant._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          {plant.image ? (
                            <img 
                              className="h-12 w-12 rounded-full object-cover" 
                              src={plant.image} 
                              alt={plant.plantName} 
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 text-xs">🌱</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{plant.plantName}</div>
                          <div className="text-sm text-gray-500">
                            Next watering: {plant.nextWateringDate}
                            {sortBy === 'nextWatering' && (
                              <span className="ml-1 text-green-600">📅</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {plant.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {plant.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {plant.wateringFrequency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        plant.careLevel === 'Easy' ? 'bg-blue-100 text-blue-800' :
                        plant.careLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {plant.careLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        plant.healthStatus === 'Healthy' ? 'bg-green-100 text-green-800' :
                        plant.healthStatus === 'Good' ? 'bg-blue-100 text-blue-800' :
                        plant.healthStatus === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {plant.healthStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Link 
                          to={`/plantDetails/${plant._id}`}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors duration-200"
                        >
                          👁️ View Details
                        </Link>
                        {/* <Link 
                          to={`/updatePlant/${plant._id}`}
                          className="inline-flex items-center px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium rounded-md transition-colors duration-200"
                        >
                          ✏️ Edit
                        </Link> */}
                        {/* <button
                          onClick={() => handleDelete(plant._id)}
                          className="inline-flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md transition-colors duration-200"
                        >
                          🗑️ Delete
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden">
            {plants.map((plant) => (
              <div key={plant._id} className="border-b border-gray-200 p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {plant.image ? (
                      <img 
                        className="h-16 w-16 rounded-lg object-cover" 
                        src={plant.image} 
                        alt={plant.plantName} 
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xl">🌱</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{plant.plantName}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Category:</span> {plant.category}</p>
                      <p><span className="font-medium">Owner:</span> {plant.userName}</p>
                      <p><span className="font-medium">Watering:</span> {plant.wateringFrequency}</p>
                      <p><span className="font-medium">Care Level:</span> {plant.careLevel}</p>
                      <p><span className="font-medium">Health:</span> {plant.healthStatus}</p>
                      <p>
                        <span className="font-medium">Next Watering:</span> {plant.nextWateringDate}
                        {sortBy === 'nextWatering' && (
                          <span className="ml-1 text-green-600">📅</span>
                        )}
                      </p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link 
                        to={`/plantDetails/${plant._id}`}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md"
                      >
                        👁️ View Details
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
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No plants found</h3>
          <p className="text-gray-500">
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