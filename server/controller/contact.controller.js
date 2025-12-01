// server/controller/contact.controller.js
import Contact from "../models/contact.js";

// POST /api/contacts  -> public (contact form)
export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    return res.status(201).json(contact);
  } catch (err) {
    console.error("createContact error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/contacts -> admin only (view all)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json(contacts);
  } catch (err) {
    console.error("getContacts error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/contacts/:id -> admin only
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.json(contact);
  } catch (err) {
    console.error("getContactById error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/contacts/:id -> admin only
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.json(contact);
  } catch (err) {
    console.error("updateContact error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/contacts/:id -> admin only
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.json({ message: "Contact deleted" });
  } catch (err) {
    console.error("deleteContact error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
