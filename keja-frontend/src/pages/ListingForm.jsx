import { useState } from 'react'
import { C, font, btn } from '../styles'

const PROPERTY_TYPES = ['Apartment', 'Bedsitter', 'Studio', 'Townhouse', 'Maisonette', 'Villa', 'Bungalow']
const LOCATIONS = ['Westlands','Kilimani','Karen','Kasarani','Muthaiga','Lavington','Ruaraka','Ruaka','Mlolongo','Nyali','Bamburi','Tudor','Milimani Mombasa','Milimani Kisumu','Kondele','Mamboleo','Section 58 Nakuru','Milimani Nakuru','CBD Nakuru','Elgon View','Langas','Makongeni Thika','CBD Thika','Ruringunyu Nyeri','CBD Nyeri','Kisii Town','Suneka','Machakos Town','Athi River','Meru Town','Makutano','Malindi Town','Naivasha Town','Kakamega Town','Kericho Town','Other']
const AMENITY_OPTIONS = ['WiFi', 'Parking', 'Security', 'Gym', 'Pool', 'Garden', 'Generator', 'Borehole', 'CCTV', 'Water', 'DSQ', 'Lift/Elevator', 'Balcony', 'Laundry']

const STEPS = ['Property Info', 'Location & Price', 'Amenities & Photos', 'Review & Submit']

