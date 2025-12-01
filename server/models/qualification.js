// server/models/qualification.js
import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema(
  {
    school: {
      type: String,
      required: true,
      trim: true,
    },
    program: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      required: true,
      trim: true, // e.g. "2022-2024"
    },
  },
  { timestamps: true }
);

const Qualification = mongoose.model("Qualification", qualificationSchema);

export default Qualification;
