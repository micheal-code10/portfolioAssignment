export default function Home() {
  return (
    <section style={{ display: "grid", gap: "0.75rem", paddingTop: "2rem" }}>
      <h1>Welcome — I’m Micheal</h1>
      <p>Mission: build clean, fast experiences on the web and keep leveling up.</p>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
        <a className="btn" href="/about" style={btnStyle}>
          About Me
        </a>
        <a className="btn outline" href="/projects" style={{ ...btnStyle, background: "transparent", border: "1px solid #3b4252" }}>
          View Projects
        </a>
      </div>
    </section>
  );
}

const btnStyle = {
  display: "inline-block",
  padding: "0.6rem 1rem",
  borderRadius: "10px",
  background: "#2a2f3a",
  color: "#e7eaf0",
  textDecoration: "none",
};


