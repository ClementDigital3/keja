import { useState, useEffect } from 'react'
import { C, font, btn } from '../styles'
import { NEIGHBORHOODS } from '../data'
import PropertyCard from '../components/PropertyCard'

export default function Home({ setPage, savedIds, toggleSave, setSelectedListing, setSearchTerm, currentUser, listings = [] }) {
  const [heroVisible, setHeroVisible] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => { setTimeout(() => setHeroVisible(true), 80) }, [])

  const handleSearch = () => { setSearchTerm(search); setPage('listings') }

  const featured = listings.filter(l =>
    l.tag === 'Featured' || l.tag === 'Luxury' || l.tag === 'New'
  ).slice(0, 3)

  // ── Logged-in tenant sees a trimmed browse page ───────────────────
  if (currentUser?.role === 'tenant') {
    return (
      <div style={{ background: C.cream, minHeight: 'calc(100vh - 64px)' }}>

        {/* Tenant welcome bar */}
        <div style={{
          background: 'linear-gradient(135deg, #1A1A1A 0%, #2D3A1E 100%)',
          padding: '36px 32px',
        }}>
          <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <h1 style={{ fontFamily: font.display, fontSize: 'clamp(22px, 4vw, 32px)', color: '#FFFDF9', fontWeight: 700, marginBottom: 8 }}>
                What are you looking for today, {currentUser.firstName || currentUser.name}?
              </h1>
              <p style={{ fontSize: 14, color: 'rgba(255,253,249,0.65)', lineHeight: 1.6 }}>
                Browse {listings.filter(l => l.available).length} available properties across Nairobi.
              </p>
            </div>
            <div style={{
              background: C.white, borderRadius: 14, padding: '6px 6px 6px 18px',
              display: 'flex', gap: 8, alignItems: 'center', minWidth: 340, flexShrink: 0,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}>
              <span>🔍</span>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Search location, type..."
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, fontFamily: font.body, background: 'transparent' }}
              />
              <button style={{ ...btn.primary, borderRadius: 10, padding: '10px 22px', fontSize: 14 }} onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '40px 24px 64px' }}>

          {/* Neighbourhoods */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700 }}>Browse by Area</h2>
              <span onClick={() => setPage('listings')} style={{ fontSize: 14, color: C.terracotta, fontWeight: 600, cursor: 'pointer' }}>See all →</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: 10 }}>
              {NEIGHBORHOODS.map(n => (
                <div key={n.name} onClick={() => setPage('listings')}
                  style={{ height: 100, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', position: 'relative', backgroundImage: `url(${n.img})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform .2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }} />
                  <span style={{ position: 'absolute', bottom: 9, left: 11, color: '#fff', fontWeight: 700, fontSize: 12 }}>{n.name}</span>
                  <span style={{ position: 'absolute', bottom: 9, right: 9, color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>{n.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700 }}>Featured Properties</h2>
              <span onClick={() => setPage('listings')} style={{ fontSize: 14, color: C.terracotta, fontWeight: 600, cursor: 'pointer' }}>View all →</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 22 }}>
              {featured.map(l => (
                <PropertyCard key={l.id} listing={l}
                  saved={savedIds.includes(l.id)}
                  onToggleSave={toggleSave}
                  onView={(listing) => { setSelectedListing(listing); setPage('detail') }}
                />
              ))}
            </div>
          </div>

          {/* Subscription nudge if not paid */}
          {!currentUser.subscriptionPaid && (
            <div style={{
              background: 'linear-gradient(135deg, #2D3A1E 0%, #1A1A1A 100%)',
              borderRadius: 20, padding: '36px 36px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexWrap: 'wrap', gap: 20,
            }}>
              <div>
                <h3 style={{ fontFamily: font.display, fontSize: 22, color: '#FFFDF9', fontWeight: 700, marginBottom: 8 }}>
                  Want to contact this landlord?
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,253,249,0.6)', maxWidth: 440, lineHeight: 1.7 }}>
                  Activate your account for KSh 500/year and contact unlimited landlords directly — no limits, no extra charges.
                </p>
              </div>
              <button style={{ ...btn.primary, padding: '14px 32px', fontSize: 15, borderRadius: 12, flexShrink: 0 }}
                onClick={() => setPage('tenant-dashboard')}>
                Activate — KSh 500 →
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── Logged-in landlord → send straight to their dashboard ─────────
  if (currentUser?.role === 'landlord') {
    setPage('dashboard')
    return null
  }

  // ── Guest / not logged in → full landing page ─────────────────────
  return (
    <div style={{ background: C.cream }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #2D3A1E 55%, #C4522A 100%)',
        padding: '88px 24px 72px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=1400&q=50')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div style={{
          position: 'relative', zIndex: 2,
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'all 1s cubic-bezier(.22,1,.36,1)',
        }}>
          <span style={{ display: 'inline-block', background: 'rgba(196,82,42,0.25)', border: '1px solid rgba(196,82,42,0.45)', color: '#F4A340', borderRadius: 20, padding: '5px 18px', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 22 }}>
            🇰🇪 Kenya's Trusted Rental Platform
          </span>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(34px, 6vw, 64px)', color: '#FFFDF9', fontWeight: 700, lineHeight: 1.1, marginBottom: 18, letterSpacing: -1 }}>
            Find Your Next<br /><span style={{ color: '#F4A340', fontStyle: 'italic' }}>Keja</span> in Kenya
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,253,249,0.7)', marginBottom: 40, maxWidth: 460, margin: '0 auto 40px' }}>
            Thousands of verified houses, apartments, and studios — scammer-free, every listing guaranteed.
          </p>
          <div style={{ background: '#FFFDF9', borderRadius: 16, padding: '6px 6px 6px 20px', display: 'flex', alignItems: 'center', maxWidth: 600, margin: '0 auto', boxShadow: '0 10px 40px rgba(0,0,0,0.28)', gap: 8 }}>
            <span style={{ fontSize: 18 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Search by location, type, or name..."
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, background: 'transparent', fontFamily: font.body, color: C.dark }} />
            <button style={{ ...btn.primary, borderRadius: 12, padding: '13px 30px', fontSize: 15 }} onClick={handleSearch}>Search</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 52, flexWrap: 'wrap' }}>
            {[['2,400+', 'Active Listings'], ['180+', 'Verified Agents'], ['47', 'Nairobi Areas'], ['100%', 'Scammer-Free']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: '#F4A340' }}>{n}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,253,249,0.6)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar — updated to match new model */}
      <div style={{ background: 'linear-gradient(90deg, #2D3A1E, #1A1A1A)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
        {[['👤', 'Registered users only'], ['💳', 'Landlords pay to list'], ['💵', 'Tenants pay on site'], ['🚫', 'Zero online fraud']].map(([ic, txt]) => (
          <div key={txt} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,253,249,0.8)', fontSize: 13 }}>
            <span style={{ fontSize: 18 }}>{ic}</span> {txt}
          </div>
        ))}
        <span onClick={() => setPage('trust')} style={{ color: '#F4A340', fontSize: 13, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>How it works →</span>
      </div>

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '56px 24px 0' }}>

        {/* Neighbourhoods */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 12, color: C.terracotta, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Browse by Area</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
            <h2 style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700 }}>Popular Neighbourhoods</h2>
            <span onClick={() => setPage('listings')} style={{ fontSize: 14, color: C.terracotta, fontWeight: 600, cursor: 'pointer' }}>See all →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
            {NEIGHBORHOODS.map(n => (
              <div key={n.name} onClick={() => setPage('listings')}
                style={{ height: 110, borderRadius: 14, overflow: 'hidden', cursor: 'pointer', position: 'relative', backgroundImage: `url(${n.img})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform .22s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)' }} />
                <span style={{ position: 'absolute', bottom: 10, left: 12, color: '#fff', fontWeight: 700, fontSize: 13 }}>{n.name}</span>
                <span style={{ position: 'absolute', bottom: 10, right: 10, color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>{n.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 12, color: C.terracotta, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Hand-Picked</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <h2 style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700 }}>Featured Properties</h2>
            <span onClick={() => setPage('listings')} style={{ fontSize: 14, color: C.terracotta, fontWeight: 600, cursor: 'pointer' }}>View all →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 24 }}>
            {featured.map(l => (
              <PropertyCard key={l.id} listing={l}
                saved={savedIds.includes(l.id)} onToggleSave={toggleSave}
                onView={(listing) => { setSelectedListing(listing); setPage('detail') }}
              />
            ))}
          </div>
        </div>

        {/* Two CTAs side by side — for guests only */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 64 }}>
          <div style={{ background: 'linear-gradient(135deg, #2D3A1E 0%, #1A1A1A 100%)', borderRadius: 20, padding: '36px 32px' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🏢</div>
            <h3 style={{ fontFamily: font.display, fontSize: 20, color: '#FFFDF9', fontWeight: 700, marginBottom: 8 }}>Are you a landlord?</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,253,249,0.6)', lineHeight: 1.7, marginBottom: 22 }}>
              Register for KSh 2,000/year and list unlimited properties. Reach thousands of verified tenants directly.
            </p>
            <button style={{ ...btn.primary, padding: '12px 24px', fontSize: 14, borderRadius: 12 }} onClick={() => setPage('signup')}>
              List Your Property →
            </button>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #C4522A 0%, #8B2E10 100%)', borderRadius: 20, padding: '36px 32px' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🏠</div>
            <h3 style={{ fontFamily: font.display, fontSize: 20, color: '#FFFDF9', fontWeight: 700, marginBottom: 8 }}>Looking for a house?</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,253,249,0.6)', lineHeight: 1.7, marginBottom: 22 }}>
              Register free, browse verified listings, and pay KSh 500 only after you've met the landlord in person.
            </p>
            <button style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: font.body }} onClick={() => setPage('signup')}>
              Register Free →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}