export default function ListingForm({ setPage, currentUser, onAddListing }) {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: '',
    type: '',
    beds: '',
    baths: '',
    sqft: '',
    desc: '',
    location: '',
    address: '',
    price: '',
    deposit: '2',
    minLease: '6',
    amenities: [],
    available: true,
    pets: false,
    utilities: 'Negotiable',
    imgUrl: '',
    contactPhone: currentUser?.phone || '',
    contactName: currentUser?.name || '',
  })

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError('') }

  const toggleAmenity = (a) => {
    setForm(f => ({
      ...f,
      amenities: f.amenities.includes(a)
        ? f.amenities.filter(x => x !== a)
        : [...f.amenities, a],
    }))
  }

  // ── Validation per step ──────────────────────────────────────────
  const validate = () => {
    if (step === 0) {
      if (!form.title.trim())   return 'Property title is required.'
      if (!form.type)           return 'Select a property type.'
      if (!form.beds)           return 'Number of bedrooms is required.'
      if (!form.baths)          return 'Number of bathrooms is required.'
      if (!form.desc.trim() || form.desc.length < 30) return 'Description must be at least 30 characters.'
    }
    if (step === 1) {
      if (!form.location)       return 'Select a location.'
      if (!form.address.trim()) return 'Street address or estate name is required.'
      if (!form.price || isNaN(form.price) || +form.price < 1000) return 'Enter a valid monthly rent (min KSh 1,000).'
    }
    if (step === 2) {
      if (form.amenities.length === 0) return 'Select at least one amenity.'
    }
    return null
  }

  const next = () => {
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    setStep(s => s + 1)
  }

  const back = () => { setError(''); setStep(s => s - 1) }

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      const newListing = {
        id: Date.now(),
        title: form.title,
        location: `${form.location}, Nairobi`,
        price: parseInt(form.price),
        beds: parseInt(form.beds),
        baths: parseInt(form.baths),
        sqft: parseInt(form.sqft) || 0,
        type: form.type,
        tag: 'New',
        img: form.imgUrl || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80',
        amenities: form.amenities,
        available: form.available,
        rating: 0,
        reviews: 0,
        desc: form.desc,
        landlord: currentUser?.name || 'Landlord',
        postedAt: new Date().toLocaleDateString('en-KE'),
      }
      onAddListing(newListing)
      setLoading(false)
      setSubmitted(true)
    }, 1400)
  }

  // ── Shared input style ───────────────────────────────────────────
  const inp = {
    width: '100%', border: `1.5px solid ${C.border}`, borderRadius: 10,
    padding: '12px 14px', fontSize: 14, fontFamily: font.body,
    background: C.cream, outline: 'none', color: C.dark,
    boxSizing: 'border-box', transition: 'border-color .2s',
  }

  const label = (text, required) => (
    <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>
      {text} {required && <span style={{ color: C.terracotta }}>*</span>}
    </label>
  )

  const field = (content, mb = 16) => (
    <div style={{ marginBottom: mb }}>{content}</div>
  )

  // ── Not logged in as landlord ────────────────────────────────────
  if (!currentUser || currentUser.role !== 'landlord') {
    return (
      <div style={{
        minHeight: 'calc(100vh - 64px)', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: C.cream, padding: '40px 24px',
      }}>
        <div style={{
          background: C.white, border: `1.5px solid ${C.border}`,
          borderRadius: 20, padding: 40, maxWidth: 440, width: '100%',
          textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🏢</div>
          <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
            Landlords only
          </h2>
          <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.8, marginBottom: 28 }}>
            You need a registered landlord account to list a property. Sign up as a landlord and pay the KSh 2,000 annual fee to get started.
          </p>
          <button
            style={{ ...btn.primary, width: '100%', padding: 14, fontSize: 15, borderRadius: 12, marginBottom: 10 }}
            onClick={() => setPage('signup')}
          >
            Register as Landlord →
          </button>
          <button
            style={{ ...btn.ghost, width: '100%', padding: 12, fontSize: 14 }}
            onClick={() => setPage('login')}
          >
            Already registered? Sign in
          </button>
        </div>
      </div>
    )
  }

  // ── Success screen ───────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 64px)', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: C.cream, padding: '40px 24px',
      }}>
        <div style={{
          background: C.white, border: `1.5px solid ${C.border}`,
          borderRadius: 20, padding: 44, maxWidth: 460, width: '100%',
          textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, marginBottom: 10 }}>
            Property Listed!
          </h2>
          <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.8, marginBottom: 24 }}>
            Your property <strong style={{ color: C.dark }}>"{form.title}"</strong> is now live on Keja. Tenants can find and contact you directly.
          </p>
          <div style={{
            background: '#EAF3DE', border: '1px solid #97C459',
            borderRadius: 12, padding: '14px 18px', marginBottom: 28,
            fontSize: 13, color: '#27500A', lineHeight: 1.8, textAlign: 'left',
          }}>
            ✅ Listed in {form.location}<br />
            💰 KSh {parseInt(form.price).toLocaleString()} / month<br />
            🛏 {form.beds} bed · 🚿 {form.baths} bath · 🏠 {form.type}
          </div>
          <button
            style={{ ...btn.primary, width: '100%', padding: 14, fontSize: 15, borderRadius: 12, marginBottom: 10 }}
            onClick={() => setPage('listings')}
          >
            View All Listings →
          </button>
          <button
            style={{ ...btn.ghost, width: '100%', padding: 12, fontSize: 14 }}
            onClick={() => { setSubmitted(false); setStep(0); setForm({ ...form, title: '', desc: '', imgUrl: '' }) }}
          >
            + List Another Property
          </button>
        </div>
      </div>
    )
  }

  // ── Main form ────────────────────────────────────────────────────
  return (
    <div style={{ background: C.cream, minHeight: 'calc(100vh - 64px)', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <button
            style={{ ...btn.ghost, padding: '7px 14px', fontSize: 12, marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 6 }}
            onClick={() => step === 0 ? setPage('home') : back()}
          >
            ← {step === 0 ? 'Back to home' : 'Previous step'}
          </button>
          <h1 style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700, marginBottom: 4 }}>
            List Your Property
          </h1>
          <p style={{ fontSize: 14, color: C.textSub }}>
            Listing as <strong style={{ color: C.terracotta }}>{currentUser.name}</strong> · Fill in your property details below
          </p>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 36 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{
                height: 4, borderRadius: 4, marginBottom: 6,
                background: i <= step ? C.terracotta : C.border,
                transition: 'background .3s',
              }} />
              <div style={{
                fontSize: 11, fontWeight: i === step ? 700 : 400,
                color: i === step ? C.terracotta : i < step ? '#888' : C.textMuted,
                whiteSpace: 'nowrap',
              }}>
                {s}
              </div>
            </div>
          ))}
        </div>

        {/* Card */}
        <div style={{
          background: C.white, border: `1.5px solid ${C.border}`,
          borderRadius: 20, padding: '32px 32px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>

          {/* ── STEP 0: Property Info ── */}
          {step === 0 && (
            <div>
              <SectionTitle>Basic Information</SectionTitle>

              {field(<>
                {label('Property title', true)}
                <input style={inp} placeholder='e.g. Modern 2BR Apartment in Westlands'
                  value={form.title} onChange={e => set('title', e.target.value)} />
                <Hint>Be specific — tenants search by title and location</Hint>
              </>)}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  {label('Property type', true)}
                  <select style={inp} value={form.type} onChange={e => set('type', e.target.value)}>
                    <option value=''>Select type...</option>
                    {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  {label('Size (sq ft)')}
                  <input style={inp} type='number' placeholder='e.g. 900'
                    value={form.sqft} onChange={e => set('sqft', e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  {label('Bedrooms', true)}
                  <select style={inp} value={form.beds} onChange={e => set('beds', e.target.value)}>
                    <option value=''>Select...</option>
                    {['1 (Bedsitter/Studio)', '1', '2', '3', '4', '5+'].map(b => (
                      <option key={b} value={b.split(' ')[0]}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  {label('Bathrooms', true)}
                  <select style={inp} value={form.baths} onChange={e => set('baths', e.target.value)}>
                    <option value=''>Select...</option>
                    {['1', '2', '3', '4'].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              {field(<>
                {label('Property description', true)}
                <textarea
                  style={{ ...inp, height: 110, resize: 'vertical' }}
                  placeholder='Describe the property — location highlights, condition, nearby landmarks, what makes it special...'
                  value={form.desc} onChange={e => set('desc', e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Hint>Minimum 30 characters</Hint>
                  <Hint>{form.desc.length} chars</Hint>
                </div>
              </>)}
            </div>
          )}

          {/* ── STEP 1: Location & Price ── */}
          {step === 1 && (
            <div>
              <SectionTitle>Location & Pricing</SectionTitle>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  {label('Area / Neighbourhood', true)}
                  <select style={inp} value={form.location} onChange={e => set('location', e.target.value)}>
                    <option value=''>Select area...</option>
                    {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  {label('Street / Estate name', true)}
                  <input style={inp} placeholder='e.g. Parklands Road, Runda Estate'
                    value={form.address} onChange={e => set('address', e.target.value)} />
                </div>
              </div>

              {field(<>
                {label('Monthly rent (KSh)', true)}
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', left: 14, top: '50%',
                    transform: 'translateY(-50%)', fontSize: 13,
                    fontWeight: 600, color: '#888',
                  }}>KSh</span>
                  <input
                    style={{ ...inp, paddingLeft: 52 }}
                    type='number' placeholder='e.g. 35000'
                    value={form.price} onChange={e => set('price', e.target.value)}
                  />
                </div>
              </>)}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  {label('Deposit (months of rent)')}
                  <select style={inp} value={form.deposit} onChange={e => set('deposit', e.target.value)}>
                    {['1', '2', '3'].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  {label('Minimum lease (months)')}
                  <select style={inp} value={form.minLease} onChange={e => set('minLease', e.target.value)}>
                    {['1', '3', '6', '12'].map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  {label('Utilities')}
                  <select style={inp} value={form.utilities} onChange={e => set('utilities', e.target.value)}>
                    {['Negotiable', 'Included in rent', 'Paid separately by tenant'].map(u => (
                      <option key={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <div style={{ paddingTop: 28 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14 }}>
                    <input type='checkbox' checked={form.pets}
                      onChange={e => set('pets', e.target.checked)}
                      style={{ accentColor: C.terracotta, width: 16, height: 16 }} />
                    Pets allowed
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: 4 }}>
                {label('Availability')}
                <div style={{ display: 'flex', gap: 10 }}>
                  {[true, false].map(v => (
                    <button
                      key={String(v)}
                      onClick={() => set('available', v)}
                      style={{
                        flex: 1, padding: '10px', borderRadius: 10, cursor: 'pointer',
                        fontFamily: font.body, fontSize: 13, fontWeight: 600,
                        border: form.available === v ? `2px solid ${C.terracotta}` : `1.5px solid ${C.border}`,
                        background: form.available === v ? '#FAF0EC' : C.cream,
                        color: form.available === v ? C.terracotta : C.textSub,
                      }}
                    >
                      {v ? '✅ Available now' : '🔜 Available soon'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Amenities & Photos ── */}
          {step === 2 && (
            <div>
              <SectionTitle>Amenities</SectionTitle>
              <p style={{ fontSize: 13, color: C.textSub, marginBottom: 16 }}>
                Select all that apply to your property.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {AMENITY_OPTIONS.map(a => {
                  const active = form.amenities.includes(a)
                  return (
                    <button
                      key={a}
                      onClick={() => toggleAmenity(a)}
                      style={{
                        padding: '8px 14px', borderRadius: 20, cursor: 'pointer',
                        fontFamily: font.body, fontSize: 13, fontWeight: 600,
                        border: active ? `2px solid ${C.terracotta}` : `1.5px solid ${C.border}`,
                        background: active ? '#FAF0EC' : C.cream,
                        color: active ? C.terracotta : C.textSub,
                        transition: 'all .15s',
                      }}
                    >
                      {active ? '✓ ' : ''}{a}
                    </button>
                  )
                })}
              </div>

              <SectionTitle>Property Photo</SectionTitle>
              <p style={{ fontSize: 13, color: C.textSub, marginBottom: 12 }}>
                Paste a direct image URL for now. Photo upload will be available in the next update.
              </p>
              {field(<>
                {label('Image URL (optional)')}
                <input
                  style={inp} placeholder='https://... (paste a photo link)'
                  value={form.imgUrl} onChange={e => set('imgUrl', e.target.value)}
                />
                <Hint>Leave blank to use a default image. Add real photos via Cloudinary in production.</Hint>
              </>)}

              {form.imgUrl && (
                <div style={{ marginBottom: 16 }}>
                  <img
                    src={form.imgUrl}
                    alt='preview'
                    style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 12, border: `1.5px solid ${C.border}` }}
                    onError={e => { e.target.style.display = 'none' }}
                  />
                </div>
              )}

              <SectionTitle>Contact Details</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  {label('Contact name')}
                  <input style={inp} placeholder='Your name'
                    value={form.contactName} onChange={e => set('contactName', e.target.value)} />
                </div>
                <div>
                  {label('Contact phone')}
                  <input style={inp} placeholder='07XXXXXXXX'
                    value={form.contactPhone} onChange={e => set('contactPhone', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: Review ── */}
          {step === 3 && (
            <div>
              <SectionTitle>Review your listing</SectionTitle>
              <p style={{ fontSize: 13, color: C.textSub, marginBottom: 20 }}>
                Check everything is correct before publishing.
              </p>

              {/* Preview card */}
              <div style={{
                border: `1.5px solid ${C.border}`, borderRadius: 16,
                overflow: 'hidden', marginBottom: 24,
              }}>
                <img
                  src={form.imgUrl || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80'}
                  alt='preview'
                  style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80' }}
                />
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ fontFamily: font.display, fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{form.title}</div>
                  <div style={{ fontSize: 13, color: C.textSub, marginBottom: 10 }}>📍 {form.address}, {form.location}, Nairobi</div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#555', marginBottom: 12 }}>
                    <span>🛏 {form.beds} bed</span>
                    <span>🚿 {form.baths} bath</span>
                    <span>🏠 {form.type}</span>
                    {form.sqft && <span>📐 {form.sqft} sqft</span>}
                  </div>
                  <div style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.terracotta }}>
                    KSh {parseInt(form.price || 0).toLocaleString()}
                    <span style={{ fontSize: 13, color: C.textMuted, fontFamily: font.body, fontWeight: 400 }}>/mo</span>
                  </div>
                </div>
              </div>

              {/* Summary rows */}
              {[
                ['Deposit', `${form.deposit} month(s) rent`],
                ['Min. lease', `${form.minLease} month(s)`],
                ['Utilities', form.utilities],
                ['Pets', form.pets ? 'Allowed' : 'Not allowed'],
                ['Availability', form.available ? 'Available now' : 'Available soon'],
                ['Amenities', form.amenities.length > 0 ? form.amenities.join(', ') : 'None selected'],
                ['Contact', `${form.contactName} · ${form.contactPhone}`],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '9px 0', borderBottom: `1px solid ${C.border}`,
                  fontSize: 13,
                }}>
                  <span style={{ color: '#888' }}>{k}</span>
                  <span style={{ fontWeight: 600, color: C.dark, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
                </div>
              ))}

              <div style={{
                background: '#EAF3DE', border: '1px solid #97C459',
                borderRadius: 10, padding: '12px 14px', marginTop: 20,
                fontSize: 13, color: '#27500A', lineHeight: 1.7,
              }}>
                ✅ Your listing will go live immediately after submission.<br />
                Tenants will be able to contact you directly.
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{
              background: '#FCEBEB', border: '1px solid #F09595',
              borderRadius: 8, padding: '10px 14px',
              fontSize: 13, color: '#7A1F1F', marginTop: 16,
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Navigation buttons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            {step > 0 && (
              <button style={{ ...btn.ghost, flex: 1, padding: 13 }} onClick={back}>
                ← Back
              </button>
            )}
            {step < 3 ? (
              <button style={{ ...btn.primary, flex: 2, padding: 13, fontSize: 14, borderRadius: 12 }} onClick={next}>
                Continue →
              </button>
            ) : (
              <button
                style={{
                  ...btn.primary, flex: 2, padding: 13, fontSize: 15,
                  borderRadius: 12, opacity: loading ? 0.75 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <><Spinner /> Publishing...</> : '🚀 Publish Listing'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────

function SectionTitle({ children }) {
  return (
    <p style={{
      fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: 0.8, color: C.textMuted, marginBottom: 14, marginTop: 4,
    }}>
      {children}
    </p>
  )
}

function Hint({ children }) {
  return <p style={{ fontSize: 12, color: C.textMuted, marginTop: 5 }}>{children}</p>
}

function Spinner() {
  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{
        width: 15, height: 15, border: '2px solid rgba(255,255,255,0.35)',
        borderTopColor: '#fff', borderRadius: '50%',
        display: 'inline-block', animation: 'spin 0.7s linear infinite',
      }} />
    </>
  )
}