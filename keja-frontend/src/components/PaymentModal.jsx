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
        background: C.white, borderRadius: 20, padding: 24,
        maxWidth: 460, width: '100%',
        maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
        animation: 'slideUp .25s ease',
      }}>

        {!done ? (
          <>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 28, marginBottom: 4 }}>🔓</div>
                <h2 style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, marginBottom: 2 }}>
                  Unlock Landlord Contact
                </h2>
                <p style={{ fontSize: 12.5, color: C.textSub, lineHeight: 1.5 }}>
                  Pay once, contact landlords for 30 days (expires early when you find a house).
                </p>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#bbb', flexShrink: 0, marginLeft: 12 }}>✕</button>
            </div>

            {/* What they unlock */}
            <div style={{
              background: '#F5F0E8', borderRadius: 12, padding: '12px 14px', marginBottom: 14,
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px'
            }}>
              {[
                ['💬', 'Unlimited contact (30d)'],
                ['📞', 'Direct phone numbers'],
                ['📍', 'Full property address'],
                ['🏆', 'Verified tenant badge'],
              ].map(([ic, txt]) => (
                <div key={txt} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: '#444' }}>
                  <span>{ic}</span><span>{txt}</span>
                </div>
              ))}
            </div>

            {/* Price & M-Pesa Instructions */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#EAF3DE', border: '1px solid #97C459', borderRadius: 10, padding: '8px 12px', textAlign: 'center' }}>
                <span style={{ fontSize: 11, color: '#27500A', fontWeight: 600 }}>Subscription</span>
                <span style={{ fontFamily: font.display, fontSize: 18, fontWeight: 700, color: '#1A5C35' }}>KSh 500</span>
              </div>
              
              <div style={{ flex: 2, background: '#F0FAF5', border: '1.5px solid #7BCCA0', borderRadius: 10, padding: '8px 12px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#1A5C35', marginBottom: 4 }}>📱 M-Pesa Paybill</div>
                <div style={{ fontSize: 11.5, color: '#3B7A50', lineHeight: 1.4 }}>
                  Business No: <strong>522533</strong><br />
                  Account No: <strong>KEJA500</strong>
                </div>
              </div>
            </div>

            {/* STK push */}
            <button
              onClick={() => setMpesaSent(true)}
              style={{
                width: '100%', padding: '9px', fontSize: 12.5, borderRadius: 10,
                fontFamily: font.body, fontWeight: 600, cursor: 'pointer',
                border: `1.5px solid ${mpesaSent ? '#97C459' : C.terracotta}`,
                background: mpesaSent ? '#EAF3DE' : 'transparent',
                color: mpesaSent ? '#27500A' : C.terracotta,
                marginBottom: 12,
              }}
            >
              {mpesaSent
                ? `✅ Prompt sent to ${currentUser.phone}`
                : `📲 Send M-Pesa prompt to ${currentUser.phone}`}
            </button>

            {/* Code input */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>
                M-Pesa Confirmation Code <span style={{ color: C.terracotta }}>*</span>
              </label>
              <input
                style={{ ...inp, padding: '10px 12px', borderRadius: 8 }}
                placeholder="e.g. RG7KL1MXYZ"
                value={mpesaCode}
                onChange={e => { setMpesaCode(e.target.value.toUpperCase()); setError('') }}
                maxLength={12}
                onKeyDown={e => e.key === 'Enter' && handleActivate()}
              />
            </div>

            {error && (
              <div style={{ background: '#FCEBEB', border: '1px solid #F09595', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#7A1F1F', marginBottom: 12 }}>
                ⚠️ {error}
              </div>
            )}

            <button
              onClick={handleActivate}
              disabled={loading}
              style={{
                ...btn.primary, width: '100%', padding: 12, fontSize: 14,
                borderRadius: 10,
                opacity: loading ? 0.75 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {loading ? <><Spinner /> Verifying...</> : '🔓 Activate Account — KSh 500'}
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
              You can now contact this landlord and any other landlord on Keja for the next 30 days (expires early when you find a house).
            </p>
            <div style={{ background: '#EAF3DE', border: '1px solid #97C459', borderRadius: 12, padding: '14px 18px', fontSize: 13, color: '#27500A', lineHeight: 1.8, textAlign: 'left' }}>
              ✅ KSh 500 paid · 30 days access (or until house found)<br />
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