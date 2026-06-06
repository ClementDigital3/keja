import { C, font, btn } from '../styles'
import { TAG_COLORS } from '../data'

export default function LandlordDashboard({ setPage, currentUser, listings = [], onDeleteListing }) {

  // Only show this landlord's listings
  const myListings = listings.filter(l => l.landlord === currentUser?.name)

  const totalListings  = myListings.length
  const available      = myListings.filter(l => l.available).length
  const taken          = myListings.filter(l => !l.available).length

  return (
    <div style={{ background: C.cream, minHeight: 'calc(100vh - 64px)', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: 12, color: C.terracotta, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
              Landlord Dashboard
            </p>
            <h1 style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
              Welcome, {currentUser?.name} 👋
            </h1>
            <p style={{ fontSize: 14, color: C.textSub }}>
              Manage your properties and track tenant interest.
            </p>
          </div>
          <button
            style={{ ...btn.primary, padding: '13px 28px', fontSize: 14, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8 }}
            onClick={() => setPage('listing-form')}
          >
            + List New Property
          </button>
        </div>

        {/* ── Stats ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 36 }}>
          {[
            { label: 'Total Listings', value: totalListings, icon: '🏠', color: '#E6F1FB', border: '#93C5E8', text: '#185FA5' },
            { label: 'Available',      value: available,     icon: '✅', color: '#EAF3DE', border: '#97C459', text: '#27500A' },
            { label: 'Taken',          value: taken,         icon: '🔒', color: '#FCEBEB', border: '#F09595', text: '#7A1F1F' },
          ].map(({ label, value, icon, color, border, text }) => (
            <div key={label} style={{
              background: color, border: `1.5px solid ${border}`,
              borderRadius: 16, padding: '20px 22px',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <span style={{ fontSize: 28 }}>{icon}</span>
              <div>
                <div style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: text, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 13, color: text, marginTop: 4, opacity: 0.8 }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Listings ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700 }}>Your Properties</h2>
          {myListings.length > 0 && (
            <span style={{ fontSize: 13, color: C.textMuted }}>{myListings.length} {myListings.length === 1 ? 'property' : 'properties'}</span>
          )}
        </div>

        {/* ── Empty State ── */}
        {myListings.length === 0 && (
          <div style={{
            background: C.white, border: `2px dashed ${C.border}`,
            borderRadius: 20, padding: '64px 40px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🏚</div>
            <h3 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
              No properties listed yet
            </h3>
            <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.8, marginBottom: 28, maxWidth: 380, margin: '0 auto 28px' }}>
              You haven't listed any properties yet. Add your first property and start receiving inquiries from verified tenants today.
            </p>
            <button
              style={{ ...btn.primary, padding: '14px 36px', fontSize: 15, borderRadius: 12 }}
              onClick={() => setPage('listing-form')}
            >
              + List Your First Property
            </button>
          </div>
        )}

        {/* ── Property Cards ── */}
        {myListings.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {myListings.map(l => (
              <div key={l.id} style={{
                background: C.white, border: `1.5px solid ${C.border}`,
                borderRadius: 16, overflow: 'hidden',
                display: 'grid', gridTemplateColumns: '200px 1fr auto',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}>
                {/* Image */}
                <div style={{ position: 'relative' }}>
                  <img
                    src={l.img}
                    alt={l.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 130 }}
                  />
                  {l.tag && (
                    <span style={{
                      position: 'absolute', top: 10, left: 10,
                      background: TAG_COLORS[l.tag] || '#555', color: '#fff',
                      borderRadius: 6, padding: '3px 10px',
                      fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                    }}>
                      {l.tag}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: '18px 20px' }}>
                  <div style={{ fontFamily: font.display, fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{l.title}</div>
                  <div style={{ fontSize: 13, color: C.textSub, marginBottom: 10 }}>📍 {l.location}</div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#555', marginBottom: 12 }}>
                    <span>🛏 {l.beds} bed</span>
                    <span>🚿 {l.baths} bath</span>
                    <span>🏠 {l.type}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: font.display, fontSize: 18, fontWeight: 700, color: C.terracotta }}>
                      KSh {l.price.toLocaleString()}<span style={{ fontSize: 12, color: C.textMuted, fontFamily: font.body, fontWeight: 400 }}>/mo</span>
                    </span>
                    <span style={{
                      background: l.available ? '#EAF3DE' : '#FCEBEB',
                      color: l.available ? '#27500A' : '#7A1F1F',
                      border: `1px solid ${l.available ? '#97C459' : '#F09595'}`,
                      borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 600,
                    }}>
                      {l.available ? '✅ Available' : '🔒 Taken'}
                    </span>
                    {l.postedAt && (
                      <span style={{ fontSize: 12, color: C.textMuted }}>Posted {l.postedAt}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div style={{
                  padding: '18px 20px', display: 'flex',
                  flexDirection: 'column', gap: 8, justifyContent: 'center',
                  borderLeft: `1px solid ${C.border}`, minWidth: 140,
                }}>
                  <button
                    style={{ ...btn.primary, padding: '9px 14px', fontSize: 13, width: '100%' }}
                    onClick={() => setPage('listing-form')}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    style={{
                      ...btn.ghost, padding: '9px 14px', fontSize: 13,
                      width: '100%', color: '#7A1F1F', borderColor: '#F09595',
                    }}
                    onClick={() => onDeleteListing && onDeleteListing(l.id)}
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Tips ── */}
        {myListings.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #2D3A1E, #1A1A1A)',
            borderRadius: 16, padding: '28px 32px',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: 16,
            marginTop: 32,
          }}>
            <div>
              <div style={{ fontFamily: font.display, fontSize: 18, color: '#FFFDF9', fontWeight: 700, marginBottom: 6 }}>
                Want more inquiries?
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,253,249,0.6)', lineHeight: 1.7 }}>
                Add more photos, write a detailed description, and price competitively for your area.
              </div>
            </div>
            <button
              style={{ ...btn.primary, padding: '12px 28px', fontSize: 14, borderRadius: 12, flexShrink: 0 }}
              onClick={() => setPage('listing-form')}
            >
              + Add Another Property
            </button>
          </div>
        )}
      </div>
    </div>
  )
}