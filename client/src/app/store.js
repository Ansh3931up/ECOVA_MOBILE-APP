import { configureStore } from "@reduxjs/toolkit";

import  {gallerySlice}  from "../Redux/galleryRedux";
import { authSlice } from "../Redux/userRedux";
import { latestUpdatesSlice } from "../Redux/updateRedux";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    gallery: gallerySlice.reducer,
    latestUpdates:latestUpdatesSlice.reducer// Define your slice reducer here
   
   
  },
});
