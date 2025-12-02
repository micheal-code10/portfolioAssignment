import { useEffect, useState } from "react";
import api from "../api";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        setLoading(true);

        const [pRes, qRes] = await Promise.all([
          api.get("/projects"),
          api.get("/qualifications"),
        ]);

        setProjects(pRes.data || []);
        setQualifications(qRes.data || []);
      } catch (e) {
        console.error(e);
        setError("Could not load portfolio data.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px" }}>
      <h1>My Portfolio</h1>

      {/* ✅ CI/CD proof line (this is what you’ll screenshot before/after) */}
      <p style={{ fontWeight: 600 }}>
        CI/CD demo update: Dec 2, 2025
      </p>

      <p>Welcome to my portfolio site.</p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <section style={{ marginTop: 20 }}>
        <h2>Projects</h2>
        {!loading && projects.length === 0 && <p>No projects yet.</p>}
        <ul>
          {projects.map((p) => (
            <li key={p._id}>
              <strong>{p.title || p.name}</strong>
              {p.description ? ` — ${p.description}` : ""}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>Qualifications</h2>
        {!loading && qualifications.length === 0 && <p>No qualifications yet.</p>}
        <ul>
          {qualifications.map((q) => (
            <li key={q._id}>
              <strong>{q.title || q.name}</strong>
              {q.description ? ` — ${q.description}` : ""}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
