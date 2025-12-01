// src/pages/Home.jsx
import { useEffect, useState } from "react";
import api from "../api";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projRes, qualRes] = await Promise.all([
          api.get("/projects"),          // GET /api/projects
          api.get("/qualifications"),    // GET /api/qualifications
        ]);

        setProjects(projRes.data);
        setQualifications(qualRes.data);
      } catch (err) {
        console.error("Home load error", err);
        setError("Could not load portfolio data.");
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h1>My Portfolio</h1>
      <p>Welcome to my portfolio site.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <section>
        <h2>Projects</h2>
        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          <ul>
            {projects.map((p) => (
              <li key={p._id}>
                <strong>{p.title}</strong> – {p.description}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Qualifications</h2>
        {qualifications.length === 0 ? (
          <p>No qualifications yet.</p>
        ) : (
          <ul>
            {qualifications.map((q) => (
              <li key={q._id}>
                <strong>{q.school}</strong> – {q.program} ({q.year})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Home;
