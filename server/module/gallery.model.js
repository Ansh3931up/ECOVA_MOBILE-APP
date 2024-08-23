// src/module/gallery.model.js
import mongoose, { Schema } from "mongoose";

const gallerySchema = new Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Gallery = mongoose.model("Gallery", gallerySchema);
