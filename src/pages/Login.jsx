// React ও প্রয়োজনীয় হুক এবং আইকন ইমপোর্ট করা হচ্ছে
import React, { use, useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router'; // ✅ Fixed import
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify'; // Toast notifications জন্য
// অথবা SweetAlert2 ব্যবহার করতে চাইলে:
// import Swal from 'sweetalert2';

// Login কম্পোনেন্ট শুরু
const Login = () => {
  const [error, setError] = useState(''); // লগইন এরর মেসেজের জন্য
  const [loading, setLoading] = useState(false); // Loading state
  
  // স্টেটগুলো ডিক্লেয়ার করা হচ্ছে
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // পাসওয়ার্ড শো/হাইড করার জন্য
  const [rememberMe, setRememberMe] = useState(false); // রিমেম্বার মি চেকবক্সের জন্য

  const { signIn, signInWithGoogle } = use(AuthContext); // AuthContext থেকে ইউজার ডাটা নিয়ে আসা হচ্ছে
  const location = useLocation();
  const navigate = useNavigate();
  
  // ইউজার কোথা থেকে এসেছে তা জানার জন্য - ✅ Fixed redirect logic
  const from = location.state?.from?.pathname || '/';

  // Error message display করার জন্য helper function
  const showError = (errorCode) => {
    let message = '';
    switch (errorCode) {
      case 'auth/user-not-found':
        message = 'No user found with this email address.';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password. Please try again.';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email address format.';
        break;
      case 'auth/user-disabled':
        message = 'This account has been disabled.';
        break;
      case 'auth/too-many-requests':
        message = 'Too many failed attempts. Please try again later.';
        break;
      case 'auth/invalid-credential':
        message = 'Invalid email or password. Please check your credentials.';
        break;
      default:
        message = 'Login failed. Please try again.';
    }
    
    // Toast notification দেখানো
    toast.error(message);
    
    // অথবা SweetAlert2 ব্যবহার করতে চাইলে:
    // Swal.fire({
    //   icon: 'error',
    //   title: 'Login Failed',
    //   text: message,
    //   confirmButtonColor: '#3B82F6'
    // });
  };

  // সাবমিট ইভেন্ট হ্যান্ডলার - ✅ Enhanced
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const rememberMe = form.rememberMe.checked;

    try {
      const result = await signIn(email, password, rememberMe);
      const user = result.user;
      
      // Success toast
      toast.success('Login successful! Welcome back.');
      
      // অথবা SweetAlert2 ব্যবহার করতে চাইলে:
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success!',
      //   text: 'Login successful! Welcome back.',
      //   timer: 2000,
      //   showConfirmButton: false
      // });

      // ✅ Proper redirect to the intended route
      navigate(from, { replace: true });
      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      setError(errorCode);
      showError(errorCode); // Show user-friendly error message
      console.error('Login Error:', errorCode, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In Handler - ✅ Added
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithGoogle();
      const user = result.user;
      
      // Success toast
      toast.success(`Welcome ${user.displayName || 'User'}! Login successful.`);
      
      // ✅ Proper redirect to the intended route
      navigate(from, { replace: true });
      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      setError(errorCode);
      showError(errorCode);
      console.error('Google Sign In Error:', errorCode, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // GitHub Sign In Handler - ✅ Added (you'll need to implement this in AuthProvider)
  const handleGitHubSignIn = async () => {
    // আপনার AuthProvider এ GitHub sign in method থাকলে এটা কাজ করবে
    // const { signInWithGitHub } = use(AuthContext);
    
    toast.info('GitHub sign-in will be implemented soon!');
    
    // অথবা SweetAlert2 ব্যবহার করতে চাইলে:
    // Swal.fire({
    //   icon: 'info',
    //   title: 'Coming Soon',
    //   text: 'GitHub sign-in will be implemented soon!',
    // });
  };

  return (
    <div className="min-h-screen text-black bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* হেডিং অংশ */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
      </div>

      {/* ফর্ম অংশ */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* ইমেইল ইনপুট */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* পাসওয়ার্ড ইনপুট */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-2 pl-10 pr-10 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                />
                {/* পাসওয়ার্ড শো/হাইড করার বাটন */}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none disabled:cursor-not-allowed"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* রিমেম্বার মি এবং ফরগট পাসওয়ার্ড */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  disabled={loading}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:cursor-not-allowed"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* সাবমিট বাটন - ✅ Enhanced with loading state */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          {/* সোশ্যাল মিডিয়া লগইন অপশন - ✅ Enhanced */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* গুগল এবং গিটহাব লগইন বাটন - ✅ Functional buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <FaGoogle className="h-5 w-5 text-red-500" />
                  <span>Google</span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleGitHubSignIn}
                  disabled={loading}
                  className="w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <FaGithub className="h-5 w-5 text-gray-800" />
                  <span>GitHub</span>
                </button>
              </div>
            </div>
          </div>

          {/* একাউন্ট না থাকলে সাইন আপ লিঙ্ক */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Login কম্পোনেন্ট এক্সপোর্ট করা হচ্ছে
export default Login;