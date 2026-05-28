import { C, btn, font } from '../styles'

export default function Navbar({ page, setPage, savedCount, currentUser, onLogout }) {

  const dashPage = currentUser?.role === 'landlord' ? 'dashboard' : 'tenant-dashboard'

  const navLink = (targetPage, label) => {
    const isActive = page === targetPage
    return (
      <span
        onClick={() => setPage(targetPage)}
        style={{
          fontSize: 14, cursor: 'pointer', fontWeight: isActive ? 700 : 500,
          color: isActive ? C.terracotta : C.textSub,
          borderBottom: isActive ? `2px solid ${C.terracotta}` : '2px solid transparent',
          paddingBottom: 2, transition: 'all .15s', whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    )
  }

  return (
    <nav style={{
      background: C.white, borderBottom: `1.5px solid ${C.border}`,
      padding: '0 32px', height: 64, display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
      boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
    }}>

      {/* Logo */}
      <div
        onClick={() => setPage(currentUser ? dashPage : 'home')}
        style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.terracotta, cursor: 'pointer', flexShrink: 0 }}
      >
        Keja<span style={{ fontSize: 13, color: '#aaa', fontFamily: font.body, fontWeight: 400 }}>.ke</span>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>

        {/* Always visible */}
        {!currentUser && navLink('home', 'Home')}
        {navLink('listings', 'Listings')}

        {/* Logged-in links */}
        {currentUser && (
          <>
            {navLink(dashPage, currentUser.role === 'landlord' ? '🏢 My Dashboard' : '🏠 My Dashboard')}
            {currentUser.role === 'landlord' && navLink('listing-form', '+ Add Property')}
          </>
        )}

        {!currentUser && navLink('trust', 'Trust & Safety')}

        {/* Saved heart */}
        {savedCount > 0 && currentUser?.role === 'tenant' && (
          <span
            onClick={() => setPage('tenant-dashboard')}
            style={{ background: '#FEF3E2', color: C.terracotta, borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
          >
            ♥ {savedCount} saved
          </span>
        )}

        {/* Auth area */}
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 8, paddingLeft: 16, borderLeft: `1px solid ${C.border}` }}>
            {/* Avatar — clickable to dashboard */}
            <div
              onClick={() => setPage(dashPage)}
              style={{
                width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                background: currentUser.role === 'landlord' ? '#2D6A4F' : C.terracotta,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
                border: [dashPage, 'dashboard', 'tenant-dashboard'].includes(page) ? `2px solid ${C.terracotta}` : '2px solid transparent',
                transition: 'border .2s',
              }}
              title="Go to dashboard"
            >
              {(currentUser.firstName || currentUser.name || '?')[0].toUpperCase()}
            </div>
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>
                {currentUser.firstName || currentUser.name}
              </div>
              <div style={{ fontSize: 11, color: '#aaa', textTransform: 'capitalize' }}>
                {currentUser.role}
                {currentUser.role === 'tenant' && currentUser.subscriptionPaid && (
                  <span style={{ color: '#27500A', fontWeight: 700 }}> · Active ✓</span>
                )}
              </div>
            </div>
            <button onClick={onLogout} style={{ ...btn.ghost, padding: '6px 12px', fontSize: 12 }}>
              Sign out
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8, marginLeft: 8 }}>
            <button style={{ ...btn.ghost, padding: '8px 18px', fontSize: 13 }} onClick={() => setPage('login')}>Sign in</button>
            <button style={{ ...btn.primary, padding: '8px 18px', fontSize: 13 }} onClick={() => setPage('signup')}>Register</button>
          </div>
        )}
      </div>
    </nav>
  )
}