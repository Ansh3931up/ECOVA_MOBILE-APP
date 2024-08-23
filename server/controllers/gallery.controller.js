// src/controllers/gallery.controller.js
import { Gallery } from "../module/gallery.model.js";
import ApiError from "../utilities/ApiError.js";
import ApiResponse from "../utilities/ApiResponse.js";
import { asyncHandler } from "../utilities/asyncHandler.js";

// Fetch all galleries
const getgalleries = asyncHandler(async (req, res) => {
  const galleries = await Gallery.find({});
  return res.status(200).json(new ApiResponse(200, galleries, "Galleries fetched successfully"));
});

const uploadImage = asyncHandler(async (req, res) => {
  const { title, photo, photos } = req.body;

  // Ensure that either photo or photos array is provided
  if (!photo && (!photos || photos.length === 0)) {
    throw new ApiError(400, "No image file uploaded");
  }

  let newGalleries = [];

  // If multiple photos are provided
  if (photos && Array.isArray(photos)) {
    newGalleries = await Promise.all(
      photos.map(async (photoUrl) => {
        return await Gallery.create({
          photo: photoUrl,
          title,
        });
      })
    );
  }

  // If a single photo is provided
  if (photo) {
    const newGallery = await Gallery.create({
      photo: photo,
      title,
    });
    newGalleries.push(newGallery);
  }

  if (newGalleries.length === 0) {
    throw new ApiError(400, "Photo(s) not uploaded");
  }

  return res.status(200).json(new ApiResponse(200, newGalleries, "Photo(s) uploaded successfully"));
});


// Delete a gallery photo
const deleteGallery = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const gallery = await Gallery.findByIdAndDelete(id);

  if (!gallery) {
    throw new ApiError(404, "Photo not found");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Photo deleted successfully"));
});

export { getgalleries, uploadImage, deleteGallery };
