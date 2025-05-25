import React, { useState, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from './../provider/AuthProvider';

const UpdatePlant = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const plantData = useLoaderData();
    const { _id, image, plantName, category, careLevel, wateringFrequency, lastWateredDate, nextWateringDate, healthStatus, userEmail, userName, description } = plantData;
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        image: image || '',
        plantName: plantName || '',
        category: category || 'succulent',
        careLevel: careLevel || 'easy',
        wateringFrequency: wateringFrequency || '',
        lastWateredDate: lastWateredDate || '',
        nextWateringDate: nextWateringDate || '',
        healthStatus: healthStatus || 'Healthy',
        userEmail: userEmail || '',
        userName: userName || '',
        description: description || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdatePlant = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`https://mango-care-tracker-server.vercel.app/plants/${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (data.modifiedCount) {
                Swal.fire({
                    title: "🌱 Plant Updated Successfully!",
                    text: "Your plant information has been updated",
                    icon: "success",
                    confirmButtonColor: "#10b981"
                    
                });
                
            } else {
                Swal.fire({
                    title: "No Changes Made",
                    text: "No modifications were detected",
                    icon: "info",
                    confirmButtonColor: "#3b82f6"
                });
            }
           navigate('/my-plants');  
        } catch (error) {
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
        <div className="min-h-screen bg-gradient-to-br text-black from-green-50 via-blue-50 to-purple-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mb-6 shadow-lg">
                        <span className="text-3xl">✏️</span>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Update Plant
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Update your plant's information and keep track of its care schedule
                    </p>
                </div>

                {/* Plant Info Card */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-gray-200">
                            {formData.image ? (
                                <img 
                                    src={formData.image} 
                                    alt={formData.plantName} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyNEg0MFY0MEgyNFYyNFoiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+';
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-2xl">🌱</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 text-lg">
                                {formData.plantName || 'Plant Name'}
                            </h3>
                            <p className="text-gray-600 text-sm capitalize">
                                {formData.category} • {formData.careLevel} care
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Form */}
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                    <form onSubmit={handleUpdatePlant} className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            
                            {/* Image URL */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-green-600 transition-colors">
                                    🖼️ Plant Image URL
                                </label>
                                <div className="relative">
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-4 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 placeholder-gray-400"
                                        placeholder="https://example.com/plant-image.jpg"
                                    />
                                    {formData.image && (
                                        <div className="mt-3">
                                            <img 
                                                src={formData.image} 
                                                alt="Plant preview" 
                                                className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                                                onError={(e) => {e.target.style.display = 'none'}}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Plant Name */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-green-600 transition-colors">
                                    🌿 Plant Name
                                </label>
                                <input
                                    type="text"
                                    name="plantName"
                                    value={formData.plantName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 placeholder-gray-400"
                                    placeholder="e.g., Monstera Deliciosa"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-green-600 transition-colors">
                                    📂 Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300"
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
                                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-green-600 transition-colors">
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
                                                    ? `border-${level.color}-400 bg-${level.color}-50`
                                                    : 'border-gray-200 bg-white/50 hover:border-gray-300'
                                            }`}>
                                                <div className="text-xl mb-1">{level.emoji}</div>
                                                <div className="text-sm font-medium">{level.label}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Watering Frequency */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">
                                    💧 Watering Frequency
                                </label>
                                <input
                                    type="text"
                                    name="wateringFrequency"
                                    value={formData.wateringFrequency}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 placeholder-gray-400"
                                    placeholder="e.g., Every 3 days, Weekly, Bi-weekly"
                                />
                            </div>

                            {/* Last Watered Date */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">
                                    📅 Last Watered Date
                                </label>
                                <input
                                    type="date"
                                    name="lastWateredDate"
                                    value={formData.lastWateredDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                />
                            </div>

                            {/* Next Watering Date */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">
                                    ⏰ Next Watering Date
                                </label>
                                <input
                                    type="date"
                                    name="nextWateringDate"
                                    value={formData.nextWateringDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                />
                            </div>

                            {/* Health Status */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-green-600 transition-colors">
                                    ❤️ Health Status
                                </label>
                                <select
                                    name="healthStatus"
                                    value={formData.healthStatus}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                                >
                                    <option value="Healthy">💚 Healthy</option>
                                    <option value="Wilting">💛 Wilting</option>
                                    <option value="Recovering">💙 Recovering</option>
                                    <option value="Needs Attention">❤️ Needs Attention</option>
                                </select>
                            </div>

                            {/* User Email */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-purple-600 transition-colors">
                                    📧 User Email
                                </label>
                                <input
                                    type="email"
                                    name="userEmail"
                                    value={formData.userEmail}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 placeholder-gray-400"
                                    placeholder="user@example.com"
                                />
                            </div>

                            {/* User Name */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-purple-600 transition-colors">
                                    👤 User Name
                                </label>
                                <input
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 placeholder-gray-400"
                                    placeholder="Enter user name"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-8 group">
                            <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-purple-600 transition-colors">
                                📝 Description & Care Notes
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full px-4 py-4 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 placeholder-gray-400 resize-none"
                                placeholder="Update plant description and care notes..."
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-10 text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating Plant...
                                    </>
                                ) : (
                                    <>
                                        <span className="mr-2">✏️</span>
                                        Update Plant Information
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

export default UpdatePlant;