// server/controller/qualification.controller.js
import Qualification from "../models/qualification.js";

// GET /api/qualifications
export const getQualifications = async (req, res) => {
  try {
    const quals = await Qualification.find().sort({ createdAt: -1 });
    return res.json(quals);
  } catch (err) {
    console.error("getQualifications error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/qualifications
export const createQualification = async (req, res) => {
  try {
    const { school, program, year } = req.body;

    if (!school || !program || !year) {
      return res
        .status(400)
        .json({ message: "School, program, and year are required" });
    }

    const qual = await Qualification.create({ school, program, year });
    return res.status(201).json(qual);
  } catch (err) {
    console.error("createQualification error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/qualifications/:id
export const updateQualification = async (req, res) => {
  try {
    const { id } = req.params;
    const { school, program, year } = req.body;

    const qual = await Qualification.findByIdAndUpdate(
      id,
      { school, program, year },
      { new: true, runValidators: true }
    );

    if (!qual) {
      return res.status(404).json({ message: "Qualification not found" });
    }

    return res.json(qual);
  } catch (err) {
    console.error("updateQualification error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/qualifications/:id
export const deleteQualification = async (req, res) => {
  try {
    const { id } = req.params;

    const qual = await Qualification.findByIdAndDelete(id);

    if (!qual) {
      return res.status(404).json({ message: "Qualification not found" });
    }

    return res.json({ message: "Qualification deleted" });
  } catch (err) {
    console.error("deleteQualification error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


