// Css import
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
// Library import
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { store } from './app/store';
import ContactPage from './components/ContactPage';
import HomeLayout from './components/HomeLayout';
import Layout from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import AboutPage from './components/Aboutpage';
import GalleryPage from './components/GalleryPage';
import NewsPage from './components/NewsPage'
import AdminSignInPage from './components/Signin';

// import { ThemeProvider } from './components/ThemeContext';
// import UploadPhoto from './components/UploadPhoto';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<HomeLayout />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="gallery" element={<GalleryPage />} />
      <Route path="news" element={<NewsPage />} />
      <Route path="signin" element={<AdminSignInPage/>} />

      
      
    
      {/* <Route path="*" element={<Notfoundpage />} /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>

        <ThemeProvider>
          <Toaster />
          <RouterProvider router={router} />
        </ThemeProvider>
          

    </React.StrictMode>
  </Provider>
);
