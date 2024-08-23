import { motion } from 'framer-motion';
import { Droplets, Leaf, Moon,Sun, UserIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Ansh from "../assets/ecova/ansh.png";
import anurag from "../assets/ecova/anurag.png";
import Bhanu from "../assets/ecova/bhanu.png";
import Devesh from "../assets/ecova/devesh.png";
import hemang from "../assets/ecova/hemang.png";
import ina from "../assets/ecova/ina.png";
import piyush from "../assets/ecova/jangir.png";
import kartikey from "../assets/ecova/kartikey.png";
import kaustubh from "../assets/ecova/kaustubh.png";
import kislay from "../assets/ecova/kislay.png";
import lakshya from "../assets/ecova/lakshya.png";
import manish from "../assets/ecova/manish (2).png";
import rituraj from "../assets/ecova/rituraj.png";
import sahil from "../assets/ecova/sahil.png";
import siddarth from "../assets/ecova/siddharth.png";
import tanishq from "../assets/ecova/tanishq.png";
import titiksha from "../assets/ecova/titiksha.png";
import EcovaLogo from '../assets/ecova-logo.jpg';
import { useTheme } from '../context/ThemeContext';

const events = [
  {
    title: 'Pickriti',
    details: `Pickriti is a nature photography event organized by ECOVA, where participants showcase their skills with a camera in a two-round competition focused on environmental conservation.`,
  },
  {
    title: 'Plantation Drive',
    details: `Plantation drives help the environment become greener and spread awareness. ECOVA has organized drives on World Environment Day and at the start of Plantation Month.`,
  },
  {
    title: 'Skit/Drama Competition',
    details: `A skit/drama competition for school students, themed around environmental awareness. This event encourages talent while contributing to environmental protection.`,
  },
  {
    title: 'NGO Visits: ',
    details: `ECOVA to promote environmental awareness and support their projects, fostering eco-friendly practices.`,
  },
  {
    title: 'NGO Visits: Outside ',
    details: `Visits to NGOs in Chandigarh, Hoshiarpur, and Anandpur Sahib to spread environmental awareness, promote sustainable living, and inspire eco-friendly habits.`,
  },
];

const AboutPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const teamMembers = [
    { name: 'Dr. Ina Thakur', title: 'Faculty Advisor', image:ina  },
    { name: 'Manish Yadav', title: 'President', image: manish },
    { name: 'Piyush Jangir', title: 'Vice President', image: piyush },
    { name: 'Bhanu Singh', title: 'Treasurer', image: Bhanu },
    { name: 'Devesh Soni', title: 'Social Media', image: Devesh },
    { name: 'Kislay Kumar', title: 'Secretary', image: kislay },
    { name: 'Lakshya Kumar', title: 'Volunteer Team', image: lakshya },
    { name: 'Hemang Malhotra', title: 'Photography Team', image: hemang },
    { name: 'Ansh', title: 'PR Team Head', image: Ansh, contributor: true },
    { name: 'Siddharth', title: 'Designing Team', image: siddarth },
    { name: 'Kaustubh Agarwal', title: 'Content Team', image: kaustubh },
    { name: 'Tanishq Singh', title: 'Joint secretary', image: tanishq },
    { name: 'Kartikey', title: 'Executive Member', image: kartikey },
    { name: 'Rituraj', title: 'Executive Member', image: rituraj },
    { name: 'Titiksha', title: 'Executive Member', image: titiksha },
    { name: 'Anurag', title: 'Executive Member', image: anurag },
    { name: 'Sahil', title: 'Executive Member', image: sahil },
  ];

    return (
      <div className={`min-h-screen pt-2 pb-14 font-poppins transition-colors bg-color duration-500 ${
        isDark ? 'bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50'
      }`}>
        {/* Theme Toggle Button */}
      
  
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section with Logo */}
          <section className="text-center mb-8">
            <motion.img
              src={EcovaLogo}
              alt="Ecova Logo"
              className="mx-auto w-24 h-24 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.h1
              className={`text-4xl font-bold mb-2 ${isDark ? 'text-sky-400' : 'text-[#15803D]'}`}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              About Ecova
            </motion.h1>
            <motion.p
              className={`text-lg ${isDark ? 'text-sky-400' : 'text-[#15803D]'}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Environmental Conservation and Awareness Club
            </motion.p>
          </section>
  
          {/* Introduction Section */}
          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-sky-400' : 'text-[#15803D]'}`}>Our Mission</h2>
            <p className={`text-base ${isDark ? 'text-gray-300' : 'text-black'}`}>
              ECOVA is a club of like-minded students dedicated to environmental conservation, raising awareness, and engaging in social activities. We are a community of passionate individuals committed to making a positive impact through plantation drives, awareness campaigns, dramas, photography, and serving those in need. Together, we strive to create a sustainable and environmentally conscious community.
            </p>
          </section>
  
          {/* Our Team Section */}
          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-sky-400' : 'text-[#15803D]'}`}>Our Team</h2>
            <div className="grid grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <div
                  className={`p-4 rounded-lg transition-all duration-300 bg-white dark:bg-gray-900 shadow-lg`}
                  key={index}
                >
                  <div className={`relative h-32 ${
                    isDark ? 'bg-gradient-to-br from-blue-900 to-blue-600' : 'bg-gradient-to-br from-green-800 to-[#15803D]'
                  }`}>
                    <div className="absolute inset-0 opacity-20">
                      {isDark ? (
                        <Droplets className="w-full h-full text-blue-200" />
                      ) : (
                        <Leaf className="w-full h-full text-green-200" />
                      )}
                    </div>
                    {member.contributor && ( // Display the badge if the member is a contributor
                      <div className="absolute top-2 left-2 bg-yellow-300 text-black px-2 py-1 rounded-full text-xs font-semibold">
                        App Contributor
                      </div>
                    )}
                  </div>
  
                  <div className={`relative px-4 py-6 -mt-16 rounded-b-lg ${
                    isDark ? 'bg-gray-900' : 'bg-gradient-to-t from-green-100 to-green-50'
                  }`}>
                    <div className={`w-20 h-20 mx-auto rounded-full overflow-hidden border-4 ${
                      isDark ? 'border-blue-400 shadow-blue-400/50' : 'border-[#15803D] shadow-[#15803D]/50'
                    } shadow-lg`}>
                      <img
                        src={member.image}
                        alt="Profile picture"
                        className="w-full h-full object-cover bg-gradient-to-r from-blue-800 to-green-800"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <h2 className={`text-lg font-bold ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}>
                        {member.name}
                      </h2>
                      <p className={`text-sm ${
                        isDark ? 'text-blue-300' : 'text-[#15803D]'
                      }`}>
                        {member.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
  
          {/* Our Events Section */}
          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-sky-400' : 'text-[#15803D]'}`}>Our Events</h2>
            <div className="space-y-4">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
                    isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'
                  } ${selectedEvent === index ? 'max-h-64' : 'max-h-16'}`} // Adjust height based on selection
                  whileHover={{ scale: selectedEvent === index ? 1.05 : 1.02 }} // Slight scale on hover
                  onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                >
                  <h3
                    className="text-xl font-bold"
                    style={{ color: isDark ? '#38bdf8' : '#15803D' }}
                  >
                    {event.title}
                  </h3>
                  {selectedEvent === index && (
                    <motion.p
                      className="mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {event.details}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
  
          {/* How to Join Section */}
          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-sky-400' : 'text-[#15803D]'}`}>How to Join ECOVA</h2>
            <p className={`text-base ${isDark ? 'text-gray-300' : 'text-black'}`}>Joining ECOVA is simple and rewarding. Here's how you can become a part of our community:</p>
            <ol className={`list-decimal list-inside ${isDark ? 'text-gray-300' : 'text-black'} ml-4 mt-4`}>
              <li>Go to the <Link to="/" className="underline hover:text-blue-600">Home</Link> page.</li>
              <li>Click on the <strong>Join Our Mission</strong> button.</li>
              <li>Fill out the Google Form with your details.</li>
              <li>Wait for our response. We will get back to you shortly with the next steps.</li>
            </ol>
          </section>
  
          {/* Social Media Section */}
          <section className="text-center">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-sky-400' : 'text-[#15803D]'}`}>Follow Us on Social Media</h2>
            <p className={`text-base mb-4 ${isDark ? 'text-gray-300' : 'text-black'}`}>Stay connected with us through our social media channels:</p>
            <p className={`text-base ${isDark ? 'text-blue-200' : 'text-black'}`}>
              <a href="https://www.instagram.com/ecova_iiitu" className="underline">ECOVA_INSTAGRAM</a><br />
              <a href="https://www.facebook.com/ECOVA-IIITU" className="underline">ECOVA_FACEBOOK</a>
            </p>
          </section>
        </main>
      </div>
    );
  };
  
  export default AboutPage;
  