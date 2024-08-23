import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helpers/axios.jsx"; // Updated import path

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "false",
    data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {},
    isLoading: false,
    error: null,
};

// Login Thunk
export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {
        const res = axiosInstance.post('auth/login', data);
        toast.promise(
            res,
            {
                loading: "Logging in...",
                success: "Logged in successfully!",
                error: "Failed to login"
            }
        );
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred during login.");
        return rejectWithValue(error?.response?.data);
    }
});

// Logout Thunk
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const res = axiosInstance.post('auth/logout');
        toast.promise(
            res,
            {
                loading: "Logging out...",
                success: "Logged out successfully!",
                error: "Failed to logout"
            }
        );
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred during logout.");
        return rejectWithValue(error?.response?.data);
    }
});

// Refresh Token Thunk
export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('auth/refresh-token');
        return res.data;
    } catch (error) {
        toast.error("Session expired. Please log in again.");
        return rejectWithValue(error?.response?.data);
    }
});

// Forgot Password Thunk
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, { rejectWithValue }) => {
    try {
        const res = axiosInstance.post('auth/forgot-password', { email });
        toast.success("OTP sent to your email.");
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred during the forgot password process.");
        return rejectWithValue(error?.response?.data);
    }
});

// Verify OTP Thunk
export const verifyOtp = createAsyncThunk('auth/verifyOTP', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('auth/verify-otp', data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

// Reset Password Thunk
export const changePassword = createAsyncThunk('auth/resetPassword', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('auth/reset-password', data);
        toast.success("Password reset successfully.");
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred during password reset.");
        return rejectWithValue(error?.response?.data);
    }
});

// Slice definition
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserData(state, action) {
            state.isLoggedIn = true;
            state.data = action.payload;
            localStorage.setItem('isLoggedIn', "true");
            localStorage.setItem('data', JSON.stringify(action.payload));
        },
        clearUserData(state) {
            state.isLoggedIn = false;
            state.data = {};
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('data');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.data = payload.data;

                localStorage.setItem('isLoggedIn', "true");
                localStorage.setItem('data', JSON.stringify(payload.data));
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.data = {};
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('data');
            })
            .addCase(logout.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(forgotPassword.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(verifyOtp.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changePassword.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(refreshToken.fulfilled, (state, { payload }) => {
                state.isLoggedIn = true;
                state.data = payload.data;

                localStorage.setItem('isLoggedIn', "true");
                localStorage.setItem('data', JSON.stringify(payload.data));
            })
            .addCase(refreshToken.rejected, (state) => {
                state.isLoggedIn = false;
                state.data = {};
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('data');
            });
    },
});

export const { setUserData, clearUserData } = authSlice.actions;

export default authSlice.reducer;
