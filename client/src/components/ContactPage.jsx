import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react'; 
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { useTheme } from '../context/ThemeContext';
import { isEmail } from '../Helpers/regexMatcher';
import ThemeToggle from '../Helpers/ThemeToggle';

const ContactPage = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { isDark, toggleTheme } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.name || !formValues.email || !formValues.message) {
      toast.error("All fields are required");
      return;
    }

    if (!isEmail(formValues.email)) {
      toast.error("Invalid email");
      return;
    }

    try {
      const templateParams = {
        name: formValues.name,
        email: formValues.email,
        message: formValues.message,
      };

      const response = await toast.promise(
        emailjs.send(
          'service_mjrijrb',  // Replace with your EmailJS service ID
          'template_7ggyari', // Replace with your EmailJS template ID
          templateParams,
          '6E0huR2TujRHmWaQi' // Replace with your EmailJS user ID
        ),
        {
          loading: "Submitting your message...",
          success: "Form submitted successfully",
          error: "Failed to submit the form"
        }
      );

      if (response.status === 200) {
        setFormValues({
          name: "",
          email: "",
          message: ""
        });
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to submit the form");
    }
  };

  return (
    <div className={`min-h-screen font-poppins pt-4 pb-20 transition-colors duration-500 ${isDark ? 'bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50'} overflow-hidden`}>
    {/* Theme Toggle Button */}

    {/* Main Section */}
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center">
        {/* Get in Touch Section */}
        {motion && (
          <motion.div
            className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDark ? 'bg-gradient-to-r from-blue-300 via-purple-500 to-blue-300' : 'bg-gradient-to-r from-green-700 via-teal-500 to-green-700'} text-transparent bg-clip-text shadow-lg`}>
              Get in Touch
            </h1>
            <p className={`text-xl md:text-2xl mb-8 ${isDark ? 'text-blue-200 shadow-md' : 'text-green-600 shadow-md'}`}>
              We would love to hear from you! Whether you have a question, feedback, or just want to chat, our team is here to help. Reach out to us through the form, and we will get back to you as soon as possible.
            </p>
            <p className={`text-lg md:text-xl ${isDark ? 'text-blue-200 shadow-md' : 'text-green-600 shadow-md'}`}>
              Join Ecova and make a difference in preserving our planet for future generations. Together, we can contribute to a greener, more sustainable world.
            </p>
          </motion.div>
        )}

        {/* Contact Form */}
        {motion && (
          <motion.div
            className={`lg:w-1/2 p-8 rounded-lg shadow-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-blue-300' : 'text-green-700'} shadow-md`}>
              Contact Us
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium ${isDark ? 'text-blue-200' : 'text-green-700'}`}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className={`w-full mt-1 p-2 border ${isDark ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:ring-purple-500 focus:border-purple-500`}
                />
              </div>
              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-blue-200' : 'text-green-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className={`w-full mt-1 p-2 border ${isDark ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:ring-purple-500 focus:border-purple-500`}
                />
              </div>
              <div>
                <label htmlFor="message" className={`block text-sm font-medium ${isDark ? 'text-blue-200' : 'text-green-700'}`}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  className={`w-full mt-1 p-2 border ${isDark ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:ring-purple-500 focus:border-purple-500`}
                  rows="5"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className={`py-3 px-6 rounded-full font-bold text-white shadow-md transition duration-300 ${isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  </div>
  );
};

export default ContactPage;
