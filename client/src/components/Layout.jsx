// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

import { ThemeProvider } from '../context/ThemeContext';
import MobileFooter from './Footer';
import MobileHeader from './NavBar'; // The new mobile header component

export default function Layout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <MobileHeader /> {/* Add the MobileHeader component */}
        <main className="flex-grow pt-16"> {/* Add padding-top to make room for the fixed header */}
          <Outlet />
        </main>
        <MobileFooter/>
      </div>
    </ThemeProvider>
  );
}
