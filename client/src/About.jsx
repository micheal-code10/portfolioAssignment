export default function About() {
  return (
    <section style={{ display: "grid", gap: "1rem", alignItems: "start" }}>
      <h1>About Me</h1>
      <img src="/me.jpg" alt="Ifedapo Micheal Oloriegbe" width="160" style={{ borderRadius: 12 }} />
      <p>
        I’m Ifedapo Micheal Oloriegbe — a React-focused developer and content creator
        who enjoys clean UI, consistent brand visuals, and fast iterations.
      </p>
      <a className="btn" href="/resume.pdf" target="_blank" rel="noreferrer">View Resume (PDF)</a>
    </section>
  );
}

