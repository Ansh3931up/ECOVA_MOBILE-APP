import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewsCard from '../components/NewsCard';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../Helpers/ThemeToggle';
import { getUpdates, createUpdate, deleteUpdate } from '../Redux/updateRedux';
import { toast } from 'react-hot-toast';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};
const NewsPage = () => {
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const { updates, isLoading } = useSelector(state => state?.latestUpdates);
  const isLoggedIn = useSelector(state => state?.auth?.isLoggedIn);

  const [visibleItems, setVisibleItems] = useState(3);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    dispatch(getUpdates());
  }, [dispatch]);

  const loadMoreItems = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 3);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      await dispatch(createUpdate(formData)).unwrap();
      toast.success('Update uploaded successfully!');
      setFormData({ title: '', description: '' });
      setShowUploadForm(false);
      dispatch(getUpdates());  // Fetch updates again to refresh the list
    } catch (error) {
      toast.error('Failed to upload update');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteUpdate(id))
      .unwrap()
      .then(() => {
        toast.success('Update deleted successfully!');
        dispatch(getUpdates());  // Fetch updates again to refresh the list
      })
      .catch(() => toast.error('Failed to delete update'));
  };

  return (
    <div className={`min-h-screen pt-2 font-poppins transition-colors duration-500 ${isDark ? 'bg-gray-900' : 'bg-blue-50'} overflow-hidden`}>
 
      <main className="relative z-10 mx-auto px-6 py-12">
        <section className="mb-20">
          <h2 className={`text-6xl font-bold mb-8 text-center ${isDark ? 'text-blue-300 shadow-md' : 'text-green-700 shadow-md'}`}>
            Latest Updates
          </h2>

          {isLoggedIn && (
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowUploadForm(true)}
                className={`${
                  isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
                } text-white font-bold py-3 px-6 rounded-full transition duration-300`}
              >
                Upload New Update
              </button>
            </div>
          )}

          {showUploadForm && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
              <div className={`w-full max-w-md ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
                <h2 className={`text-xl font-bold text-center ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                  Upload New Update
                </h2>
                <form className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Title"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handleUpload}
                      className={`${
                        isUploading ? 'cursor-wait' : ''
                      } ${isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'} text-white font-bold py-2 px-6 rounded-full transition duration-300`}
                      disabled={isUploading || !formData.title || !formData.description}
                    >
                      {isUploading ? 'Uploading...' : 'Upload'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowUploadForm(false)}
                      className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Show custom loader while data is being fetched */}
          {isLoading ? (
            <CustomLoader isDark={isDark} />
          ) : (
            <div className="space-y-6">
              {updates.slice().reverse().slice(0, visibleItems).map((item) => (
                <NewsCard
                  key={item._id}
                  title={item.title}
                  date={formatDate(item.createdAt)}
                  description={item.description}
                  isDark={isDark}
                  onDelete={isLoggedIn ? () => handleDelete(item._id) : null}  // Pass onDelete to NewsCard
                />
              ))}
            </div>
          )}

          {visibleItems < updates.length && !isLoading && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMoreItems}
                className={`${
                  isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
                } text-white font-bold py-3 px-6 rounded-full transition duration-300`}
              >
                Load More
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default NewsPage;

function CustomLoader({ isDark }) {
  const bgColor = isDark ? 'bg-gray-900' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
  const accentColor = isDark ? 'bg-blue-500' : 'bg-primary';
  const skeletonColor = isDark ? 'bg-gray-700' : 'bg-gray-200';

  return (
    <div className={`w-full max-w-3xl mx-auto space-y-8 p-4 ${bgColor} ${textColor}`}>
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full ${accentColor} opacity-10 animate-pulse`} />
        <div className="space-y-2">
          <div className={`h-4 w-[200px] ${skeletonColor}`} />
          <div className={`h-4 w-[100px] ${skeletonColor}`} />
        </div>
      </div>
      
      <div className={`${cardBg} rounded-lg shadow-md p-4`}>
        <div>
          <div className={`h-6 w-[300px] ${skeletonColor}`} />
        </div>
        <div className="space-y-4 pt-4">
          <div className={`h-4 w-full ${skeletonColor}`} />
          <div className={`h-4 w-full ${skeletonColor}`} />
          <div className={`h-4 w-2/3 ${skeletonColor}`} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className={`${cardBg} rounded-lg shadow-md p-4`}>
            <div>
              <div className={`h-4 w-[150px] ${skeletonColor}`} />
            </div>
            <div className="pt-4">
              <div className={`h-20 w-full ${skeletonColor}`} />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <div className={`w-10 h-10 border-4 ${isDark ? 'border-blue-500' : 'border-primary'} border-t-transparent rounded-full animate-spin`} />
      </div>
    </div>
  );
}

