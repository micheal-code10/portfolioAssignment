import { NavLink, Outlet } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  padding: "10px 12px",
  borderRadius: 14,
  fontWeight: 650,
  fontSize: 14,
  color: isActive ? "white" : "rgba(255,255,255,0.72)",
  background: isActive ? "rgba(124,92,255,0.22)" : "transparent",
  border: "1px solid rgba(255,255,255,0.10)",
  transition: "transform 120ms ease, background 120ms ease",
});

export default function Layout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(12px)",
          background: "rgba(11,15,20,0.75)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <nav
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <NavLink to="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 14,
                background:
                  "linear-gradient(135deg, rgba(124,92,255,0.8), rgba(34,197,94,0.55))",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            />
            <div style={{ lineHeight: 1.05 }}>
              <div style={{ fontWeight: 900, letterSpacing: 0.3 }}>Micheal</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                Portfolio
              </div>
            </div>
          </NavLink>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <NavLink to="/" style={linkStyle}>Home</NavLink>
            <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
            <NavLink to="/signin" style={linkStyle}>Sign in</NavLink>
          </div>
        </nav>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "26px 18px" }}>
        <Outlet />
      </main>

      <footer
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "22px 18px 34px",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        © {new Date().getFullYear()} Micheal Oloriegbe
      </footer>
    </div>
  );
}

