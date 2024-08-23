import { User } from '../module/user.model.js';
import ApiError from '../utilities/ApiError.js';
import ApiResponse from '../utilities/ApiResponse.js';
import { asyncHandler } from '../utilities/asyncHandler.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs'; 
// Generate Access and Refresh Tokens
const generateAccessandRefreshToken = async (userid) => {
    try {
        const user = await User.findById(userid);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Generate tokens using the correct methods
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save refresh token to the user
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Unable to generate access and refresh token");
    }
};

// Cookie options
const options = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true,
    sameSite: 'None',
};

// Register a new user
const register = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    if ([fullname, email, password].some((item) => item?.trim() === '')) {
        throw new ApiError(404, "Data is incomplete");
    }

    const existing = await User.findOne({
        $or: [{ email }, { fullname }]
    });

    if (existing) {
        throw new ApiError(404, "This user already exists");
    }

    const user = await User.create({ fullname, email, password });

    const createUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createUser) {
        throw new ApiError(400, "Something went wrong while registering the user");
    }

    return res.status(201).json(new ApiResponse(200, createUser, "User created successfully"));
});

// Login a user
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.verifyPassword(password);
    if (!isPasswordCorrect) {
        throw new ApiError(404, "Password incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id);

    return res
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .status(200)
        .json(new ApiResponse(200, user, 'You are logged in'));
});

// Logout a user
const logout = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(404, "No user logged in");
    }

    await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } }, { new: true });

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});


// Forgot password: Generate and send OTP
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    user.forgotPasswordToken = otp;
    user.forgotPasswordExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save({ validateBeforeSave: false });

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'hi5646451@gmail.com',
        pass: 'vuby xmkw rsuf phhv'
      },
    });
    

    const mailOptions = {
  
        to: user.email,
        from: 'thebeliever39@gmail.com',
        subject: 'OTP Verification',
        text: `Your OTP code is ${otp}`,
    
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json(new ApiResponse(200, {}, 'OTP sent to your email'));
});

// Verify OTP
const verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }

    const user = await User.findOne({ email });
    if (!user || user.forgotPasswordToken !== otp || Date.now() > user.forgotPasswordExpiry) {
        throw new ApiError(400, "Invalid or expired OTP");
    }

    // Mark OTP as verified
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    user.isOTPVerified = true;
    console.log("my",user)
    await user.save({ validateBeforeSave: false });

    res.status(200).json(new ApiResponse(200, {}, 'OTP verified successfully'));
});

// Reset password
// Ensure you have bcryptjs installed

const resetPassword = asyncHandler(async (req, res) => {
  console.log("reset",req.body);
    const { email, newPassword } = req.body;
    
    // Validate input
    if (!email || !newPassword) {
        throw new ApiError(400, "Email and new password are required");
    }

    // Find user
    const user = await User.findOne({ email });
    console.log(user)
    if (!user || !user.isOTPVerified) {
        throw new ApiError(400, "OTP not verified or user not found");
    }

    // Hash new password
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    // console.log('newp',hashedPassword) 
    console.log("u1",user.password)
    // Update password and reset OTP verification
    user.password = newPassword;
    console.log('u2',user.password)
    user.isOTPVerified = false; // Reset OTP verification status
    await user.save();
    console.log("u3",user.password)
    console.log("0",user)
    // Send success response
    res.status(200).json(new ApiResponse(200, {}, 'Password reset successfully'));
});
const refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        throw new ApiError(401, "No refresh token provided");
    }

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new ApiError(403, "Invalid or expired refresh token");
    }

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
        throw new ApiError(403, "User not found or token mismatch");
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save();

    return res
        .cookie("accessToken", newAccessToken, cookieOptions)
        .cookie("refreshToken", newRefreshToken, cookieOptions)
        .status(200)
        .json(new ApiResponse(200, {}, 'Tokens refreshed successfully'));
});


export { register, login, logout, forgotPassword, verifyOTP, resetPassword,refreshToken };
