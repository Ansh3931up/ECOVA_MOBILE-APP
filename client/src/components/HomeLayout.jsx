import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';
import { Newspaper, Sun, Moon } from 'lucide-react';
import React, { useEffect } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { fetchGalleries } from '../Redux/galleryRedux';
import { getUpdates } from '../Redux/updateRedux';

const HomeLayout = () => {
  const { isDark, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const { galleries, loading: galleryLoading, error: galleryError } = useSelector((state) => state.gallery);
  const { updates, isLoading: updatesLoading, error: updatesError } = useSelector((state) => state.latestUpdates);

  useEffect(() => {
    dispatch(fetchGalleries());
    dispatch(getUpdates());
  }, [dispatch]);

  const latestGalleries = galleries.slice(0, 6);
  const latestUpdates = updates.slice(0, 3);

  return (
    <div className={`min-h-screen pt-32 font-poppins transition-colors duration-500 ${isDark ? 'bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50'} overflow-hidden`}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Sun or Moon */}
        <motion.div className={`absolute rounded-full ${isDark ? 'bg-gray-300' : 'bg-yellow-400'}`} style={{ width: isDark ? 100 : 300, height: isDark ? 100 : 300, top: isDark ? '10%' : '-10%', left: '50%', transform: 'translateX(-50%)' }} animate={{ y: isDark ? [-10, 10, -10] : [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          {!isDark && (
            <motion.div className="absolute inset-0 bg-gradient-radial from-yellow-200 via-yellow-400 to-transparent opacity-70" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.9, 0.7] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          )}
        </motion.div>

        {/* Stars */}
        {isDark && Array.from({ length: 100 }).map((_, i) => (
          <motion.div key={`star-${i}`} className="absolute bg-white rounded-full" style={{ width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }} transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: 'easeInOut' }} />
        ))}

        {/* Clouds */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div key={`cloud-${i}`} className={`absolute ${isDark ? 'bg-gray-500' : 'bg-white'} rounded-full opacity-80`} style={{ width: Math.random() * 200 + 100, height: Math.random() * 60 + 40, top: `${Math.random() * 50 + 20}%`, left: `-5%` }} animate={{ x: ['0%', '120%'] }} transition={{ duration: Math.random() * 60 + 30, repeat: Infinity, ease: 'linear' }} />
        ))}
      </div>

      {/* Theme Toggle Button */}
     
      {/* Main Content */}
      <main className="relative z-10 mx-auto px-4 py-8 lg:px-6 lg:py-12">
        {/* Hero Section */}
        <section className={`flex flex-col-reverse md:flex-col lg:flex-row items-center justify-between lg:m-20 mb-20 p-4 lg:p-20`}>
          <div className={`text-center lg:text-left w-full lg:w-1/2 mb-10 md:mb-0 bg-opacity-30 ${isDark ? 'bg-[#182B60] lg:bg-transparent' : 'bg-[#CBE1FE] lg:bg-transparent'}`}>
            <motion.h1 className={`text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold mb-4 ${isDark ? 'bg-gradient-to-r from-blue-300 via-purple-500 to-blue-300' : 'bg-gradient-to-r from-green-700 via-teal-500 to-green-700'} text-transparent bg-clip-text shadow-lg`} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              ECOVA
            </motion.h1>
            <motion.p className={`text-xl lg:text-2xl xl:text-3xl mb-4 lg:mb-8 ${isDark ? 'text-blue-200 shadow-md' : 'text-green-600 shadow-md'}`} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
              One touch of nature makes the whole world kin.
            </motion.p>
            <motion.p className={`text-sm lg:text-md xl:text-lg mb-4 lg:mb-8 ${isDark ? 'text-blue-200 shadow-md' : 'text-green-600 shadow-md'}`} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}>
              Together, we can make a difference in preserving our planet for future generations. Explore our initiatives, get involved, and contribute to a greener, more sustainable world.
            </motion.p>
            <motion.button className={`${isDark ? 'bg-blue-500 hover:bg-blue-600 shadow-md' : 'bg-green-500 hover:bg-green-600 shadow-md'} text-white font-bold py-2 px-4 lg:py-3 lg:px-6 rounded-full transition duration-300`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.open('https://forms.gle/FGjqxeMd41fX6dHq6', '_blank')}>
              Join Our Mission
            </motion.button>
          </div>
          <div className="flex justify-center lg:w-1/2">
            <Player autoplay loop src="https://lottie.host/ffab5b5a-d38b-4c73-83d3-64989ff54891/tAa2gEblEa.json" style={{ height: '300px', width: '300px' }} className="mb-10 md:mb-0" />
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-20">
          <h2 className={`text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-center ${isDark ? 'text-blue-300 shadow-md' : 'text-green-700 shadow-md'}`}>
            Our Gallery
          </h2>
          {galleryLoading ? (
            <div className="flex justify-center items-center h-full">
              <ThreeCircles visible={true} height="100" width="100" color="#4fa94d" ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass="" />
            </div>
          ) : galleryError ? (
            <p className="text-center text-red-500">Error: {galleryError}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestGalleries?.slice()?.reverse()?.map((gallery, i) => (
                <motion.div key={gallery._id} className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg overflow-hidden`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ scale: 1.05, rotate: 2 }}>
                  <img src={gallery.photo} alt={`Eco Project ${i + 1}`} className="w-full h-48 object-cover rounded-md" />
                  <p className={`mt-2 text-center ${isDark ? 'text-blue-300' : 'text-green-700'}`}>
                    {gallery.title || `Eco Project ${i + 1}`}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Latest Updates Section */}
        <section className="mb-20">
          <h2 className={`text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-center ${isDark ? 'text-blue-300 shadow-md' : 'text-green-700 shadow-md'}`}>
            Latest Updates
          </h2>
          {updatesLoading ? (
            <div className="flex justify-center items-center h-full">
              <ThreeCircles visible={true} height="100" width="100" color="#4fa94d" ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass="" />
            </div>
          ) : updatesError ? (
            <p className="text-center text-red-500">Error: {updatesError}</p>
          ) : (
            <div className="space-y-6">
              {latestUpdates.map((update, i) => (
                <motion.div key={update._id} className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.2 }} whileHover={{ scale: 1.02 }}>
                  <div className="flex items-center mb-4">
                    <Newspaper size={24} className={isDark ? 'text-blue-400' : 'text-green-500'} />
                    <h3 className={`text-xl font-semibold ml-2 ${isDark ? 'text-blue-300' : 'text-green-700'}`}>
                      {update.title}
                    </h3>
                  </div>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {update.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Quote Section */}
        <section className="text-center">
          <motion.blockquote className={`text-lg lg:text-2xl italic ${isDark ? 'text-blue-200 shadow-md' : 'text-green-600 shadow-md'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            "The environment is where we all meet; where we all have a mutual interest; it is the one thing all of us share."
          </motion.blockquote>
          <motion.p className={`mt-4 font-semibold ${isDark ? 'text-blue-300 shadow-md' : 'text-green-700 shadow-md'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
            — Lady Bird Johnson
          </motion.p>
        </section>
      </main>
    </div>
  );
};

export default HomeLayout;
