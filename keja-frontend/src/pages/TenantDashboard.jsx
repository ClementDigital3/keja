import { useState } from 'react'
import { C, font, btn } from '../styles'
import { isTenantSubscribed } from '../storage'
import { api } from '../api'
import PaymentModal from '../components/PaymentModal'
import PropertyCard from '../components/PropertyCard'

const PERKS = [
  { icon: '💬', title: 'Contact any landlord directly', desc: 'Message or call landlords without limits for 30 days.' },
  { icon: '📍', title: 'View full property address', desc: 'See the exact location and street address of every listing.' },
  { icon: '🔔', title: 'New listing alerts', desc: 'Be the first to know when a new property is listed in your area.' },
  { icon: '❤️', title: 'Save unlimited properties', desc: 'Bookmark as many listings as you want and compare them side by side.' },
  { icon: '📞', title: 'Direct landlord phone numbers', desc: "Call landlords directly — no middleman, no delays." },
  { icon: '🏆', title: 'Priority tenant badge', desc: 'Landlords see you as a verified, serious tenant. Stand out from the crowd.' },
]

export default function TenantDashboard({ currentUser, setCurrentUser, setPage, savedIds, toggleSave, listings = [], setSelectedListing }) {
  const [showPayment, setShowPayment]   = useState(false)
  const [mpesaCode, setMpesaCode]       = useState('')
  const [mpesaSent, setMpesaSent]       = useState(false)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState('')
  const [paySuccess, setPaySuccess]     = useState(false)

  const subscribed = isTenantSubscribed(currentUser)
  const savedListings = listings.filter(l => savedIds.includes(l.id))

  const handleActivate = async () => {
    setError('')
    if (!mpesaCode.trim()) { setError('Enter your M-Pesa confirmation code.'); return }
    if (!/^[A-Z0-9]{8,12}$/i.test(mpesaCode.trim())) { setError('Invalid M-Pesa code (e.g. RG7KL1MXYZ).'); return }

    setLoading(true)
    try {
      const res = await api.verifyMpesa(mpesaCode.trim())
      setLoading(false)
      if (res.success && res.user) {
        setCurrentUser(res.user)
        setPaySuccess(true)
      } else {
        setError('Verification failed. Invalid code.')
      }
    } catch (err) {
      setLoading(false)
      setError(err.message || 'Error verifying payment. Please try again.')
    }
  }

  const handleHouseFound = async () => {
    if (window.confirm("Congratulations! Are you sure you want to mark your house as found? This will immediately expire your active search access.")) {
      try {
        const res = await api.markHouseFound()
        if (res.success && res.user) {
          setCurrentUser(res.user)
        }
      } catch (err) {
        alert(err.message || 'Failed to update status')
      }
    }
  }

  const handleResetSearch = async () => {
    try {
      const res = await api.resetSearch()
      if (res.success && res.user) {
        setCurrentUser(res.user)
      }
    } catch (err) {
      alert(err.message || 'Failed to reset search')
    }
  }

  const expiryDate = currentUser?.subscriptionExpiry
    ? new Date(currentUser.subscriptionExpiry).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <div style={{ background: C.cream, minHeight: 'calc(100vh - 64px)', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 12, color: C.terracotta, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
            Tenant Dashboard
          </p>
          <h1 style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
            Welcome, {currentUser?.firstName || currentUser?.name} 👋
          </h1>
          <p style={{ fontSize: 14, color: C.textSub }}>
            {subscribed
              ? 'Your account is active. Contact any landlord directly.'
              : 'Activate your account to start contacting landlords.'}
          </p>
        </div>

        {/* ── Subscription card ── */}
        {currentUser?.houseFound ? (
          <div style={{
            background: '#EAF3DE', border: '1.5px solid #97C459',
            borderRadius: 16, padding: '24px 28px', marginBottom: 36,
            display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
          }}>
            <div style={{ fontSize: 40 }}>🎉</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: font.display, fontSize: 18, fontWeight: 700, color: '#1A5C35', marginBottom: 4 }}>
                Congrats on finding your new home! 🏡
              </div>
              <div style={{ fontSize: 14, color: '#3B7A50' }}>
                Your KSh 500 active search has expired because you found a house. Good luck with your move!
              </div>
            </div>
            <button
              style={{ ...btn.primary, padding: '10px 20px', fontSize: 13, borderRadius: 10 }}
              onClick={handleResetSearch}
            >
              🔄 Start a New Search
            </button>
          </div>
        ) : !subscribed ? (
          <div style={{
            background: 'linear-gradient(135deg, #1A1A1A 0%, #2D3A1E 100%)',
            borderRadius: 20, padding: '36px 36px', marginBottom: 36,
            display: 'grid', gridTemplateColumns: '1fr auto', gap: 24,
            alignItems: 'center', flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(196,82,42,0.3)', border: '1px solid rgba(196,82,42,0.5)', borderRadius: 20, padding: '4px 14px', marginBottom: 14 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F4A340', display: 'inline-block' }} />
                <span style={{ fontSize: 12, color: '#F4A340', fontWeight: 700 }}>INACTIVE — KSh 500 / month</span>
              </div>
              <h2 style={{ fontFamily: font.display, fontSize: 22, color: '#FFFDF9', fontWeight: 700, marginBottom: 10 }}>
                Unlock Full Access
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(255,253,249,0.65)', lineHeight: 1.8, maxWidth: 480 }}>
                Pay KSh 500 once and contact landlords for 30 days (expires early if you find a house). No hidden charges.
              </p>
            </div>
            <button
              style={{ ...btn.primary, padding: '14px 32px', fontSize: 15, borderRadius: 12, flexShrink: 0 }}
              onClick={() => setShowPayment(true)}
            >
              Pay KSh 500 →
            </button>
          </div>
        ) : (
          <div style={{
            background: '#EAF3DE', border: '1.5px solid #97C459',
            borderRadius: 16, padding: '22px 28px', marginBottom: 36,
            display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
          }}>
            <div style={{ fontSize: 40 }}>✅</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <div style={{ fontFamily: font.display, fontSize: 18, fontWeight: 700, color: '#1A5C35' }}>Account Active</div>
                <span style={{ background: '#27500A', color: '#fff', borderRadius: 20, padding: '2px 12px', fontSize: 11, fontWeight: 700 }}>SUBSCRIBED</span>
              </div>
              <div style={{ fontSize: 14, color: '#3B7A50' }}>
                You can contact unlimited landlords · Expires <strong>{expiryDate}</strong>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
              <button
                style={{
                  background: C.terracotta, color: '#fff', border: 'none',
                  borderRadius: 10, padding: '10px 18px', fontSize: 13,
                  fontWeight: 700, cursor: 'pointer', fontFamily: font.body,
                  boxShadow: '0 2px 8px rgba(196,82,42,0.2)',
                }}
                onClick={handleHouseFound}
              >
                🎉 I Found a House!
              </button>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, color: '#1A5C35' }}>KSh 500</div>
                <div style={{ fontSize: 12, color: '#3B7A50' }}>paid · 30 days</div>
              </div>
            </div>
          </div>
        )}

        {/* Scam Warning Alert */}
        <div style={{
          background: '#FDF2F2', border: '1.5px solid #F8B4B4',
          borderRadius: 14, padding: '16px 20px', marginBottom: 28,
          fontSize: 13, color: '#9B1C1C', lineHeight: 1.5,
        }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🚨</span> Scam Prevention Rule
          </div>
          Every transaction must happen on-site. <strong>Always meet the landlord in person at the property before paying rent or deposits.</strong> Do not pay online booking fees or "reservation deposits" to any landlord beforehand. Anyone requesting this is a scammer.
        </div>

        {/* ── Stats ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 36 }}>
          {[
            { label: 'Saved Properties', value: savedListings.length, icon: '❤️', color: '#FAECE7', border: '#F4A894', text: '#7A2D14' },
            { label: 'Available to Contact', value: subscribed ? listings.filter(l => l.available).length : 0, icon: '📞', color: subscribed ? '#EAF3DE' : '#F5F5F5', border: subscribed ? '#97C459' : '#DDD', text: subscribed ? '#27500A' : '#AAA' },
            { label: 'Subscription', value: subscribed ? 'Active' : 'Inactive', icon: subscribed ? '🏆' : '🔒', color: subscribed ? '#E6F1FB' : '#FCEBEB', border: subscribed ? '#93C5E8' : '#F09595', text: subscribed ? '#185FA5' : '#7A1F1F' },
          ].map(({ label, value, icon, color, border, text }) => (
            <div key={label} style={{ background: color, border: `1.5px solid ${border}`, borderRadius: 16, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 28 }}>{icon}</span>
              <div>
                <div style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: text, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 12, color: text, marginTop: 4, opacity: 0.8 }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Perks ── */}
        {!subscribed && (
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
              What you get for KSh 500 / month
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
              {PERKS.map(p => (
                <div key={p.title} style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: '18px 20px', display: 'flex', gap: 14 }}>
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{p.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.6 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Saved properties ── */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700 }}>Saved Properties</h2>
            <button style={{ ...btn.ghost, padding: '8px 16px', fontSize: 13 }} onClick={() => setPage('listings')}>
              Browse Listings →
            </button>
          </div>

          {savedListings.length === 0 ? (
            <div style={{ background: C.white, border: `2px dashed ${C.border}`, borderRadius: 20, padding: '48px 40px', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 14 }}>❤️</div>
              <h3 style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No saved properties yet</h3>
              <p style={{ fontSize: 14, color: C.textSub, marginBottom: 24, lineHeight: 1.8 }}>
                Browse listings and tap the heart icon to save properties you're interested in.
              </p>
              <button style={{ ...btn.primary, padding: '12px 28px', fontSize: 14, borderRadius: 12 }} onClick={() => setPage('listings')}>
                Browse Listings →
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {savedListings.map(l => (
                <PropertyCard
                  key={l.id} listing={l}
                  saved={true}
                  onToggleSave={toggleSave}
                  onView={(listing) => { setSelectedListing(listing); setPage('detail') }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Payment Modal ── */}
      {showPayment && !paySuccess && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 999, padding: 24,
        }}>
          <div style={{ background: C.white, borderRadius: 20, padding: 36, maxWidth: 460, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700 }}>Activate Your Account</h2>
              <button onClick={() => { setShowPayment(false); setError('') }} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#999' }}>✕</button>
            </div>

            <div style={{ background: '#F0FAF5', border: '1.5px solid #7BCCA0', borderRadius: 14, padding: '18px 20px', marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A5C35', marginBottom: 12 }}>📱 Pay KSh 500 via M-Pesa Paybill</div>
              {[['Business No', '522533'], ['Account No', 'KEJA500'], ['Amount', 'KSh 500']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #B7DDA0', fontSize: 13 }}>
                  <span style={{ color: '#3B7A50' }}>{k}</span>
                  <strong style={{ color: '#1A5C35' }}>{v}</strong>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <button
                onClick={() => setMpesaSent(true)}
                style={{ ...btn.outline, width: '100%', padding: '11px', fontSize: 13, background: mpesaSent ? '#EAF3DE' : 'transparent', color: mpesaSent ? '#27500A' : C.terracotta, borderColor: mpesaSent ? '#97C459' : C.terracotta }}
              >
                {mpesaSent ? `✅ STK prompt sent to ${currentUser.phone}` : '📲 Send M-Pesa prompt to my phone'}
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>
                M-Pesa Confirmation Code *
              </label>
              <input
                style={{ width: '100%', border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', fontSize: 14, fontFamily: font.body, background: C.cream, outline: 'none', boxSizing: 'border-box' }}
                placeholder="e.g. RG7KL1MXYZ"
                value={mpesaCode}
                onChange={e => { setMpesaCode(e.target.value.toUpperCase()); setError('') }}
                maxLength={12}
              />
              <p style={{ fontSize: 12, color: C.textMuted, marginTop: 5 }}>Check your M-Pesa SMS for this code.</p>
            </div>

            {error && (
              <div style={{ background: '#FCEBEB', border: '1px solid #F09595', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#7A1F1F', marginBottom: 14 }}>
                ⚠️ {error}
              </div>
            )}

            <button
              style={{ ...btn.primary, width: '100%', padding: 14, fontSize: 15, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.75 : 1 }}
              onClick={handleActivate}
              disabled={loading}
            >
              {loading ? <><Spinner /> Verifying payment...</> : '🔓 Activate — KSh 500 / year'}
            </button>
          </div>
        </div>
      )}

      {/* ── Success Modal ── */}
      {paySuccess && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 999, padding: 24,
        }}>
          <div style={{ background: C.white, borderRadius: 20, padding: 44, maxWidth: 420, width: '100%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, marginBottom: 10 }}>You're all set!</h2>
            <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.8, marginBottom: 24 }}>
              Your account is now active for 30 days (expires early if you find a house). Contact any landlord directly, view full addresses, and save unlimited properties.
            </p>
            <div style={{ background: '#EAF3DE', border: '1px solid #97C459', borderRadius: 12, padding: '14px 18px', marginBottom: 24, fontSize: 13, color: '#27500A', lineHeight: 1.8, textAlign: 'left' }}>
              ✅ KSh 500 paid — 30 days access<br />
              💬 Contact unlimited landlords<br />
              🏆 Verified tenant badge active
            </div>
            <button
              style={{ ...btn.primary, width: '100%', padding: 14, fontSize: 15, borderRadius: 12 }}
              onClick={() => { setShowPayment(false); setPaySuccess(false) }}
            >
              Start Browsing →
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function Spinner() {
  return (
    <span style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
  )
}