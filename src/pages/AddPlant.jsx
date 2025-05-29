import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';

import { AuthContext } from './../provider/AuthProvider';
import { useNavigate } from 'react-router';

const AddPlant = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        image: '',
        plantName: '',
        category: 'succulent',
        careLevel: 'easy',
        wateringFrequency: '',
        lastWateredDate: '',
        nextWateringDate: '',
        healthStatus: 'Healthy',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddPlant = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newPlant = {
            ...formData,
            userEmail: user?.email,
            userName: user?.displayName || user?.email?.split('@')[0]
        };

        try {
            const response = await fetch('https://mango-care-tracker-server.vercel.app/plants', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newPlant)
            });

            const data = await response.json();
            
            if (data.insertedId) {
                Swal.fire({
                    title: "🌱 Plant Added Successfully!",
                    text: "Your new plant has been added to your collection",
                    icon: "success",
                    confirmButtonColor: "#10b981"
                });
                
                // Reset form
                setFormData({
                    image: '',
                    plantName: '',
                    category: 'succulent',
                    careLevel: 'easy',
                    wateringFrequency: '',
                    lastWateredDate: '',
                    nextWateringDate: '',
                    healthStatus: 'Healthy',
                    description: ''
                });
            }
            navigate('/my-plants'); 
        } catch (Error) {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonColor: "#ef4444"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black dark:text-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-500 dark:to-blue-600 rounded-full mb-6 shadow-lg">
                        <span className="text-3xl">🌱</span>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
                        Add New Plant
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                        Add your favorite plant to your collection and keep track of its care schedule
                    </p>
                </div>

                {/* User Info Card */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-500 dark:to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                            </span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                {user?.displayName || 'User'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Main Form */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
                    <form onSubmit={handleAddPlant} className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            
                            {/* Image URL */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-focus-within:text-green-600 dark:group-focus-within:text-green-400 transition-colors">
                                    🖼️ Plant Image URL
                                </label>
                                <div className="relative">
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-green-400 dark:focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100"
                                        placeholder="https://example.com/plant-image.jpg"
                                        required
                                    />
                                    {formData.image && (
                                        <div className="mt-3">
                                            <img 
                                                src={formData.image} 
                                                alt="Plant preview" 
                                                className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600"
                                                onError={(e) => {e.target.style.display = 'none'}}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Plant Name */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-focus-within:text-green-600 dark:group-focus-within:text-green-400 transition-colors">
                                    🌿 Plant Name
                                </label>
                                <input
                                    type="text"
                                    name="plantName"
                                    value={formData.plantName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-green-400 dark:focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100"
                                    placeholder="e.g., Monstera Deliciosa"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-focus-within:text-green-600 dark:group-focus-within:text-green-400 transition-colors">
                                    📂 Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-green-400 dark:focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 transition-all duration-300 text-gray-900 dark:text-gray-100"
                                >
                                    <option value="succulent">🌵 Succulent</option>
                                    <option value="fern">🌿 Fern</option>
                                    <option value="flowering">🌸 Flowering</option>
                                    <option value="foliage">🍃 Foliage</option>
                                    <option value="herb">🌱 Herb</option>
                                </select>
                            </div>

                            {/* Care Level */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-focus-within:text-green-600 dark:group-focus-within:text-green-400 transition-colors">
                                    ⭐ Care Level
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { value: 'easy', label: 'Easy', emoji: '😊', color: 'green' },
                                        { value: 'moderate', label: 'Moderate', emoji: '😐', color: 'yellow' },
                                        { value: 'difficult', label: 'Hard', emoji: '😰', color: 'red' }
                                    ].map((level) => (
                                        <label key={level.value} className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="careLevel"
                                                value={level.value}
                                                checked={formData.careLevel === level.value}
                                                onChange={handleInputChange}
                                                className="sr-only"
                                            />
                                            <div className={`p-3 text-center rounded-lg border-2 transition-all ${
                                                formData.careLevel === level.value
                                                    ? `border-${level.color}-400 dark:border-${level.color}-500 bg-${level.color}-50 dark:bg-${level.color}-900/30`
                                                    : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:border-gray-300 dark:hover:border-gray-500'
                                            }`}>
                                                <div className="text-xl mb-1">{level.emoji}</div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{level.label}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Watering Frequency */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                    💧 Watering Frequency
                                </label>
                                <input
                                    type="text"
                                    name="wateringFrequency"
                                    value={formData.wateringFrequency}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100"
                                    placeholder="e.g., Every 3 days, Weekly, Bi-weekly"
                                />
                            </div>

                            {/* Last Watered Date */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                    📅 Last Watered Date
                                </label>
                                <input
                                    type="date"
                                    name="lastWateredDate"
                                    value={formData.lastWateredDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all duration-300 text-gray-900 dark:text-gray-100"
                                />
                            </div>

                            {/* Next Watering Date */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                    ⏰ Next Watering Date
                                </label>
                                <input
                                    type="date"
                                    name="nextWateringDate"
                                    value={formData.nextWateringDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all duration-300 text-gray-900 dark:text-gray-100"
                                />
                            </div>

                            {/* Health Status */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-focus-within:text-green-600 dark:group-focus-within:text-green-400 transition-colors">
                                    ❤️ Health Status
                                </label>
                                <select
                                    name="healthStatus"
                                    value={formData.healthStatus}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-green-400 dark:focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 transition-all duration-300 text-gray-900 dark:text-gray-100"
                                >
                                    <option value="Healthy">💚 Healthy</option>
                                    <option value="Wilting">💛 Wilting</option>
                                    <option value="Recovering">💙 Recovering</option>
                                    <option value="Needs Attention">❤️ Needs Attention</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-8 group">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors">
                                📝 Description & Care Notes
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 resize-none text-gray-900 dark:text-gray-100"
                                placeholder="Tell us about your plant... Special care instructions, where you got it, or any interesting facts!"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-10 text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 dark:from-green-600 dark:to-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-green-600 hover:to-blue-700 dark:hover:from-green-700 dark:hover:to-blue-800'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding Plant...
                                    </>
                                ) : (
                                    <>
                                        <span className="mr-2">🌱</span>
                                        Add Plant to Collection
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPlant;