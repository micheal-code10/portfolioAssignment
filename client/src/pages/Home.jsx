import { useEffect, useState } from "react";
import api from "../api";

const card = {
  padding: 18,
  borderRadius: 18,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow: "0 14px 40px rgba(0,0,0,0.25)",
};

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
    <div style={{ display: "grid", gap: 18 }}>
      {/* Hero */}
      <section
        style={{
          ...card,
          padding: 22,
          background:
            "linear-gradient(135deg, rgba(124,92,255,0.22), rgba(34,197,94,0.10))",
        }}
      >
        <div style={{ display: "grid", gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 36, letterSpacing: -0.5 }}>
            Hi, I’m Micheal.
          </h1>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.72)", fontSize: 16 }}>
            Software Engineering student building clean, functional web apps with React + Node.
          </p>

          {/* CI/CD proof line (keep for assignment) */}
          <p style={{ margin: "6px 0 0", fontWeight: 700 }}>
            CI/CD demo update: Dec 2, 2025
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
            <a
              href="/admin"
              style={{
                padding: "10px 14px",
                borderRadius: 14,
                background: "rgba(124,92,255,0.28)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontWeight: 700,
              }}
            >
              Admin Dashboard
            </a>
            <a
              href="/contact"
              style={{
                padding: "10px 14px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontWeight: 700,
              }}
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
        {[
          { label: "Projects", value: loading ? "…" : projects.length },
          { label: "Qualifications", value: loading ? "…" : qualifications.length },
          { label: "Stack", value: "React • Node • MongoDB" },
        ].map((s) => (
          <div key={s.label} style={card}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{s.label}</div>
            <div style={{ fontSize: 18, fontWeight: 850, marginTop: 6 }}>{s.value}</div>
          </div>
        ))}
      </section>

      {/* Data */}
      <section style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 12 }}>
        <div style={card}>
          <h2 style={{ margin: "0 0 10px" }}>Projects</h2>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "crimson" }}>{error}</p>}
          {!loading && projects.length === 0 && <p>No projects yet.</p>}
          <div style={{ display: "grid", gap: 10 }}>
            {projects.map((p) => (
              <div
                key={p._id}
                style={{
                  padding: 14,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <div style={{ fontWeight: 850 }}>{p.title || p.name}</div>
                {p.description && (
                  <div style={{ color: "rgba(255,255,255,0.68)", marginTop: 4 }}>
                    {p.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={card}>
          <h2 style={{ margin: "0 0 10px" }}>Qualifications</h2>
          {loading && <p>Loading...</p>}
          {!loading && qualifications.length === 0 && <p>No qualifications yet.</p>}
          <div style={{ display: "grid", gap: 10 }}>
            {qualifications.map((q) => (
              <div
                key={q._id}
                style={{
                  padding: 14,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <div style={{ fontWeight: 850 }}>{q.title || q.name}</div>
                {q.description && (
                  <div style={{ color: "rgba(255,255,255,0.68)", marginTop: 4 }}>
                    {q.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

