import { NavLink, Link } from "react-router-dom";

const linkBase = {
  color: "white",
  textDecoration: "none",
  padding: "0.5rem 0.75rem",
  borderRadius: "8px",
  fontSize: "0.95rem",
};

export default function NavBar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "1rem",
        background: "#141722",
        borderBottom: "1px solid #2a2f3a",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Custom logo (use /me.jpg in public/) */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "white",
          textDecoration: "none",
          marginRight: "0.5rem",
          fontWeight: 700,
        }}
      >
        <img
          src="/me.jpg"
          alt="logo"
          width="32"
          height="32"
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
        Micheal
      </Link>

      {[
        ["Home", "/"],
        ["About", "/about"],
        ["Projects", "/projects"],
        ["Services", "/services"],
        ["Education", "/education"],
        ["Contact", "/contact"],
      ].map(([label, to]) => (
        <NavLink
          key={to}
          to={to}
          style={({ isActive }) => ({
            ...linkBase,
            background: isActive ? "#2a2f3a" : "transparent",
          })}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

