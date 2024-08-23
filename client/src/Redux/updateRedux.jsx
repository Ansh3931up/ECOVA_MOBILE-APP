import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helpers/axios.jsx";
import { toast } from "react-hot-toast";

const initialState = {
  updates: [],
  isLoading: false,
  error: null,
};

export const getUpdates = createAsyncThunk('updates/getUpdates', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get('/updates');
    return res.data;
  } catch (error) {
    toast.error("Failed to fetch updates");
    return rejectWithValue(error.response.data);
  }
});

export const createUpdate = createAsyncThunk('updates/createUpdate', async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/updates', data);
    toast.success("Update created successfully");
    return res.data;
  } catch (error) {
    toast.error("Failed to create update");
    return rejectWithValue(error.response.data);
  }
});

export const deleteUpdate = createAsyncThunk('updates/deleteUpdate', async (id, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.delete(`/updates/${id}`);
    toast.success("Update deleted successfully");
    return res.data;
  } catch (error) {
    toast.error("Failed to delete update");
    return rejectWithValue(error.response.data);
  }
});

export const latestUpdatesSlice = createSlice({
  name: "latestUpdates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUpdates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUpdates.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.updates = payload.data;
      })
      .addCase(getUpdates.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(createUpdate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUpdate.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.updates.push(payload.data);
      })
      .addCase(createUpdate.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(deleteUpdate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUpdate.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.updates = state.updates.filter(update => update._id !== payload.data._id);
      })
      .addCase(deleteUpdate.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default latestUpdatesSlice.reducer;
