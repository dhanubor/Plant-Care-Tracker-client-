import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import { toast } from "react-toastify";

const Profile = () => {
  const { user, upDateUser, amount, setUser } = useContext(AuthContext);
  const [openForm, setOpenForm] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.photoURL || "");

  // Update local states when user changes
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      setProfileImage(user.photoURL || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setLoading(true);
    
    try {
      const updateData = {
        displayName: name.trim(),
        photoURL: photoURL.trim() || null
      };

      await upDateUser(updateData);
      
      // Update the profile image state immediately
      setProfileImage(photoURL.trim() || "");
      
      // Force refresh user context if available
      if (setUser && user) {
        setUser({
          ...user,
          displayName: name.trim(),
          photoURL: photoURL.trim() || user.photoURL
        });
      }
      
      toast.success("Profile updated successfully!");
      setOpenForm(false);
      
      // Force a small delay to ensure Firebase has processed the update
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
    setOpenForm(false);
  };

  const handlePhotoURLChange = (e) => {
    const url = e.target.value;
    setPhotoURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center text-white">
            <div className="relative inline-block">
              <img
                key={profileImage || user?.photoURL} // Force re-render when image changes
                src={profileImage || user?.photoURL || "https://via.placeholder.com/150/cccccc/ffffff?text=User"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150/cccccc/ffffff?text=User";
                }}
                onLoad={() => {
                  // Image loaded successfully
                  //console.log("Profile image loaded:", profileImage || user?.photoURL);
                }}
              />
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold mt-4">
              {user?.displayName || "User"}
            </h1>
            <p className="text-blue-100 mt-2 text-lg">
              {user?.email}
            </p>
          </div>

          {/* Content Section */}
          <div className="px-8 py-8">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 mb-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Current Balance</p>
                  <p className="text-3xl font-bold">৳{amount?.toLocaleString() || '0'}</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {user?.displayName || "Not provided"}
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-600">Email Address</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Account Status</label>
                <div className="flex items-center mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Active
                  </span>
                </div>
              </div>

              {/* Update Profile Button */}
              <div className="text-center pt-4">
                <button
                  onClick={() => setOpenForm(!openForm)}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {openForm ? "Cancel Update" : "Update Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Update Form Modal */}
        {openForm && (
          <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-2xl">
                <h3 className="text-xl font-bold text-white">Update Profile</h3>
              </div>
              
              <form onSubmit={handleUpdate} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photo URL (Optional)
                    </label>
                    <input
                      type="url"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={photoURL}
                      onChange={handlePhotoURLChange}
                      placeholder="Enter photo URL (e.g., https://example.com/photo.jpg)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter a valid image URL. The image should be publicly accessible.
                    </p>
                  </div>

                  {/* Current Image */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Current Profile Picture:</p>
                    <img
                      src={user?.photoURL || "https://via.placeholder.com/150/cccccc/ffffff?text=User"}
                      alt="Current Profile"
                      className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-gray-200 mb-2"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150/cccccc/ffffff?text=User";
                      }}
                    />
                  </div>

                  {/* Preview */}
                  {photoURL && photoURL !== user?.photoURL && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">New Photo Preview:</p>
                      <img
                        src={photoURL}
                        alt="Preview"
                        className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-blue-200"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                        onLoad={(e) => {
                          e.target.style.display = 'block';
                        }}
                      />
                    </div>
                  )}

                  {/* Sample URLs for testing */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2">Sample photo URLs for testing:</p>
                    <div className="space-y-1">
                      <button
                        type="button"
                        className="text-xs text-blue-600 hover:underline block"
                        onClick={() => setPhotoURL('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face')}
                      >
                        Sample Male Photo
                      </button>
                      <button
                        type="button"
                        className="text-xs text-blue-600 hover:underline block"
                        onClick={() => setPhotoURL('https://images.unsplash.com/photo-1494790108755-2616b332c506?w=150&h=150&fit=crop&crop=face')}
                      >
                        Sample Female Photo
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !name.trim()}
                    className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Updating...
                      </>
                    ) : (
                      'Update Profile'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile