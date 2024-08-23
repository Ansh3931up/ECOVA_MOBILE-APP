import mongoose, { Schema } from "mongoose";

const updateSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

export const Update = mongoose.model("Update", updateSchema);
