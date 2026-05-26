import { C, btn, font } from '../styles'

export default function Navbar({ page, setPage, savedCount, currentUser, onLogout }) {
  const link = (p, label) => (
    <span
      key={p}
      onClick={() => setPage(p)}
      style={{
        fontSize: 14, color: page === p ? C.terracotta : C.textSub,
        cursor: 'pointer', fontWeight: page === p ? 700 : 500,
        borderBottom: page === p ? `2px solid ${C.terracotta}` : '2px solid transparent',
        paddingBottom: 2, transition: 'all .15s',
      }}
    >
      {label}
    </span>
  )

  return (
    <nav style={{
      background: C.white, borderBottom: `1.5px solid ${C.border}`,
      padding: '0 32px', height: 64, display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
      boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
    }}>
      <div
        onClick={() => setPage('home')}
        style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.terracotta, cursor: 'pointer', flexShrink: 0 }}
      >
        Keja<span style={{ fontSize: 13, color: '#aaa', fontFamily: font.body, fontWeight: 400 }}>.ke</span>
      </div>

      <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
        {link('home', 'Home')}
        {link('listings', 'Listings')}
        {link('trust', 'Trust & Safety')}

        {savedCount > 0 && (
          <span style={{
            background: '#FEF3E2', color: C.terracotta,
            borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 700,
          }}>
            ♥ {savedCount} saved
          </span>
        )}

        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: currentUser.role === 'landlord' ? '#2D6A4F' : C.terracotta,
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, flexShrink: 0,
            }}>
              {currentUser.name[0].toUpperCase()}
            </div>
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{currentUser.name}</div>
              <div style={{ fontSize: 11, color: '#aaa', textTransform: 'capitalize' }}>{currentUser.role}</div>
            </div>
            <button
              onClick={onLogout}
              style={{ ...btn.ghost, padding: '7px 14px', fontSize: 12 }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              style={{ ...btn.ghost, padding: '8px 18px', fontSize: 13 }}
              onClick={() => setPage('login')}
            >
              Sign in
            </button>
            <button
              style={{ ...btn.primary, padding: '8px 18px', fontSize: 13 }}
              onClick={() => setPage('signup')}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}