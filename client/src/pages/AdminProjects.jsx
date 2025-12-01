// src/pages/AdminProjects.jsx
import { useEffect, useState } from "react";
import api from "../api";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const loadProjects = async () => {
    const res = await api.get("/projects"); // GET /api/projects
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/projects/${editingId}`, form);  // UPDATE
    } else {
      await api.post("/projects", form);              // CREATE
    }

    setForm({ title: "", description: "" });
    setEditingId(null);
    loadProjects();
  };

  const startEdit = (project) => {
    setEditingId(project._id);
    setForm({ title: project.title, description: project.description });
  };

  const remove = async (id) => {
    await api.delete(`/projects/${id}`);
    loadProjects();
  };

  return (
    <div>
      <h2>Admin Projects</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">
          {editingId ? "Update Project" : "Add Project"}
        </button>
      </form>

      <ul>
        {projects.map((p) => (
          <li key={p._id}>
            <strong>{p.title}</strong> – {p.description}
            <button onClick={() => startEdit(p)}>Edit</button>
            <button onClick={() => remove(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProjects;

