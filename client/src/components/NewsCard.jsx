import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi';

const NewsCard = ({ title, date, description, isDark, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 100; // Maximum length of the description before truncation

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">{title}</h3>
        {onDelete && (
          <button onClick={onDelete} className="text-red-500 hover:text-red-700">
            <FiTrash size={20} />
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500">{date}</p>
      <p className="mt-4">
        {isExpanded || description.length <= MAX_LENGTH 
          ? description 
          : `${description.substring(0, MAX_LENGTH)}...`}
        {description.length > MAX_LENGTH && (
          <button 
            onClick={toggleReadMore} 
            className={`ml-2 text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </p>
    </div>
  );
};

export default NewsCard;
