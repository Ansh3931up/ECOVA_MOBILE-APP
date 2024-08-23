import ApiResponse from "../utilities/ApiResponse.js";
import ApiError from "../utilities/ApiError.js";
import { asyncHandler } from "../utilities/asyncHandler.js";
import { Update } from "../module/blog.model.js";

const getAllUpdates = asyncHandler(async (req, res) => {
    const updates = await Update.find({});

    return res
        .status(200)
        .json(new ApiResponse(200, updates, "All updates present"));
});

const getUpdateById = asyncHandler(async (req, res) => {
    const updateId = req.params.id;
    const update = await Update.findById(updateId);

    if (!update) {
        throw new ApiError(404, 'Update not found');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, update, "Update found"));
});

const createUpdate = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if ([title, description].some(item => item?.trim() === "")) {
        throw new ApiError(400, "Incomplete information");
    }

    const newUpdate = await Update.create({ title, description });

    if (!newUpdate) {
        throw new ApiError(400, "Update not created");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, newUpdate, "Update created successfully"));
});

const updateUpdate = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const updatedUpdate = await Update.findByIdAndUpdate(
        id,
        { $set: req.body },
        { runValidators: true, new: true }
    );

    if (!updatedUpdate) {
        throw new ApiError(404, "Update not found or not updated");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUpdate, "Updated successfully"));
});

const deleteUpdate = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedUpdate = await Update.findByIdAndDelete(id);

    if (!deletedUpdate) {
        throw new ApiError(404, "Update not found or not deleted");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Update deleted successfully"));
});

export { getAllUpdates, getUpdateById, createUpdate, updateUpdate, deleteUpdate };
