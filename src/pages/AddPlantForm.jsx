import { useState } from 'react';

const AddPlantForm = () => {
  const [formData, setFormData] = useState({
    image: '',
    plantName: '',
    category: '',
    description: '',
    careLevel: '',
    wateringFrequency: '',
    lastWateredDate: '',
    nextWateringDate: '',
    healthStatus: '',
    userEmail: 'user@example.com',
    userName: 'Current User'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const categories = [
    { value: 'succulent', label: '🌵 Succulent', icon: '🌵' },
    { value: 'fern', label: '🌿 Fern', icon: '🌿' },
    { value: 'flowering', label: '🌸 Flowering', icon: '🌸' },
    { value: 'tropical', label: '🌴 Tropical', icon: '🌴' },
    { value: 'herb', label: '🌱 Herb', icon: '🌱' },
    { value: 'bonsai', label: '🎋 Bonsai', icon: '🎋' },
    { value: 'cactus', label: '🌵 Cactus', icon: '🌵' },
    { value: 'vine', label: '🍃 Vine', icon: '🍃' }
  ];

  const careLevels = [
    { value: 'easy', label: 'Easy', icon: '😊', color: 'text-green-600', bg: 'bg-green-100' },
    { value: 'moderate', label: 'Moderate', icon: '😐', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { value: 'difficult', label: 'Difficult', icon: '😰', color: 'text-red-600', bg: 'bg-red-100' }
  ];

  const healthStatuses = [
    { value: 'excellent', label: 'Excellent', icon: '💚', color: 'text-green-600' },
    { value: 'good', label: 'Good', icon: '💛', color: 'text-green-500' },
    { value: 'fair', label: 'Fair', icon: '🧡', color: 'text-yellow-600' },
    { value: 'poor', label: 'Poor', icon: '❤️', color: 'text-orange-600' },
    { value: 'needs-attention', label: 'Needs Attention', icon: '🚨', color: 'text-red-600' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      setFormData({
        image: '',
        plantName: '',
        category: '',
        description: '',
        careLevel: '',
        wateringFrequency: '',
        lastWateredDate: '',
        nextWateringDate: '',
        healthStatus: '',
        userEmail: 'user@example.com',
        userName: 'Current User'
      });
      setCurrentStep(1);

      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.image && formData.plantName && formData.category;
      case 2:
        return formData.description && formData.careLevel && formData.wateringFrequency;
      case 3:
        return formData.lastWateredDate && formData.nextWateringDate && formData.healthStatus;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br text-black from-emerald-50 via-green-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4 animate-bounce">
            <span className="text-6xl">🌱</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Add Your Plant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome your new green friend to the family! Let's create a care profile that will help your plant thrive.
          </p>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
            <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl animate-scale-in">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Plant Added Successfully!</h3>
              <p className="text-gray-600 mb-4">Your new plant has been added to your collection.</p>
              <div className="w-full bg-green-100 rounded-full h-2 mb-4">
                <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                    currentStep >= step 
                      ? 'bg-green-500 text-white shadow-lg scale-110' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      currentStep > step ? 'bg-green-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center space-x-8 text-sm font-medium">
            <span className={currentStep >= 1 ? 'text-green-600' : 'text-gray-400'}>Basic Info</span>
            <span className={currentStep >= 2 ? 'text-green-600' : 'text-gray-400'}>Care Details</span>
            <span className={currentStep >= 3 ? 'text-green-600' : 'text-gray-400'}>Health & Schedule</span>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
            <h2 className="text-2xl font-bold text-white text-center">
              {currentStep === 1 && "🌿 Tell us about your plant"}
              {currentStep === 2 && "🌱 Care requirements"}
              {currentStep === 3 && "📅 Health & watering schedule"}
            </h2>
          </div>

          <div className="p-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-slide-in">
                {/* Image Preview */}
                <div className="text-center">
                  {formData.image && (
                    <div className="inline-block mb-4">
                      <img 
                        src={formData.image} 
                        alt="Plant preview" 
                        className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-green-200"
                        onError={(e) => {e.target.style.display = 'none'}}
                      />
                    </div>
                  )}
                </div>

                {/* Image URL */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-semibold text-gray-700">📸 Plant Photo URL</span>
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/your-beautiful-plant.jpg"
                    className="input input-bordered input-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    required
                  />
                  <label className="label">
                    <span className="label-text-alt text-gray-500">Share a beautiful photo of your plant!</span>
                  </label>
                </div>

                {/* Plant Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-semibold text-gray-700">🏷️ Plant Name</span>
                  </label>
                  <input
                    type="text"
                    name="plantName"
                    value={formData.plantName}
                    onChange={handleInputChange}
                    placeholder="e.g., Monstera Deliciosa, Snake Plant, Peace Lily"
                    className="input input-bordered input-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    required
                  />
                </div>

                {/* Category Selection */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-semibold text-gray-700">🌿 Plant Category</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((cat) => (
                      <label
                        key={cat.value}
                        className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 ${
                          formData.category === cat.value
                            ? 'border-green-500 bg-green-50 shadow-md'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={cat.value}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <div className="text-2xl mb-2">{cat.icon}</div>
                        <div className="text-sm font-medium">{cat.label.split(' ')[1]}</div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Care Details */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-slide-in">
                {/* Description */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-semibold text-gray-700">📝 Plant Description</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell us about your plant's unique features, where you got it, or any special memories..."
                    className="textarea textarea-bordered textarea-lg h-32 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 resize-none"
                    required
                  ></textarea>
                </div>

                {/* Care Level */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-semibold text-gray-700">📊 Care Level</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {careLevels.map((level) => (
                      <label
                        key={level.value}
                        className={`cursor-pointer border-2 rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 ${
                          formData.careLevel === level.value
                            ? `border-green-500 ${level.bg} shadow-md`
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="careLevel"
                          value={level.value}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <div className="text-3xl mb-2">{level.icon}</div>
                        <div className={`font-bold ${level.color}`}>{level.label}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {level.value === 'easy' && 'Perfect for beginners'}
                          {level.value === 'moderate' && 'Some experience needed'}
                          {level.value === 'difficult' && 'Expert level care'}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Watering Frequency */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-semibold text-gray-700">💧 Watering Frequency</span>
                  </label>
                  <input
                    type="text"
                    name="wateringFrequency"
                    value={formData.wateringFrequency}
                    onChange={handleInputChange}
                    placeholder="e.g., Every 3 days, Weekly, Twice a week"
                    className="input input-bordered input-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    required
                  />
                  <label className="label">
                    <span className="label-text-alt text-gray-500">How often does your plant need water?</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Health & Schedule */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-slide-in">
                {/* Health Status */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-semibold text-gray-700">❤️ Current Health Status</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {healthStatuses.map((status) => (
                      <label
                        key={status.value}
                        className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 ${
                          formData.healthStatus === status.value
                            ? 'border-green-500 bg-green-50 shadow-md'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="healthStatus"
                          value={status.value}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <div className="text-2xl mb-2">{status.icon}</div>
                        <div className={`font-medium ${status.color}`}>{status.label}</div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Watering Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg font-semibold text-gray-700">📅 Last Watered</span>
                    </label>
                    <input
                      type="date"
                      name="lastWateredDate"
                      value={formData.lastWateredDate}
                      onChange={handleInputChange}
                      className="input input-bordered input-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg font-semibold text-gray-700">🗓️ Next Watering</span>
                    </label>
                    <input
                      type="date"
                      name="nextWateringDate"
                      value={formData.nextWateringDate}
                      onChange={handleInputChange}
                      className="input input-bordered input-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* User Info Preview */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">👤 Plant Parent Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        {formData.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">{formData.userName}</p>
                        <p className="text-sm text-gray-500">Plant Parent</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        📧
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">{formData.userEmail}</p>
                        <p className="text-sm text-gray-500">Contact</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="btn btn-outline btn-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-200"
              >
                ← Previous
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500">Step {currentStep} of 3</p>
              </div>

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                  className="btn btn-success btn-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-200"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !isStepValid(3)}
                  className="btn btn-success btn-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-200"
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Adding Plant...
                    </>
                  ) : (
                    <>
                      🌱 Add to Collection
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4 text-center">💡</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Pro Tip</h3>
            <p className="text-gray-600 text-center">Take photos in natural light to capture your plant's true colors!</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4 text-center">📱</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Stay Connected</h3>
            <p className="text-gray-600 text-center">Get reminders and care tips sent directly to your email.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4 text-center">🌱</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Grow Together</h3>
            <p className="text-gray-600 text-center">Join a community of plant lovers and share your journey!</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddPlantForm;