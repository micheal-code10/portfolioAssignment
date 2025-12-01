// Uses images from /public/img (p1.jpg, p2.jpg, p3.jpg)
import "./styles/projects.scss";

const projects = [
  {
    id: 1,
    title: "Portfolio Site",
    desc: "Vite + React + SCSS",
    img: "/img/p1.jpg",
    link: "#",
    repo: "#",
  },
  {
    id: 2,
    title: "E-commerce UI",
    desc: "Responsive grid & cart flow",
    img: "/img/p2.jpg",
    link: "#",
    repo: "#",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    desc: "Cards & charts view",
    img: "/img/p3.jpg",
    link: "#",
    repo: "#",
  },
];

export default function Projects() {
  return (
    <section>
      <h1>Projects</h1>
      <div className="projects-grid">
        {projects.map((p) => (
          <article key={p.id} className="card">
            <img src={p.img} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="actions">
              <a href={p.link}>Live</a>
              <a href={p.repo}>Code</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


