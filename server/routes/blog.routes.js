import { Router } from "express";
import { getAllUpdates, getUpdateById, createUpdate, updateUpdate, deleteUpdate } from "../controllers/blog.controller.js"; 
import { verifyjwt } from "../middleware/auth.middleware.js";

const router = Router();

// Routes for '/api/v1/updates'
router.route('/')
    .get(getAllUpdates)
    .post(
        verifyjwt,    // Middleware to verify JWT token
        createUpdate  // Controller function to create a new update
    );

// Routes for '/api/v1/updates/:id'
router.route('/:id')
    .get(getUpdateById)  // No JWT verification required for getting update by ID
    .put(
        verifyjwt,        // Middleware to verify JWT token
        updateUpdate      // Controller function to update an update by ID
    )
    .delete(
        verifyjwt,        // Middleware to verify JWT token
        deleteUpdate      // Controller function to delete an update by ID
    );

export default router;
