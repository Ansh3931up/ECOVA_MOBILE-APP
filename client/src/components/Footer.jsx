import { motion } from 'framer-motion';
import { HomeIcon, LayoutDashboard, MailIcon, Newspaper, UserIcon, LogOutIcon, UserPlus2Icon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { logout } from '../Redux/userRedux';

const IconButton = ({ children, ariaLabel, theme, onClick }) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={`flex flex-col items-center p-2 transition-colors duration-200 ${
        theme === 'dark'
          ? 'text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white'
          : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900'
      }`}
    >
      {children}
    </button>
  );
};

export default function MobileFooter() {
  const { isDark } = useTheme();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <motion.footer
      className={`fixed bottom-0 left-0 right-0 z-50 flex justify-around p-2 shadow-md ${
        isDark ? 'bg-gradient-to-r from-gray-900 via-blue-500 to-purple-600' : 'bg-gradient-to-r from-sky-200 to-blue-400'
      }`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <IconButton ariaLabel="Home" theme={isDark ? 'dark' : 'light'}>
        <Link to="/" className="flex flex-col items-center">
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
      </IconButton>
      <IconButton ariaLabel="Home" theme={isDark ? 'dark' : 'light'}>
        <Link to="/about" className="flex flex-col items-center">
          <UserIcon className="h-6 w-6" />
          <span className="text-xs">About</span>
        </Link>
      </IconButton>
      <IconButton ariaLabel="Gallery" theme={isDark ? 'dark' : 'light'}>
        <Link to="/gallery" className="flex flex-col items-center">
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-xs">Gallery</span>
        </Link>
      </IconButton>

      <IconButton ariaLabel="Contact" theme={isDark ? 'dark' : 'light'}>
        <Link to="/contact" className="flex flex-col items-center">
          <MailIcon className="h-6 w-6" />
          <span className="text-xs">Contact</span>
        </Link>
      </IconButton>

      <IconButton ariaLabel="News" theme={isDark ? 'dark' : 'light'}>
        <Link to="/news" className="flex flex-col items-center">
          <Newspaper className="h-6 w-6" />
          <span className="text-xs">News</span>
        </Link>
      </IconButton>

     
    </motion.footer>
  );
}
