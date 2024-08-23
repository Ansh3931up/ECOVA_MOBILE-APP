// src/redux/gallerySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import axiosInstance from '../Helpers/axios';

// Base URL
// const API_URL = '/api/v1/gallery'; // Adjust this based on your API route

// uploadImage,
// getgalleries,
// deleteGallery,
// Async Thunks
// router.route("/uploadphoto").post(verifyjwt, authorizedRoles("admin"), upload.single("photo"), uploadImage);
// router.route("/getgalleries").get(getgalleries);
// router.route("/removephoto/:id").delete(verifyjwt, authorizedRoles("admin"), deleteGallery);

export const fetchGalleries = createAsyncThunk(
  'gallery/fetchGalleries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`gallery/getgalleries`);
      return response.data.data; // Assuming the API response structure
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// src/redux/gallerySlice.js
export const uploadPhoto = createAsyncThunk(
  'gallery/uploadPhoto',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('gallery/uploadphoto', data);
      toast.success('Photo uploaded successfully!');
      return response.data.data;
    } catch (error) {
      toast.error('Failed to upload photo');
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const deletePhoto = createAsyncThunk(
  'gallery/deletePhoto',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`gallery/removephoto/${id}`);
      toast.success('Photo deleted successfully!');
      return id;
    } catch (error) {
      toast.error('Failed to delete photo');
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Gallery Slice
export const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    galleries: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Galleries
      .addCase(fetchGalleries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGalleries.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.galleries = payload;
      })
      .addCase(fetchGalleries.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Upload Photo
      .addCase(uploadPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadPhoto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.galleries.push(payload); // Add the new photo to the state
      })
      .addCase(uploadPhoto.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Delete Photo
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePhoto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.galleries = state.galleries.filter((gallery) => gallery._id !== payload);
      })
      .addCase(deletePhoto.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default gallerySlice.reducer;
