// src/pages/AdminQualifications.jsx
import { useEffect, useState } from "react";
import api from "../api";

const emptyForm = {
  school: "",
  program: "",
  year: "",
};

const AdminQualifications = () => {
  const [quals, setQuals] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const loadQualifications = async () => {
    try {
      const res = await api.get("/qualifications");
      setQuals(res.data);
    } catch (err) {
      console.error("Failed to load qualifications", err);
      setError("Could not load qualifications");
    }
  };

  useEffect(() => {
    loadQualifications();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingId) {
        const res = await api.put(`/qualifications/${editingId}`, form);
        setQuals((prev) =>
          prev.map((q) => (q._id === editingId ? res.data : q))
        );
      } else {
        const res = await api.post("/qualifications", form);
        setQuals((prev) => [res.data, ...prev]);
      }
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      console.error("Save qualification error", err);
      setError("Could not save qualification");
    }
  };

  const handleEdit = (q) => {
    setForm({
      school: q.school || "",
      program: q.program || "",
      year: q.year || "",
    });
    setEditingId(q._id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/qualifications/${id}`);
      setQuals((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      console.error("Delete qualification error", err);
      setError("Could not delete qualification");
    }
  };

  return (
    <div>
      <h1>Admin Qualifications</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="school"
          placeholder="School"
          value={form.school}
          onChange={handleChange}
        />
        <input
          name="program"
          placeholder="Program"
          value={form.program}
          onChange={handleChange}
        />
        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
        />
        <button type="submit">
          {editingId ? "Update Qualification" : "Add Qualification"}
        </button>
      </form>

      <ul>
        {quals.map((q) => (
          <li key={q._id}>
            <strong>{q.school}</strong> – {q.program} ({q.year}){" "}
            <button onClick={() => handleEdit(q)}>Edit</button>
            <button onClick={() => handleDelete(q._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminQualifications;
