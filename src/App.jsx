import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Detail from './pages/Detail'
import Trust from './pages/Trust'
import { C, font } from './styles'

export default function App() {
  const [page, setPage] = useState("home")
  const [savedIds, setSavedIds] = useState([])
  const [selectedListing, setSelectedListing] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleSave = (id) =>
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <div style={{ fontFamily: font.body, background: C.cream, minHeight: "100vh", color: C.dark }}>
      <Navbar
        page={page}
        setPage={setPage}
        savedCount={savedIds.length}
      />

      {page === "home" && (
        <Home
          setPage={setPage}
          savedIds={savedIds}
          toggleSave={toggleSave}
          setSelectedListing={setSelectedListing}
          setSearchTerm={setSearchTerm}
        />
      )}

      {page === "listings" && (
        <Listings
          savedIds={savedIds}
          toggleSave={toggleSave}
          setSelectedListing={setSelectedListing}
          setPage={setPage}
          initialSearch={searchTerm}
        />
      )}

      {page === "detail" && selectedListing && (
        <Detail
          listing={selectedListing}
          setPage={setPage}
          saved={savedIds.includes(selectedListing.id)}
          toggleSave={toggleSave}
        />
      )}

      {page === "trust" && <Trust />}

      {/* Footer */}
      <footer style={{
        background: C.dark, color: "rgba(255,255,255,0.55)",
        textAlign: "center", padding: "44px 24px", marginTop: page === "home" ? 0 : 0,
        fontSize: 13,
      }}>
        <div style={{ fontFamily: font.display, fontSize: 22, color: "#F4A340", marginBottom: 8 }}>
          Keja.ke
        </div>
        <div>Kenya's trusted, scammer-free house rental platform.</div>
        <div style={{ marginTop: 6, display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          <span style={{ cursor: "pointer" }} onClick={() => setPage("trust")}>Trust & Safety</span>
          <span>·</span>
          <span>hello@keja.ke</span>
          <span>·</span>
          <span>+254 700 000 000</span>
          <span>·</span>
          <span>Nairobi, Kenya</span>
        </div>
        <div style={{ marginTop: 14, color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
          © 2025 Keja Technologies Ltd. &nbsp;·&nbsp; Built in Kenya 🇰🇪
        </div>
      </footer>
    </div>
  )
}
