import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <header style={{
        position: "sticky", top: 0, zIndex: 10,
        backdropFilter: "blur(10px)",
        background: "rgba(11,15,20,0.72)",
        borderBottom: "1px solid rgba(255,255,255,0.08)"
      }}>
        <nav style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 18
        }}>
          <div style={{ fontWeight: 800, letterSpacing: 0.3 }}>
            Micheal • Portfolio
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {[
              { to: "/", label: "Home" },
              { to: "/contact", label: "Contact" },
              { to: "/signin", label: "Sign in" },
            ].map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                style={({ isActive }) => ({
                  padding: "8px 12px",
                  borderRadius: 12,
                  fontWeight: 600,
                  color: isActive ? "white" : "rgba(255,255,255,0.7)",
                  background: isActive ? "rgba(124,92,255,0.25)" : "transparent",
                  border: "1px solid rgba(255,255,255,0.08)"
                })}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>
        <Outlet />
      </main>

      <footer style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px", color: "rgba(255,255,255,0.55)" }}>
        © {new Date().getFullYear()} Micheal Oloriegbe
      </footer>
    </div>
  );
}
