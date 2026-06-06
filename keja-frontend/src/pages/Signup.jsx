import { useState } from 'react'
import { C, font, btn } from '../styles'
import { saveUser, saveSession } from '../storage'

const STEPS_LANDLORD = ['Choose Role', 'Your Details', 'M-Pesa Payment', 'Done!']
const STEPS_TENANT   = ['Choose Role', 'Your Details', 'Done!']

export default function Signup({ setPage, setCurrentUser }) {
  const [role, setRole]           = useState(null)
  const [step, setStep]           = useState(0)
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

  const validateDetails = () => {
    if (!form.firstName.trim())            return 'First name is required.'
    if (!form.lastName.trim())             return 'Last name is required.'
    if (!form.email.includes('@'))         return 'Enter a valid email address.'
    if (!/^07\d{8}$/.test(form.phone))    return 'Enter a valid Safaricom/Airtel number (07XXXXXXXX).'
    if (role === 'landlord' && !form.idNumber.trim()) return 'National ID number is required.'
    if (form.password.length < 8)          return 'Password must be at least 8 characters.'
    if (form.password !== form.confirm)    return 'Passwords do not match.'
    return null
  }

  const validatePayment = () => {
    if (!mpesaCode.trim())                        return 'Enter the M-Pesa confirmation code.'
    if (!/^[A-Z0-9]{8,12}$/i.test(mpesaCode.trim())) return 'Invalid M-Pesa code (e.g. RG7KL1MXYZ).'
    return null
  }

  const createAccount = () => {
    setLoading(true)
    const user = {
      firstName: form.firstName,
      lastName: form.lastName,
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      idNumber: form.idNumber || null,
      password: form.password,
      role,
      registeredAt: new Date().toISOString(),
    }

    setTimeout(() => {
      const result = saveUser(user)
      setLoading(false)

      if (result.error) { setError(result.error); return }

      // Save session (without password)
      const { password: _, ...sessionUser } = user
      saveSession(sessionUser)
      setCurrentUser(sessionUser)
      setStep(role === 'landlord' ? 3 : 3)
    }, 1000)
  }

  const next = () => {
    setError('')
    if (step === 0) {
      if (!role) { setError('Please choose your account type.'); return }
      setStep(1); return
    }
    if (step === 1) {
      const err = validateDetails()
      if (err) { setError(err); return }
      if (role === 'tenant') { createAccount(); return }
      setStep(2); return
    }
    if (step === 2 && role === 'landlord') {
      const err = validatePayment()
      if (err) { setError(err); return }
      createAccount(); return
    }
  }

  const inp = {
    width: '100%', border: `1.5px solid ${C.border}`, borderRadius: 10,
    padding: '12px 14px', fontSize: 14, fontFamily: font.body,
    background: C.cream, outline: 'none', color: C.dark, boxSizing: 'border-box',
  }

  const Label = ({ text, required }) => (
    <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>
      {text} {required && <span style={{ color: C.terracotta }}>*</span>}
    </label>
  )

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)', background: C.cream,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px',
    }}>
      <div style={{ width: '100%', maxWidth: 520 }}>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, color: C.terracotta }}>
            Keja<span style={{ fontSize: 13, color: '#aaa', fontFamily: font.body, fontWeight: 400 }}>.ke</span>
          </div>
          <p style={{ fontSize: 14, color: C.textSub, marginTop: 5 }}>Create your account</p>
        </div>

        {/* Progress */}
        {role && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ height: 4, borderRadius: 4, marginBottom: 6, background: i <= step ? C.terracotta : C.border, transition: 'background .3s' }} />
                <div style={{ fontSize: 11, fontWeight: i === step ? 700 : 400, color: i === step ? C.terracotta : C.textMuted }}>{s}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: '36px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>

          {/* ── STEP 0: Role ── */}
          {step === 0 && (
            <div>
              <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Who are you?</h2>
              <p style={{ fontSize: 14, color: C.textSub, marginBottom: 24 }}>Choose your account type.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
                {[
                  { r: 'tenant',   icon: '🏠', title: 'Tenant',   desc: "I'm looking for a place to rent", fee: 'Free to register', note: 'Pay KSh 500/yr to contact landlords' },
                  { r: 'landlord', icon: '🏢', title: 'Landlord', desc: 'I want to list my property',       fee: 'KSh 2,000 / year', note: 'Paid via M-Pesa during sign-up' },
                ].map(({ r, icon, title, desc, fee, note }) => (
                  <div key={r} onClick={() => { setRole(r); setError('') }}
                    style={{
                      border: role === r ? `2px solid ${C.terracotta}` : `1.5px solid ${C.border}`,
                      background: role === r ? '#FAF0EC' : C.cream,
                      borderRadius: 14, padding: '20px 16px', cursor: 'pointer',
                      transition: 'all .2s', textAlign: 'center',
                    }}>
                    <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{title}</div>
                    <div style={{ fontSize: 13, color: C.textSub, marginBottom: 12, lineHeight: 1.5 }}>{desc}</div>
                    <div style={{ background: role === r ? C.terracotta : '#F5F0E8', color: role === r ? '#fff' : '#555', borderRadius: 8, padding: '5px 10px', fontSize: 12, fontWeight: 700 }}>{fee}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 6 }}>{note}</div>
                  </div>
                ))}
              </div>
              {error && <ErrorBox msg={error} />}
              <button style={{ ...btn.primary, width: '100%', padding: 14, fontSize: 15, borderRadius: 12 }} onClick={next}>Continue →</button>
              <p style={{ textAlign: 'center', fontSize: 13, color: C.textSub, marginTop: 18 }}>
                Already registered?{' '}
                <span onClick={() => setPage('login')} style={{ color: C.terracotta, fontWeight: 700, cursor: 'pointer' }}>Sign in →</span>
              </p>
            </div>
          )}

          {/* ── STEP 1: Details ── */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Your details</h2>
              <p style={{ fontSize: 14, color: C.textSub, marginBottom: 24 }}>Fill in your information below.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div><Label text="First name" required /><input style={inp} placeholder="John" value={form.firstName} onChange={e => set('firstName', e.target.value)} /></div>
                <div><Label text="Last name" required /><input style={inp} placeholder="Kamau" value={form.lastName} onChange={e => set('lastName', e.target.value)} /></div>
              </div>

              <div style={{ marginBottom: 12 }}><Label text="Email address" required /><input style={inp} type="email" placeholder="john@example.com" value={form.email} onChange={e => set('email', e.target.value)} /></div>

              <div style={{ marginBottom: 12 }}><Label text="Phone number (M-Pesa)" required /><input style={inp} type="tel" placeholder="07XXXXXXXX" maxLength={10} value={form.phone} onChange={e => set('phone', e.target.value)} /></div>

              {role === 'landlord' && (
                <div style={{ marginBottom: 12 }}><Label text="National ID number" required /><input style={inp} placeholder="e.g. 12345678" value={form.idNumber} onChange={e => set('idNumber', e.target.value)} /></div>
              )}

              <div style={{ marginBottom: 12 }}>
                <Label text="Password" required />
                <div style={{ position: 'relative' }}>
                  <input style={inp} type={showPass ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password} onChange={e => set('password', e.target.value)} />
                  <button onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#aaa' }}>
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <Label text="Confirm password" required />
                <input style={{ ...inp, borderColor: form.confirm && form.confirm !== form.password ? '#F09595' : C.border }} type="password" placeholder="Repeat password" value={form.confirm} onChange={e => set('confirm', e.target.value)} />
              </div>

              {error && <ErrorBox msg={error} />}
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ ...btn.ghost, flex: 1, padding: 13 }} onClick={() => setStep(0)}>← Back</button>
                <button style={{ ...btn.primary, flex: 2, padding: 13, fontSize: 14, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.75 : 1 }} onClick={next} disabled={loading}>
                  {loading ? <><Spinner /> Creating account...</> : role === 'landlord' ? 'Proceed to Payment →' : 'Create Account →'}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: M-Pesa (Landlord) ── */}
          {step === 2 && role === 'landlord' && (
            <div>
              <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Registration Payment</h2>
              <p style={{ fontSize: 14, color: C.textSub, marginBottom: 24, lineHeight: 1.7 }}>
                One-time <strong style={{ color: C.dark }}>KSh 2,000/year</strong> to activate your landlord account.
              </p>

              <div style={{ background: '#F0FAF5', border: '1.5px solid #7BCCA0', borderRadius: 14, padding: '20px 20px', marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1A5C35', marginBottom: 12 }}>📱 Pay via M-Pesa Paybill</div>
                {[['Business No', '522533'], ['Account No', 'KEJA2000'], ['Amount', 'KSh 2,000']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #B7DDA0', fontSize: 13 }}>
                    <span style={{ color: '#3B7A50' }}>{k}</span>
                    <strong style={{ color: '#1A5C35' }}>{v}</strong>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 12 }}>
                <button onClick={() => setMpesaSent(true)}
                  style={{ ...btn.outline, padding: '10px 20px', fontSize: 13, width: '100%', background: mpesaSent ? '#EAF3DE' : 'transparent', color: mpesaSent ? '#27500A' : C.terracotta, borderColor: mpesaSent ? '#97C459' : C.terracotta }}>
                  {mpesaSent ? '✅ STK prompt sent to ' + form.phone : '📲 Send M-Pesa prompt to my phone'}
                </button>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>M-Pesa Confirmation Code *</label>
                <input style={inp} placeholder="e.g. RG7KL1MXYZ" value={mpesaCode} onChange={e => setMpesaCode(e.target.value.toUpperCase())} maxLength={12} />
                <p style={{ fontSize: 12, color: C.textMuted, marginTop: 5 }}>Check your M-Pesa SMS for this code.</p>
              </div>

              {error && <ErrorBox msg={error} />}
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ ...btn.ghost, flex: 1, padding: 13 }} onClick={() => setStep(1)}>← Back</button>
                <button style={{ ...btn.primary, flex: 2, padding: 13, fontSize: 14, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.75 : 1 }} onClick={next} disabled={loading}>
                  {loading ? <><Spinner /> Verifying...</> : 'Verify & Activate →'}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Done ── */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>{role === 'landlord' ? '🎉' : '👋'}</div>
              <h2 style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, marginBottom: 10 }}>
                You're in, {form.firstName}!
              </h2>
              <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.8, marginBottom: 24 }}>
                {role === 'landlord'
                  ? 'Your account is active. You can now list properties and receive tenant inquiries.'
                  : "Your account is ready. Browse verified listings and contact landlords directly."}
              </p>
              <div style={{
                background: role === 'landlord' ? '#EAF3DE' : '#E6F1FB',
                border: `1px solid ${role === 'landlord' ? '#97C459' : '#93C5E8'}`,
                borderRadius: 12, padding: '14px 18px', marginBottom: 24,
                fontSize: 13, color: role === 'landlord' ? '#27500A' : '#185FA5',
                lineHeight: 1.8, textAlign: 'left',
              }}>
                {role === 'landlord' ? (
                  <>✅ Account registered & payment verified<br />🏢 List unlimited properties<br />📋 Valid for 12 months</>
                ) : (
                  <>✅ Free account created<br />🏠 Browse all verified listings<br />💳 Pay KSh 500 to unlock contact details</>
                )}
              </div>
              <button
                style={{ ...btn.primary, width: '100%', padding: 15, fontSize: 15, borderRadius: 12 }}
                onClick={() => setPage(role === 'landlord' ? 'dashboard' : 'home')}
              >
                {role === 'landlord' ? '🏢 Go to My Dashboard →' : '🏠 Start Browsing →'}
              </button>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: C.textMuted }}>
          🔒 Your details are stored securely on this device
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function ErrorBox({ msg }) {
  return (
    <div style={{ background: '#FCEBEB', border: '1px solid #F09595', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#7A1F1F', marginBottom: 16 }}>
      ⚠️ {msg}
    </div>
  )
}

function Spinner() {
  return (
    <span style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
  )
}