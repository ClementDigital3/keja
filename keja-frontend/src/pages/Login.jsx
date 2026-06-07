import { useState } from 'react'
import { C, font, btn } from '../styles'
import { saveSession } from '../storage'
import { api } from '../api'

export default function Login({ setPage, setCurrentUser }) {
  const [role, setRole]         = useState('tenant')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleLogin = async () => {
    setError('')
    if (!email || !password)    { setError('Please fill in all fields.'); return }
    if (!email.includes('@'))   { setError('Enter a valid email address.'); return }
    if (password.length < 6)    { setError('Password must be at least 6 characters.'); return }

    setLoading(true)
    try {
      const result = await api.login(email, password, role)
      setLoading(false)

      localStorage.setItem('keja_token', result.token)
      saveSession(result.user)
      setCurrentUser(result.user)
      setPage(role === 'landlord' ? 'dashboard' : 'tenant-dashboard')
    } catch (err) {
      setLoading(false)
      setError(err.message || 'Login failed. Please check your credentials.')
    }
  }

  const inp = {
    width: '100%', border: `1.5px solid ${C.border}`,
    borderRadius: 10, padding: '13px 14px', fontSize: 15,
    fontFamily: font.body, background: C.cream, outline: 'none',
    color: C.dark, boxSizing: 'border-box',
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: C.cream, padding: '40px 24px',
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: font.display, fontSize: 32, fontWeight: 700, color: C.terracotta }}>
            Keja<span style={{ fontSize: 14, color: '#aaa', fontFamily: font.body, fontWeight: 400 }}>.ke</span>
          </div>
          <p style={{ fontSize: 15, color: C.textSub, marginTop: 6 }}>Welcome back — sign in to continue</p>
        </div>

        <div style={{
          background: C.white, border: `1.5px solid ${C.border}`,
          borderRadius: 20, padding: 36,
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        }}>

          {/* Role toggle */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            background: C.cream, borderRadius: 12, padding: 4, marginBottom: 28,
          }}>
            {['tenant', 'landlord'].map(r => (
              <button key={r} onClick={() => { setRole(r); setError('') }}
                style={{
                  padding: '10px', borderRadius: 10, border: 'none',
                  fontFamily: font.body, fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', transition: 'all .2s',
                  background: role === r ? C.white : 'transparent',
                  color: role === r ? C.terracotta : C.textSub,
                  boxShadow: role === r ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                }}>
                {r === 'tenant' ? '🏠 Tenant' : '🏢 Landlord'}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>Email address</label>
            <input style={inp} type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          </div>

          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#444' }}>Password</label>
              <span style={{ fontSize: 13, color: C.terracotta, cursor: 'pointer', fontWeight: 600 }}>Forgot password?</span>
            </div>
            <div style={{ position: 'relative' }}>
              <input style={inp} type={showPass ? 'text' : 'password'}
                placeholder="••••••••" value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()} />
              <button onClick={() => setShowPass(s => !s)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#aaa' }}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ background: '#FCEBEB', border: '1px solid #F09595', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#7A1F1F', margin: '12px 0' }}>
              ⚠️ {error}
            </div>
          )}

          <button onClick={handleLogin} disabled={loading}
            style={{
              ...btn.primary, width: '100%', padding: 15, fontSize: 15,
              borderRadius: 12, marginTop: 8, opacity: loading ? 0.75 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
            {loading
              ? <><Spinner /> Signing in...</>
              : `Sign in as ${role === 'landlord' ? 'Landlord' : 'Tenant'}`
            }
          </button>

          <p style={{ textAlign: 'center', fontSize: 14, color: C.textSub, marginTop: 20 }}>
            Don't have an account?{' '}
            <span onClick={() => setPage('signup')}
              style={{ color: C.terracotta, fontWeight: 700, cursor: 'pointer' }}>
              Register here →
            </span>
          </p>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: C.textMuted }}>
          🔒 Your details are stored securely on this device
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function Spinner() {
  return (
    <span style={{
      width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)',
      borderTopColor: '#fff', borderRadius: '50%',
      display: 'inline-block', animation: 'spin 0.7s linear infinite',
    }} />
  )
}