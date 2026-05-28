import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Detail from './pages/Detail'
import Trust from './pages/Trust'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ListingForm from './pages/ListingForm'
import LandlordDashboard from './pages/LandlordDashboard'
import TenantDashboard from './pages/TenantDashboard'
import { C, font } from './styles'
import { LISTINGS } from './data'
import { getSession, clearSession, getSavedListings, saveListings } from './storage'

export default function App() {
  const [page, setPage]                       = useState(() => {
    const s = getSession()
    if (!s) return 'home'
    return s.role === 'landlord' ? 'dashboard' : 'tenant-dashboard'
  })
  const [savedIds, setSavedIds]               = useState([])
  const [selectedListing, setSelectedListing] = useState(null)
  const [searchTerm, setSearchTerm]           = useState('')
  const [currentUser, setCurrentUser]         = useState(() => getSession())
  const [allListings, setAllListings]         = useState(() => {
    const stored = getSavedListings()
    return stored.length > 0
      ? [...stored, ...LISTINGS.filter(l => !stored.find(s => s.id === l.id))]
      : LISTINGS
  })

  const toggleSave = (id) =>
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const handleLogout = () => {
    clearSession()
    setCurrentUser(null)
    setPage('home')
  }

  const handleAddListing = (newListing) => {
    setAllListings(prev => {
      const updated = [newListing, ...prev]
      saveListings(updated)
      return updated
    })
  }

  const handleDeleteListing = (id) => {
    setAllListings(prev => {
      const updated = prev.filter(l => l.id !== id)
      saveListings(updated)
      return updated
    })
  }

  const handleSetCurrentUser = (u) => {
    setCurrentUser(u)
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
          listings={allListings}
        />
      )}

      {page === 'listings' && (
        <Listings
          savedIds={savedIds}
          toggleSave={toggleSave}
          setSelectedListing={setSelectedListing}
          setPage={setPage}
          initialSearch={searchTerm}
          listings={allListings}
          currentUser={currentUser}
        />
      )}

      {page === 'detail' && selectedListing && (
        <Detail
          listing={selectedListing}
          setPage={setPage}
          saved={savedIds.includes(selectedListing.id)}
          toggleSave={toggleSave}
          currentUser={currentUser}
          setCurrentUser={handleSetCurrentUser}
        />
      )}

      {page === 'dashboard' && (
        <LandlordDashboard
          setPage={setPage}
          currentUser={currentUser}
          listings={allListings}
          onDeleteListing={handleDeleteListing}
        />
      )}

      {page === 'tenant-dashboard' && (
        <TenantDashboard
          currentUser={currentUser}
          setCurrentUser={handleSetCurrentUser}
          setPage={setPage}
          savedIds={savedIds}
          toggleSave={toggleSave}
          listings={allListings}
          setSelectedListing={setSelectedListing}
        />
      )}

      {page === 'trust'        && <Trust setPage={setPage} />}
      {page === 'login'        && <Login setPage={setPage} setCurrentUser={setCurrentUser} />}
      {page === 'signup'       && <Signup setPage={setPage} setCurrentUser={setCurrentUser} />}
      {page === 'listing-form' && (
        <ListingForm
          setPage={setPage}
          currentUser={currentUser}
          onAddListing={handleAddListing}
        />
      )}

      <footer style={{
        background: C.dark, color: 'rgba(255,255,255,0.55)',
        textAlign: 'center', padding: '44px 24px', fontSize: 13,
      }}>
        <div style={{ fontFamily: font.display, fontSize: 22, color: '#F4A340', marginBottom: 8 }}>Keja.ke</div>
        <div>Kenya's trusted, scammer-free house rental platform.</div>
        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => setPage('trust')}>Trust & Safety</span>
          <span>·</span><span>hello@keja.ke</span>
          <span>·</span><span>+254 700 000 000</span>
          <span>·</span><span>Nairobi, Kenya</span>
        </div>
        <div style={{ marginTop: 14, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
          © 2025 Keja Technologies Ltd. · Built in Kenya 🇰🇪
        </div>
      </footer>
    </div>
  )
}