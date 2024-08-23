import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, verifyOtp, changePassword, login } from '../Redux/userRedux.jsx';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../Helpers/ThemeToggle.jsx';
import { useNavigate } from 'react-router-dom';

const AdminSignInPage = () => {
  const dispatch = useDispatch();
  const { isDark, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isOtpVerificationOpen, setIsOtpVerificationOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => toast.success('Admin logged in successfully'))
      .catch((error) => toast.error(error.message));
    navigate('/');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(forgotEmail))
      .unwrap()
      .then(() => {
        toast.success('OTP sent to your email');
        setIsForgotPasswordOpen(false);
        setIsOtpVerificationOpen(true);
      })
      .catch((error) => toast.error(error.message));
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ email: forgotEmail, otp }))
        .unwrap()
        .then(() => {
            toast.success('OTP verified successfully');
            setIsOtpVerificationOpen(false);
            setIsChangePasswordOpen(true);
        })
        .catch((error) => {
            toast.error(error.message);
            // Ensure the modal stays open if the OTP is invalid
            setIsOtpVerificationOpen(true);
        });
};


  const handleChangePassword = (e) => {
    e.preventDefault();
    dispatch(changePassword({ email: forgotEmail, newPassword }))
      .unwrap()
      .then(() => {
        toast.success('Password changed successfully');
        setIsChangePasswordOpen(false);
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700' : 'bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50'}`}>
      <ThemeToggle className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300"/>
      <div className="flex flex-col-reverse lg:flex-row w-full max-w-6xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className={`lg:w-1/2 flex flex-col items-center justify-center p-8 ${isDark ? 'bg-gray-800' : 'bg-blue-500'} text-white`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Admin Portal</h2>
            <p className="text-lg mb-4">Access restricted to authorized admin users only.</p>
            <p className="text-sm">Manage users, monitor activity, and configure settings securely.</p>
          </motion.div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className={`lg:w-1/2 p-8 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
        >
          <div className="flex justify-between items-center">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-green-300' : 'text-green-700'}`}>Admin Sign In</h2>
          </div>
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Admin Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`mt-1 block w-full px-3 py-2 border ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-900'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-900'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isDark ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
            <div className="mt-4 text-center">
              <button
                type="button"
                className={`text-sm font-medium ${isDark ? 'text-green-300 hover:text-green-400' : 'text-green-600 hover:text-green-500'} focus:outline-none`}
                onClick={() => setIsForgotPasswordOpen(true)}
              >
                Forgot your password?
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-sm ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}
          >
            <h2 className={`text-xl font-bold text-center ${isDark ? 'text-green-300' : 'text-green-700'}`}>Forgot Password</h2>
            <form onSubmit={handleForgotPassword} className="mt-6 space-y-4">
              <div>
                <label htmlFor="forgotEmail" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Enter your email
                </label>
                <input
                  id="forgotEmail"
                  name="forgotEmail"
                  type="email"
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isDark ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </div>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  className={`text-sm font-medium ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} focus:outline-none`}
                  onClick={() => setIsForgotPasswordOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* OTP Verification Modal */}
      {isOtpVerificationOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-sm ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}
          >
            <h2 className={`text-xl font-bold text-center ${isDark ? 'text-green-300' : 'text-green-700'}`}>Verify OTP</h2>
            <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
              <div>
                <label htmlFor="otp" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Enter OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isDark ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
                </button>
              </div>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  className={`text-sm font-medium ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} focus:outline-none`}
                  onClick={() => setIsOtpVerificationOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Change Password Modal */}
      {isChangePasswordOpen && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`w-full max-w-sm ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}
    >
      <h2 className={`text-xl font-bold text-center ${isDark ? 'text-green-300' : 'text-green-700'}`}>Change Password</h2>
      <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
        <div className="relative">
          <label htmlFor="newPassword" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type={showPassword ? 'text' : 'password'}
            required
            className={`mt-1 block w-full px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500`}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isDark ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            disabled={isLoading}
          >
            {isLoading ? 'Changing Password...' : 'Change Password'}
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            type="button"
            className={`text-sm font-medium ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} focus:outline-none`}
            onClick={() => setIsChangePasswordOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  </motion.div>
)}

    </div>
  );
};

export default AdminSignInPage;
