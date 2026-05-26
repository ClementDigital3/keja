import { useState } from 'react'
import { C, font, btn } from '../styles'

const STEPS_LANDLORD = ['Choose Role', 'Your Details', 'M-Pesa Payment', 'Done!']
const STEPS_TENANT   = ['Choose Role', 'Your Details', 'Done!']

export default function Signup({ setPage, setCurrentUser }) {
  const [role, setRole]           = useState(null)   // 'tenant' | 'landlord'
  const [step, setStep]           = useState(0)      // 0=role, 1=details, 2=payment(landlord)|done(tenant), 3=done(landlord)
  const [showPass, setShowPass]   = useState(false)
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [mpesaCode, setMpesaCode] = useState('')
  const [mpesaSent, setMpesaSent] = useState(false)

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', idNumber: '', password: '', confirm: '',
  })

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError('') }

  const steps = role === 'landlord' ? STEPS_LANDLORD : STEPS_TENANT

  // ── Validation ────────────────────────────────────────────────────
  const validateDetails = () => {
    if (!form.firstName.trim())    return 'First name is required.'
    if (!form.lastName.trim())     return 'Last name is required.'
    if (!form.email.includes('@')) return 'Enter a valid email address.'
    if (!/^07\d{8}$/.test(form.phone)) return 'Enter a valid Safaricom/Airtel number (07XXXXXXXX).'
    if (role === 'landlord' && !form.idNumber.trim()) return 'National ID number is required.'
    if (form.password.length < 8)  return 'Password must be at least 8 characters.'
    if (form.password !== form.confirm) return 'Passwords do not match.'
    return null
  }

  const validatePayment = () => {
    if (!mpesaCode.trim()) return 'Enter the M-Pesa confirmation code.'
    if (!/^[A-Z0-9]{10}$/i.test(mpesaCode.trim())) return 'Invalid M-Pesa code format (e.g. RG7KL1MXYZ).'
    return null
  }

  // ── Navigation ────────────────────────────────────────────────────
  const next = () => {
    setError('')

    if (step === 0) {
      if (!role) { setError('Please choose your account type.'); return }
      setStep(1); return
    }

    if (step === 1) {
      const err = validateDetails()
      if (err) { setError(err); return }
      setStep(2); return
    }

    if (step === 2 && role === 'landlord') {
      const err = validatePayment()
      if (err) { setError(err); return }
      setLoading(true)
      setTimeout(() => {
        setCurrentUser({ name: form.firstName, email: form.email, role })
        setLoading(false)
        setStep(3)
      }, 1400)
      return
    }

    if (step === 2 && role === 'tenant') {
      setLoading(true)
      setTimeout(() => {
        setCurrentUser({ name: form.firstName, email: form.email, role })
        setLoading(false)
        setStep(2) // stays on "done" step for tenant
        setStep(3) // actually jump to done
      }, 1200)
    }
  }

  const sendMpesa = () => {
    if (!/^07\d{8}$/.test(form.phone)) return
    setMpesaSent(true)
  }

  // ── Styles ────────────────────────────────────────────────────────
  const input = (hasError) => ({
    width: '100%', border: `1.5px solid ${hasError ? '#F09595' : C.border}`,
    borderRadius: 10, padding: '12px 14px', fontSize: 14,
    fontFamily: font.body, background: C.cream, outline: 'none',
    color: C.dark, boxSizing: 'border-box', transition: 'border-color .2s',
  })

  const isLastStep = (role === 'landlord' && step === 3) || (role === 'tenant' && step === 3)

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)', background: C.cream,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '48px 24px',
    }}>
      <div style={{ width: '100%', maxWidth: 520 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, color: C.terracotta }}>
            Keja<span style={{ fontSize: 13, color: '#aaa', fontFamily: font.body, fontWeight: 400 }}>.ke</span>
          </div>
          <p style={{ fontSize: 14, color: C.textSub, marginTop: 5 }}>Create your account</p>
        </div>

        {/* Progress bar */}
        {role && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 28, alignItems: 'center' }}>
            {steps.map((label, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  height: 4, borderRadius: 4, marginBottom: 6,
                  background: i <= step ? C.terracotta : C.border,
                  transition: 'background .3s',
                }} />
                <div style={{
                  fontSize: 11, fontWeight: i === step ? 700 : 500,
                  color: i === step ? C.terracotta : i < step ? '#888' : C.textMuted,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{
          background: C.white, border: `1.5px solid ${C.border}`,
          borderRadius: 20, padding: '36px 36px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        }}>

          {/* ── STEP 0: Choose Role ── */}
          {step === 0 && (
            <div>
              <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
                Who are you?
              </h2>
              <p style={{ fontSize: 14, color: C.textSub, marginBottom: 24, lineHeight: 1.6 }}>
                Choose your account type. You can always contact us to switch later.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
                {[
                  { r: 'tenant', icon: '🏠', title: 'Tenant', desc: 'I\'m looking for a place to rent', fee: 'Free to register', feeNote: 'KSh 500 paid on-site after viewing' },
                  { r: 'landlord', icon: '🏢', title: 'Landlord', desc: 'I want to list my property', fee: 'KSh 2,000/year', feeNote: 'Paid via M-Pesa during sign-up' },
                ].map(({ r, icon, title, desc, fee, feeNote }) => (
                  <div
                    key={r}
                    onClick={() => { setRole(r); setError('') }}
                    style={{
                      border: role === r ? `2px solid ${C.terracotta}` : `1.5px solid ${C.border}`,
                      background: role === r ? '#FAF0EC' : C.cream,
                      borderRadius: 14, padding: '20px 16px', cursor: 'pointer',
                      transition: 'all .2s', textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 6 }}>{title}</div>
                    <div style={{ fontSize: 13, color: C.textSub, marginBottom: 12, lineHeight: 1.5 }}>{desc}</div>
                    <div style={{
                      background: role === r ? C.terracotta : '#F5F0E8',
                      color: role === r ? '#fff' : '#555',
                      borderRadius: 8, padding: '5px 10px',
                      fontSize: 12, fontWeight: 700,
                    }}>
                      {fee}
                    </div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 6 }}>{feeNote}</div>
                  </div>
                ))}
              </div>

              {error && <ErrorBox msg={error} />}

              <button style={{ ...btn.primary, width: '100%', padding: 14, fontSize: 15, borderRadius: 12 }} onClick={next}>
                Continue →
              </button>
              <p style={{ textAlign: 'center', fontSize: 13, color: C.textSub, marginTop: 18 }}>
                Already have an account?{' '}
                <span onClick={() => setPage('login')} style={{ color: C.terracotta, fontWeight: 700, cursor: 'pointer' }}>
                  Sign in →
                </span>
              </p>
            </div>
          )}

          {/* ── STEP 1: Details ── */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
                Your details
              </h2>
              <p style={{ fontSize: 14, color: C.textSub, marginBottom: 24 }}>
                {role === 'landlord' ? 'We need a few details to verify your account.' : 'Fill in your basic info to get started.'}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <Field label="First name" placeholder="John">
                  <input style={input()} value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="John" />
                </Field>
                <Field label="Last name" placeholder="Kamau">
                  <input style={input()} value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Kamau" />
                </Field>
              </div>

              <div style={{ marginBottom: 12 }}>
                <Field label="Email address">
                  <input style={input()} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="john@example.com" />
                </Field>
              </div>

              <div style={{ marginBottom: 12 }}>
                <Field label="Phone number (M-Pesa)">
                  <input style={input()} type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="07XXXXXXXX" maxLength={10} />
                </Field>
              </div>

              {role === 'landlord' && (
                <div style={{ marginBottom: 12 }}>
                  <Field label="National ID number">
                    <input style={input()} value={form.idNumber} onChange={e => set('idNumber', e.target.value)} placeholder="e.g. 12345678" />
                  </Field>
                  <p style={{ fontSize: 12, color: C.textMuted, marginTop: 5 }}>
                    Required to verify your identity as a landlord.
                  </p>
                </div>
              )}

              <div style={{ marginBottom: 12 }}>
                <Field label="Password">
                  <div style={{ position: 'relative' }}>
                    <input
                      style={input()} type={showPass ? 'text' : 'password'}
                      value={form.password} onChange={e => set('password', e.target.value)}
                      placeholder="Min. 8 characters"
                    />
                    <button onClick={() => setShowPass(s => !s)} style={eyeBtn}>{showPass ? '🙈' : '👁️'}</button>
                  </div>
                </Field>
              </div>

              <div style={{ marginBottom: 20 }}>
                <Field label="Confirm password">
                  <input
                    style={input(form.confirm && form.confirm !== form.password)}
                    type="password" value={form.confirm}
                    onChange={e => set('confirm', e.target.value)}
                    placeholder="Repeat password"
                  />
                </Field>
              </div>

              {error && <ErrorBox msg={error} />}

              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ ...btn.ghost, flex: 1, padding: 13 }} onClick={() => setStep(0)}>← Back</button>
                <button style={{ ...btn.primary, flex: 2, padding: 13, fontSize: 14, borderRadius: 12 }} onClick={next}>
                  {role === 'landlord' ? 'Proceed to Payment →' : 'Create Account →'}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: M-Pesa Payment (Landlord) ── */}
          {step === 2 && role === 'landlord' && (
            <div>
              <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
                Registration Payment
              </h2>
              <p style={{ fontSize: 14, color: C.textSub, marginBottom: 24, lineHeight: 1.7 }}>
                A one-time fee of <strong style={{ color: C.dark }}>KSh 2,000/year</strong> gives you unlimited listings on Keja. Pay via M-Pesa below.
              </p>

              {/* M-Pesa instructions */}
              <div style={{
                background: '#F0FAF5', border: '1.5px solid #7BCCA0',
                borderRadius: 14, padding: '20px 20px', marginBottom: 24,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1A5C35', marginBottom: 14 }}>
                  📱 How to pay via M-Pesa
                </div>
                {[
                  'Go to M-Pesa on your phone',
                  'Select Lipa na M-Pesa → Paybill',
                  'Business No: 522533',
                  'Account No: KEJA2000',
                  `Amount: KSh 2,000`,
                  'Enter your M-Pesa PIN and confirm',
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: '#1A5C35', color: '#fff',
                      fontSize: 11, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                    }}>{i + 1}</div>
                    <span style={{ fontSize: 13, color: '#1A5C35', lineHeight: 1.6 }}>{s}</span>
                  </div>
                ))}
              </div>

              {/* STK Push */}
              <div style={{ background: C.cream, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 8 }}>
                  Or request an STK push to {form.phone}
                </div>
                <button
                  onClick={sendMpesa}
                  style={{
                    ...btn.outline, padding: '10px 20px', fontSize: 13,
                    background: mpesaSent ? '#EAF3DE' : 'transparent',
                    color: mpesaSent ? '#27500A' : C.terracotta,
                    borderColor: mpesaSent ? '#97C459' : C.terracotta,
                  }}
                >
                  {mpesaSent ? '✅ Prompt sent to your phone' : '📲 Send M-Pesa prompt'}
                </button>
              </div>

              {/* Confirmation code */}
              <div style={{ marginBottom: 20 }}>
                <Field label="M-Pesa Confirmation Code">
                  <input
                    style={input()} value={mpesaCode}
                    onChange={e => setMpesaCode(e.target.value.toUpperCase())}
                    placeholder="e.g. RG7KL1MXYZ"
                    maxLength={12}
                  />
                </Field>
                <p style={{ fontSize: 12, color: C.textMuted, marginTop: 5 }}>
                  You'll receive this code in the M-Pesa SMS confirmation.
                </p>
              </div>

              {error && <ErrorBox msg={error} />}

              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ ...btn.ghost, flex: 1, padding: 13 }} onClick={() => setStep(1)}>← Back</button>
                <button
                  style={{
                    ...btn.primary, flex: 2, padding: 13, fontSize: 14,
                    borderRadius: 12, opacity: loading ? 0.75 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                  onClick={next} disabled={loading}
                >
                  {loading ? <><Spinner /> Verifying...</> : 'Verify & Activate Account →'}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Tenant Final (free) ── */}
          {step === 2 && role === 'tenant' && (
            <div style={{ textAlign: 'center' }}>
              <TenantConfirm form={form} />
              {error && <ErrorBox msg={error} />}
              <button
                style={{
                  ...btn.primary, width: '100%', padding: 15, fontSize: 15,
                  borderRadius: 12, marginTop: 8, opacity: loading ? 0.75 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
                onClick={next} disabled={loading}
              >
                {loading ? <><Spinner /> Creating account...</> : 'Create My Account →'}
              </button>
              <button style={{ ...btn.ghost, width: '100%', padding: 12, marginTop: 10 }} onClick={() => setStep(1)}>← Back</button>
            </div>
          )}

          {/* ── STEP 3: Done ── */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>{role === 'landlord' ? '🎉' : '👋'}</div>
              <h2 style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, marginBottom: 10 }}>
                You're in, {form.firstName}!
              </h2>
              <p style={{ fontSize: 15, color: C.textSub, lineHeight: 1.7, marginBottom: 28 }}>
                {role === 'landlord'
                  ? 'Your account is active and your payment has been verified. You can now list your properties on Keja.'
                  : 'Your account is ready. Browse listings and contact landlords directly. You\'ll pay the KSh 500 fee on-site after your viewing.'
                }
              </p>

              {role === 'landlord' && (
                <div style={{
                  background: '#EAF3DE', border: '1px solid #97C459',
                  borderRadius: 12, padding: '14px 18px', marginBottom: 24,
                  fontSize: 13, color: '#27500A', lineHeight: 1.7, textAlign: 'left',
                }}>
                  ✅ Registration fee paid · KSh 2,000<br />
                  📋 Your account is valid for 12 months<br />
                  🏢 You can list unlimited properties
                </div>
              )}

              {role === 'tenant' && (
                <div style={{
                  background: '#E6F1FB', border: '1px solid #93C5E8',
                  borderRadius: 12, padding: '14px 18px', marginBottom: 24,
                  fontSize: 13, color: '#185FA5', lineHeight: 1.7, textAlign: 'left',
                }}>
                  ℹ️ Registration is free<br />
                  📍 KSh 500 is paid in person after you meet the landlord<br />
                  🔒 All landlords on Keja are registered and paid members
                </div>
              )}

              <button
                style={{ ...btn.primary, width: '100%', padding: 15, fontSize: 15, borderRadius: 12 }}
                onClick={() => setPage(role === 'landlord' ? 'listings' : 'home')}
              >
                {role === 'landlord' ? '🏢 Go to My Listings →' : '🏠 Start Browsing →'}
              </button>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: C.textMuted }}>
          🔒 Your data is safe and never shared without your consent
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// ── Small helper components ─────────────────────────────────────────

