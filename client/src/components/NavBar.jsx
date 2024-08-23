import { motion } from 'framer-motion';
import { Sun, Moon, LogOutIcon, UserPlus2Icon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { logout } from '../Redux/userRedux';

const IconButton = ({ children, ariaLabel, onClick }) => {
  const { isDark } = useTheme();
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={`p-2 rounded-full ${
        isDark ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
      } transition-colors duration-200`}
    >
      {children}
    </button>
  );
};

export default function MobileHeader() {
  const { isDark, toggleTheme } = useTheme();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 shadow-md ${
        isDark ? 'bg-gradient-to-r from-gray-900 via-blue-500 to-purple-600' : 'bg-gradient-to-r from-sky-200 to-blue-400'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {/* ECOVA Heading */}
      <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>ECOVA</h1>

      {/* Theme Toggle Button */}
      <IconButton ariaLabel="Toggle Theme" onClick={toggleTheme}>
        {isDark ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-blue-600" />}
      </IconButton>

      {/* Sign In/Out Button */}
      {isLoggedIn ? (
        <IconButton ariaLabel="Logout" onClick={handleLogout}>
          <LogOutIcon className="h-6 w-6" />
        </IconButton>
      ) : (
        <Link to="/signin">
          <IconButton ariaLabel="Sign In">
            <UserPlus2Icon className="h-6 w-6" />
          </IconButton>
        </Link>
      )}
    </motion.header>
  );
}
