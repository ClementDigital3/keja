import { C, btn, font } from '../styles'

export default function Navbar({ page, setPage, savedCount }) {
  const link = (p, label) => (
    <span
      key={p}
      onClick={() => setPage(p)}
      style={{
        fontSize: 14, color: page === p ? C.terracotta : C.textSub,
        cursor: "pointer", fontWeight: page === p ? 700 : 500,
        borderBottom: page === p ? `2px solid ${C.terracotta}` : "2px solid transparent",
        paddingBottom: 2, transition: "all .15s",
      }}
    >
      {label}
    </span>
  )

  return (
    <nav style={{
      background: C.white, borderBottom: `1.5px solid ${C.border}`,
      padding: "0 32px", height: 64, display: "flex",
      alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 100,
      boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
    }}>
      <div
        onClick={() => setPage("home")}
        style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.terracotta, cursor: "pointer" }}
      >
        Keja<span style={{ fontSize: 13, color: C.textMuted, fontFamily: font.body, fontWeight: 400 }}>.ke</span>
      </div>

      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {link("home", "Home")}
        {link("listings", "Listings")}
        {link("trust", "Trust & Safety")}

        {savedCount > 0 && (
          <span style={{
            background: "#FEF3E2", color: C.terracotta,
            borderRadius: 20, padding: "4px 12px",
            fontSize: 13, fontWeight: 700,
          }}>
            ♥ {savedCount} saved
          </span>
        )}

        <button
          style={{ ...btn.primary, padding: "9px 20px", fontSize: 13 }}
          onClick={() => setPage("listings")}
        >
          + List Property
        </button>
      </div>
    </nav>
  )
}
