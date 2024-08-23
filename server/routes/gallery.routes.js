// src/routes/gallery.routes.js
import { Router } from "express";
import {
  uploadImage,
  getgalleries,
  deleteGallery,
} from "../controllers/gallery.controller.js";
import { verifyjwt, authorizedRoles } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js"; // Ensure multer is configured properly

const router = Router();

// Routes for gallery operations
router.route("/uploadphoto").post(verifyjwt, uploadImage);
router.route("/getgalleries").get(getgalleries);
router.route("/removephoto/:id").delete(verifyjwt, deleteGallery);

export default router;
