import { useState } from 'react'
import { C, font, btn } from '../styles'
import { activateTenantSubscription } from '../storage'

export default function PaymentModal({ currentUser, setCurrentUser, onClose, onSuccess }) {
  const [mpesaCode, setMpesaCode] = useState('')
  const [mpesaSent, setMpesaSent] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [done, setDone]           = useState(false)

  const handleActivate = () => {
    setError('')
    if (!mpesaCode.trim())
      return setError('Enter your M-Pesa confirmation code.')
    if (!/^[A-Z0-9]{8,12}$/i.test(mpesaCode.trim()))
      return setError('Invalid M-Pesa code — should look like RG7KL1MXYZ.')

    setLoading(true)
    setTimeout(() => {
      const updated = activateTenantSubscription(currentUser.email)
      setCurrentUser(updated)
      setLoading(false)
      setDone(true)
      if (onSuccess) setTimeout(onSuccess, 1800)
    }, 1200)
  }

  const inp = {
    width: '100%', border: `1.5px solid ${C.border}`, borderRadius: 10,
    padding: '12px 14px', fontSize: 14, fontFamily: font.body,
    background: C.cream, outline: 'none', boxSizing: 'border-box', color: C.dark,
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 24,
    }}>
      <div style={{
        background: C.white, borderRadius: 20, padding: 36,
        maxWidth: 460, width: '100%',
        boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
        animation: 'slideUp .25s ease',
      }}>

        {!done ? (
          <>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🔓</div>
                <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
                  Unlock Landlord Contact
                </h2>
                <p style={{ fontSize: 13, color: C.textSub, lineHeight: 1.6 }}>
                  Pay once, contact any landlord for 12 months.
                </p>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#bbb', flexShrink: 0, marginLeft: 12 }}>✕</button>
            </div>

            {/* What they unlock */}
            <div style={{ background: '#F5F0E8', borderRadius: 12, padding: '14px 16px', marginBottom: 22 }}>
              {[
                ['💬', 'Contact unlimited landlords for 12 months'],
                ['📞', 'View direct phone numbers'],
                ['📍', 'See full property address'],
                ['🏆', 'Verified tenant badge on your profile'],
              ].map(([ic, txt]) => (
                <div key={txt} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: '#444', marginBottom: 8 }}>
                  <span>{ic}</span><span>{txt}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#EAF3DE', border: '1px solid #97C459', borderRadius: 10, padding: '12px 16px', marginBottom: 22 }}>
              <span style={{ fontSize: 14, color: '#27500A', fontWeight: 600 }}>Annual subscription</span>
              <span style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, color: '#1A5C35' }}>KSh 500</span>
            </div>

            {/* M-Pesa instructions */}
            <div style={{ background: '#F0FAF5', border: '1.5px solid #7BCCA0', borderRadius: 12, padding: '16px 18px', marginBottom: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A5C35', marginBottom: 10 }}>📱 Pay via M-Pesa Paybill</div>
              {[['Business No', '522533'], ['Account No', 'KEJA500'], ['Amount', 'KSh 500']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #B7DDA0', fontSize: 13 }}>
                  <span style={{ color: '#3B7A50' }}>{k}</span>
                  <strong style={{ color: '#1A5C35' }}>{v}</strong>
                </div>
              ))}
            </div>

            {/* STK push */}
            <button
              onClick={() => setMpesaSent(true)}
              style={{
                width: '100%', padding: '11px', fontSize: 13, borderRadius: 10,
                fontFamily: font.body, fontWeight: 600, cursor: 'pointer',
                border: `1.5px solid ${mpesaSent ? '#97C459' : C.terracotta}`,
                background: mpesaSent ? '#EAF3DE' : 'transparent',
                color: mpesaSent ? '#27500A' : C.terracotta,
                marginBottom: 14,
              }}
            >
              {mpesaSent
                ? `✅ Prompt sent to ${currentUser.phone}`
                : `📲 Send M-Pesa prompt to ${currentUser.phone}`}
            </button>

            {/* Code input */}
            <div style={{ marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>
                M-Pesa Confirmation Code <span style={{ color: C.terracotta }}>*</span>
              </label>
              <input
                style={inp}
                placeholder="e.g. RG7KL1MXYZ"
                value={mpesaCode}
                onChange={e => { setMpesaCode(e.target.value.toUpperCase()); setError('') }}
                maxLength={12}
                onKeyDown={e => e.key === 'Enter' && handleActivate()}
              />
              <p style={{ fontSize: 12, color: C.textMuted, marginTop: 5 }}>
                Found in the SMS M-Pesa sends after payment.
              </p>
            </div>

            {error && (
              <div style={{ background: '#FCEBEB', border: '1px solid #F09595', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#7A1F1F', marginBottom: 14 }}>
                ⚠️ {error}
              </div>
            )}

            <button
              onClick={handleActivate}
              disabled={loading}
              style={{
                ...btn.primary, width: '100%', padding: 14, fontSize: 15,
                borderRadius: 12, marginTop: 6,
                opacity: loading ? 0.75 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {loading ? <><Spinner /> Verifying payment...</> : '🔓 Activate My Account — KSh 500'}
            </button>
          </>
        ) : (
          /* Success */
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, marginBottom: 10 }}>
              Account Activated!
            </h2>
            <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.8, marginBottom: 24 }}>
              You can now contact this landlord and any other landlord on Keja for the next 12 months.
            </p>
            <div style={{ background: '#EAF3DE', border: '1px solid #97C459', borderRadius: 12, padding: '14px 18px', fontSize: 13, color: '#27500A', lineHeight: 1.8, textAlign: 'left' }}>
              ✅ KSh 500 paid · 12 months access<br />
              💬 Contact unlimited landlords<br />
              🏆 Verified tenant badge active
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

function Spinner() {
  return (
    <span style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
  )
}