function Field({ label, children }) {
  return (
    <div>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>
          {label}
        </label>
      )}
      {children}
    </div>
  )
}

function ErrorBox({ msg }) {
  return (
    <div style={{
      background: '#FCEBEB', border: '1px solid #F09595',
      borderRadius: 8, padding: '10px 14px',
      fontSize: 13, color: '#7A1F1F', marginBottom: 16,
    }}>
      ⚠️ {msg}
    </div>
  )
}

function Spinner() {
  return (
    <span style={{
      width: 15, height: 15, border: '2px solid rgba(255,255,255,0.35)',
      borderTopColor: '#fff', borderRadius: '50%',
      display: 'inline-block', animation: 'spin 0.7s linear infinite',
    }} />
  )
}

function TenantConfirm({ form }) {
  return (
    <div style={{ textAlign: 'left', marginBottom: 20 }}>
      <div style={{ textAlign: 'center', fontSize: 44, marginBottom: 12 }}>👤</div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, marginBottom: 6, textAlign: 'center' }}>
        Confirm your details
      </h2>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 20, textAlign: 'center' }}>
        Please review before creating your account.
      </p>
      {[['Full name', `${form.firstName} ${form.lastName}`], ['Email', form.email], ['Phone', form.phone]].map(([k, v]) => (
        <div key={k} style={{
          display: 'flex', justifyContent: 'space-between',
          padding: '10px 0', borderBottom: '1px solid #EDE5D8',
          fontSize: 14,
        }}>
          <span style={{ color: '#888' }}>{k}</span>
          <span style={{ fontWeight: 600, color: '#1A1A1A' }}>{v}</span>
        </div>
      ))}
      <div style={{
        background: '#E6F1FB', border: '1px solid #93C5E8',
        borderRadius: 10, padding: '12px 14px', marginTop: 16,
        fontSize: 13, color: '#185FA5', lineHeight: 1.7,
      }}>
        ℹ️ Registration is <strong>free</strong>. The KSh 500 fee is paid directly to the landlord on-site after your viewing.
      </div>
    </div>
  )
}

const eyeBtn = {
  position: 'absolute', right: 12, top: '50%',
  transform: 'translateY(-50%)', background: 'none',
  border: 'none', cursor: 'pointer', fontSize: 16, color: '#aaa',
}
