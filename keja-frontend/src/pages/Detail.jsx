import { useState } from 'react'
import { C, font, btn } from '../styles'
import { AMENITY_ICONS } from '../data'
import { StarRating, AmenityBadge } from '../components/PropertyCard'
import { isTenantSubscribed } from '../storage'
import PaymentModal from '../components/PaymentModal'

// Format phone to international for tel/wa links e.g. 07XX → 2547XX
function toIntl(phone) {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('0')) return '254' + digits.slice(1)
  if (digits.startsWith('254')) return digits
  return '254' + digits
}

export default function Detail({ listing: l, setPage, saved, toggleSave, currentUser, setCurrentUser }) {
  const [name, setName]               = useState(currentUser?.firstName || currentUser?.name || '')
  const [phone, setPhone]             = useState(currentUser?.phone || '')
  const [msg, setMsg]                 = useState('')
  const [sent, setSent]               = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [copied, setCopied]           = useState(false)

  if (!l) return null

  const subscribed    = isTenantSubscribed(currentUser)
  const landlordPhone = typeof l.landlord === 'object' && l.landlord ? l.landlord.phone : (l.contactPhone || null)
  const landlordName  = typeof l.landlord === 'object' && l.landlord ? l.landlord.name : (l.contactName || 'Landlord')
  const intlPhone     = toIntl(landlordPhone)

  const copyPhone = () => {
    navigator.clipboard.writeText(landlordPhone)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inputStyle = {
    width: '100%', border: `1.5px solid ${C.border}`, borderRadius: 10,
    padding: '12px 14px', fontSize: 14, fontFamily: font.body,
    background: C.cream, outline: 'none', marginBottom: 12,
    boxSizing: 'border-box', color: C.dark,
  }

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '36px 24px 80px' }}>

      {/* Back */}
      <button
        style={{ background: 'none', border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '9px 18px', fontSize: 13, cursor: 'pointer', fontFamily: font.body, color: '#555', marginBottom: 24, display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}
        onClick={() => setPage('listings')}
      >
        ← Back to listings
      </button>

      <img src={l.img} alt={l.title} style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 20, marginBottom: 32 }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 36 }}>

        {/* ── LEFT ── */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
            <div>
              {l.tag && (
                <span style={{ display: 'inline-block', background: '#C4522A', color: '#fff', borderRadius: 6, padding: '3px 12px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>
                  {l.tag}
                </span>
              )}
              <h1 style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, lineHeight: 1.2 }}>{l.title}</h1>
            </div>
            <button onClick={() => toggleSave(l.id)} style={{ background: saved ? '#FAF0EC' : C.white, color: saved ? C.terracotta : '#888', border: `1.5px solid ${saved ? C.terracotta : C.border}`, borderRadius: 12, width: 44, height: 44, fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {saved ? '♥' : '♡'}
            </button>
          </div>

          <p style={{ fontSize: 15, color: '#888', marginBottom: 18 }}>
            📍 {l.location} &nbsp;·&nbsp; <StarRating r={l.rating || 4.5} />
            <span style={{ fontSize: 13, color: '#999' }}> ({l.reviews || 0} reviews)</span>
          </p>

          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            {[['🛏', l.beds, 'Bedrooms'], ['🚿', l.baths, 'Bathrooms'], ['📐', `${l.sqft || '—'}`, 'Sq Ft'], ['🏠', l.type, 'Type']].map(([icon, val, lbl]) => (
              <div key={lbl} style={{ background: '#F5F0E8', borderRadius: 12, padding: '12px 18px', textAlign: 'center', minWidth: 80 }}>
                <div style={{ fontSize: 22 }}>{icon}</div>
                <div style={{ fontFamily: font.display, fontSize: 18, fontWeight: 700, color: C.terracotta }}>{val}</div>
                <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, marginBottom: 10 }}>About this property</h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#444', marginBottom: 24 }}>{l.desc}</p>

          <h2 style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Amenities</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {(l.amenities || []).map(a => <AmenityBadge key={a} a={a} />)}
          </div>

          <div style={{ background: '#F5F0E8', borderRadius: 14, padding: '18px 22px', fontSize: 14, color: '#555', lineHeight: 1.8 }}>
            <strong style={{ color: C.dark }}>📋 Lease Terms</strong><br />
            Minimum lease: 6 months &nbsp;·&nbsp; Deposit: 2 months rent<br />
            Utilities: Negotiable &nbsp;·&nbsp; Pets: On request
          </div>

          <div style={{ background: '#EAF3DE', border: '1.5px solid #97C459', borderRadius: 14, padding: '16px 20px', marginTop: 20, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 22 }}>🔒</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#27500A', marginBottom: 4 }}>Keja Verified Listing</div>
              <div style={{ fontSize: 13, color: '#3B6D11', lineHeight: 1.6 }}>
                This landlord is a registered, paying member of Keja. Their identity is on record.
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div>
          <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: 28, position: 'sticky', top: 80 }}>

            <div style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: C.terracotta }}>
              KSh {l.price.toLocaleString()}
            </div>
            <div style={{ fontSize: 13, color: '#999', marginBottom: 22 }}>
              per month &nbsp;·&nbsp; {l.available ? '✅ Available now' : '❌ Currently unavailable'}
            </div>

            {/* ── Not logged in ── */}
            {!currentUser && (
              <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🔒</div>
                <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Sign in to contact this landlord</div>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 18, lineHeight: 1.7 }}>Create a free account to browse and contact landlords.</div>
                <button style={{ ...btn.primary, width: '100%', padding: 13, fontSize: 14, borderRadius: 12, marginBottom: 8 }} onClick={() => setPage('signup')}>Register Free →</button>
                <button style={{ background: 'none', border: `1.5px solid ${C.border}`, borderRadius: 10, width: '100%', padding: 11, fontSize: 13, cursor: 'pointer', fontFamily: font.body, fontWeight: 600, color: '#555' }} onClick={() => setPage('login')}>
                  Already registered? Sign in
                </button>
              </div>
            )}

            {/* ── Tenant not subscribed ── */}
            {currentUser?.role === 'tenant' && !subscribed && (
              <div style={{ textAlign: 'center', padding: '8px 0 8px' }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🔓</div>
                <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                  Unlock to contact this landlord
                </div>
                <div style={{ fontSize: 13, color: '#888', lineHeight: 1.7, marginBottom: 16 }}>
                  Pay KSh 500 once — contact any landlord for 30 days (expires early when you find a house).
                </div>
                <div style={{ background: '#F5F0E8', borderRadius: 10, padding: '12px 14px', marginBottom: 16, textAlign: 'left' }}>
                  {[['💬','Contact unlimited landlords'],['📞','See & call landlord number'],['💬','WhatsApp landlord directly'],['📍','View full property address'],['🏆','Verified tenant badge']].map(([ic, txt]) => (
                    <div key={txt} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#555', marginBottom: 6 }}>
                      <span>{ic}</span><span>{txt}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#EAF3DE', border: '1px solid #97C459', borderRadius: 8, padding: '10px', marginBottom: 16, fontSize: 13, fontWeight: 700, color: '#1A5C35' }}>
                  KSh 500 · 30 days access (or until house found)
                </div>
                <button style={{ ...btn.primary, width: '100%', padding: 14, fontSize: 15, borderRadius: 12 }} onClick={() => setShowPayment(true)}>
                  Pay KSh 500 & Contact →
                </button>
              </div>
            )}

            {/* ── Landlord viewing ── */}
            {currentUser?.role === 'landlord' && (
              <div style={{ background: '#F5F0E8', borderRadius: 12, padding: '16px 18px', fontSize: 13, color: '#666', lineHeight: 1.7, textAlign: 'center' }}>
                🏢 You are signed in as a landlord.<br />Switch to a tenant account to contact properties.
              </div>
            )}

            {/* ── Subscribed tenant ── */}
            {currentUser?.role === 'tenant' && subscribed && (
              <>
                {/* Subscription badge */}
                <div style={{ background: '#EAF3DE', border: '1px solid #97C459', borderRadius: 8, padding: '8px 12px', marginBottom: 18, fontSize: 12, color: '#27500A', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>✅</span>
                  <span>
                    <strong>Verified Tenant</strong> · Active until {new Date(currentUser.subscriptionExpiry).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                {/* Safety warning */}
                <div style={{
                  background: '#FDF2F2', border: '1.5px solid #F8B4B4',
                  borderRadius: 10, padding: '12px 14px', marginBottom: 18,
                  fontSize: 12.5, color: '#9B1C1C', lineHeight: 1.5,
                }}>
                  <div style={{ fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>⚠️</span> Safety First — On-Site Viewings Only
                  </div>
                  You must meet the landlord physically at the property. <strong>Never pay any deposit, booking fee, or rent online beforehand.</strong> Anything else is a scam.
                </div>

                {/* ── Contact action buttons ── */}
                {landlordPhone && (
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
                      Contact {landlordName}
                    </div>

                    {/* Phone number display */}
                    <div style={{
                      background: C.cream, border: `1.5px solid ${C.border}`,
                      borderRadius: 10, padding: '10px 14px',
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', marginBottom: 10,
                    }}>
                      <div>
                        <div style={{ fontSize: 11, color: '#aaa', marginBottom: 2 }}>Phone number</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: C.dark, letterSpacing: 0.5 }}>
                          {landlordPhone}
                        </div>
                      </div>
                      <button
                        onClick={copyPhone}
                        style={{ background: copied ? '#EAF3DE' : '#F5F0E8', border: 'none', borderRadius: 8, padding: '7px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: font.body, color: copied ? '#27500A' : '#555', transition: 'all .2s' }}
                      >
                        {copied ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>

                    {/* Call + WhatsApp buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                      <a
                        href={`tel:${landlordPhone}`}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          gap: 8, padding: '11px 10px',
                          background: C.terracotta, color: '#fff',
                          borderRadius: 10, fontSize: 13, fontWeight: 700,
                          textDecoration: 'none', fontFamily: font.body,
                          transition: 'opacity .2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >
                        📞 Call
                      </a>
                      <a
                        href={`https://wa.me/${intlPhone}?text=${encodeURIComponent(`Hi, I found your listing "${l.title}" on Keja.ke and I'm interested in viewing the property.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          gap: 8, padding: '11px 10px',
                          background: '#25D366', color: '#fff',
                          borderRadius: 10, fontSize: 13, fontWeight: 700,
                          textDecoration: 'none', fontFamily: font.body,
                          transition: 'opacity .2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.526 5.845L0 24l6.335-1.506A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.373l-.36-.214-3.732.887.907-3.634-.234-.374A9.772 9.772 0 0 1 2.182 12C2.182 6.578 6.578 2.182 12 2.182c5.421 0 9.818 4.396 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/></svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div style={{ borderTop: `1px solid ${C.border}`, marginBottom: 16, paddingTop: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
                    Or send a viewing request
                  </div>
                </div>

                {!sent ? (
                  <>
                    <input style={inputStyle} placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} />
                    <input style={inputStyle} placeholder="Your phone (07xx...)" value={phone} onChange={e => setPhone(e.target.value)} />
                    <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} placeholder="Message to landlord (optional)" value={msg} onChange={e => setMsg(e.target.value)} />
                    <button
                      style={{ ...btn.primary, width: '100%', padding: 13, fontSize: 14, borderRadius: 12, background: l.available ? C.terracotta : '#bbb', cursor: l.available ? 'pointer' : 'not-allowed' }}
                      onClick={() => name && phone && setSent(true)}
                      disabled={!l.available}
                    >
                      {l.available ? '📩 Send Viewing Request' : 'Property Unavailable'}
                    </button>
                  </>
                ) : (
                  <div style={{ background: '#EAF3DE', border: '1px solid #97C459', borderRadius: 12, padding: '18px', textAlign: 'center' }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
                    <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Request Sent!</div>
                    <div style={{ fontSize: 13, color: '#27500A', lineHeight: 1.7 }}>
                      The landlord will call you at <strong>{phone}</strong>.<br />
                      You can also call or WhatsApp them directly above.
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ── Landlord card ── */}
            <div style={{ marginTop: 20, paddingTop: 18, borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: subscribed ? '#2D6A4F' : '#ccc', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, flexShrink: 0 }}>
                {landlordName[0].toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.dark }}>{landlordName}</div>
                <div style={{ fontSize: 12, color: '#aaa' }}>
                  {subscribed
                    ? <span style={{ color: '#27500A', fontWeight: 600 }}>✅ Verified · {landlordPhone}</span>
                    : '🔒 Subscribe to view contact'}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Payment modal */}
      {showPayment && (
        <PaymentModal
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          onClose={() => setShowPayment(false)}
          onSuccess={() => setShowPayment(false)}
        />
      )}
    </div>
  )
}