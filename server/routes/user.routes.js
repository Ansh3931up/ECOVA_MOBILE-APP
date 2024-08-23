import { Router } from "express";
import { register, login, logout, forgotPassword, verifyOTP, resetPassword,refreshToken } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyjwt } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/refresh-token").post(refreshToken);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyjwt, logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/verify-otp").post(verifyOTP);
router.route("/reset-password").post(resetPassword);

export default router;
