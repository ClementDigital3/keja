import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Detail from './pages/Detail'
import Trust from './pages/Trust'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { C, font } from './styles'

export default function App() {
  const [page, setPage] = useState('home')
  const [savedIds, setSavedIds] = useState([])
  const [selectedListing, setSelectedListing] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  const toggleSave = (id) =>
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const handleLogout = () => {
    setCurrentUser(null)
    setPage('home')
  }

  return (
    <div style={{ fontFamily: font.body, background: C.cream, minHeight: '100vh', color: C.dark }}>
      <Navbar
        page={page}
        setPage={setPage}
        savedCount={savedIds.length}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {page === 'home' && (
        <Home
          setPage={setPage}
          savedIds={savedIds}
          toggleSave={toggleSave}
          setSelectedListing={setSelectedListing}
          setSearchTerm={setSearchTerm}
          currentUser={currentUser}
        />
      )}

      {page === 'listings' && (
        <Listings
          savedIds={savedIds}
          toggleSave={toggleSave}
          setSelectedListing={setSelectedListing}
          setPage={setPage}
          initialSearch={searchTerm}
        />
      )}

      {page === 'detail' && selectedListing && (
        <Detail
          listing={selectedListing}
          setPage={setPage}
          saved={savedIds.includes(selectedListing.id)}
          toggleSave={toggleSave}
          currentUser={currentUser}
        />
      )}

      {page === 'trust' && <Trust setPage={setPage} />}
      {page === 'login' && <Login setPage={setPage} setCurrentUser={setCurrentUser} />}
      {page === 'signup' && <Signup setPage={setPage} setCurrentUser={setCurrentUser} />}

      <footer style={{
        background: C.dark, color: 'rgba(255,255,255,0.55)',
        textAlign: 'center', padding: '44px 24px', fontSize: 13,
      }}>
        <div style={{ fontFamily: font.display, fontSize: 22, color: '#F4A340', marginBottom: 8 }}>
          Keja.ke
        </div>
        <div>Kenya's trusted, scammer-free house rental platform.</div>
        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => setPage('trust')}>Trust & Safety</span>
          <span>·</span>
          <span>hello@keja.ke</span>
          <span>·</span>
          <span>+254 700 000 000</span>
          <span>·</span>
          <span>Nairobi, Kenya</span>
        </div>
        <div style={{ marginTop: 14, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
          © 2026 Keja Technologies Ltd. · Built in Kenya 🇰🇪
        </div>
      </footer>
    </div>
  )
}