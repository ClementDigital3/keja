import { useState } from 'react'
import { C, font, btn } from '../styles'

const HOW_IT_WORKS_TENANT = [
  {
    step: '01', icon: '📝', title: 'Register for free',
    desc: 'Create your Keja account in minutes. No payment required — registration is completely free for tenants.',
  },
  {
    step: '02', icon: '🔍', title: 'Browse verified listings',
    desc: 'Every landlord on Keja has paid a registration fee and created a verified account. No anonymous listings.',
  },
  {
    step: '03', icon: '💳', title: 'Pay KSh 500 to unlock contact',
    desc: 'Pay a small KSh 500 fee via M-Pesa to unlock direct phone numbers, WhatsApp links, and physical addresses.',
  },
  {
    step: '04', icon: '📞', title: 'Contact the landlord directly',
    desc: 'Call or WhatsApp the landlord directly to ask questions, verify details, and schedule a physical viewing.',
  },
  {
    step: '05', icon: '🏠', title: 'Find your house & move in',
    desc: 'Once you successfully find a house and complete the viewing, your search access expires automatically. No recurring charges.',
  },
]

const HOW_IT_WORKS_LANDLORD = [
  {
    step: '01', icon: '📝', title: 'Register your account',
    desc: 'Sign up as a landlord and fill in your details. Your identity is tied to your account.',
  },
  {
    step: '02', icon: '💳', title: 'Pay KSh 2,000 registration fee',
    desc: 'A one-time annual fee paid via M-Pesa. This is your commitment that you are a serious, real landlord.',
  },
  {
    step: '03', icon: '🏢', title: 'List your properties',
    desc: 'Add your properties with photos, description, price, and location. Listings go live immediately after review.',
  },
  {
    step: '04', icon: '👥', title: 'Receive tenant inquiries',
    desc: 'Verified, registered tenants contact you directly. No time-wasters — every tenant has a real account.',
  },
  {
    step: '05', icon: '🤝', title: 'Meet on site and collect KSh 500',
    desc: 'Show the property in person. The tenant pays you KSh 500 on site after the viewing — a fair reward for your time.',
  },
]

const FAQS = [
  {
    q: 'Why do tenants pay KSh 500?',
    a: 'The KSh 500 fee unlocks direct landlord contact details (phone, WhatsApp, and full address) for 30 days or until you find a house. This platform fee filters out spam, pays for KYC identity verification, and ensures only serious tenants can contact landlords.',
  },
  {
    q: 'What does the KSh 2,000 landlord fee do?',
    a: 'It separates real landlords from scammers. A fraudster who pays KSh 2,000 to post a fake listing takes on real financial risk with a real paper trail. Serious landlords see it as a small, fair cost to reach thousands of genuine tenants.',
  },
  {
    q: 'What if a landlord lists a property they don\'t own?',
    a: 'Because every landlord is a registered, paying member, their contact details and identity are on record. A tenant who shows up and finds a problem can report it directly. The landlord\'s account is suspended and they lose their registration fee.',
  },
  {
    q: 'Is registration free for tenants?',
    a: 'Yes, registration and browsing properties is 100% free. You only pay the KSh 500 fee when you are ready to start contacting landlords.',
  },
  {
    q: 'How long does the KSh 500 access last?',
    a: 'It lasts for exactly 30 days (1 month) or until you successfully find a house, whichever comes first. When you find a house, you can mark it as found on your dashboard, which concludes your search session.',
  },
  {
    q: 'Are there any other fees?',
    a: 'No. Keja does not charge any other fees to tenants, and we strictly forbid landlords from demanding booking fees or deposits online. You only pay your rent and security deposit directly to the landlord in person after signing a lease.',
  },
]

export default function Trust({ setPage }) {
  const [activeTab, setActiveTab] = useState('tenant')
  const [openFaq, setOpenFaq] = useState(null)

  const steps = activeTab === 'tenant' ? HOW_IT_WORKS_TENANT : HOW_IT_WORKS_LANDLORD

  return (
    <div style={{ background: C.cream, minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <div style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #2D3A1E 100%)',
        padding: '64px 24px 56px', textAlign: 'center',
      }}>
        <span style={{
          display: 'inline-block',
          background: 'rgba(196,82,42,0.25)', border: '1px solid rgba(196,82,42,0.45)',
          color: C.amber, borderRadius: 20, padding: '5px 18px',
          fontSize: 12, fontWeight: 700, letterSpacing: 1.5,
          textTransform: 'uppercase', marginBottom: 20,
        }}>
          🔒 Trust & Safety
        </span>
        <h1 style={{
          fontFamily: font.display, fontSize: 'clamp(28px, 5vw, 48px)',
          color: '#FFFDF9', fontWeight: 700, marginBottom: 16, lineHeight: 1.2,
        }}>
          No money changes hands<br />until you've seen the house
        </h1>
        <p style={{
          fontSize: 15, color: 'rgba(255,253,249,0.65)',
          maxWidth: 540, margin: '0 auto', lineHeight: 1.8,
        }}>
          Keja's model is simple — landlords are registered and accountable,
          tenants are verified and free, and the KSh 500 fee is only paid
          in person after a successful viewing. There is no way to be scammed online.
        </p>
      </div>

      {/* ── WHY IT WORKS BANNER ── */}
      <div style={{
        background: '#EAF3DE', borderBottom: '1.5px solid #B7DDA0',
        padding: '18px 24px',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'flex', justifyContent: 'center',
          gap: 40, flexWrap: 'wrap', textAlign: 'center',
        }}>
          {[
            ['🏢', 'Landlords pay to list', 'Skin in the game — not anonymous'],
            ['👤', 'Tenants register free', 'Verified identity, zero upfront cost'],
            ['💵', 'KSh 500 to contact', 'Unlock contact for 1 month or until house found'],
            ['🚫', 'Zero deposit scams', 'No upfront booking fees to landlords'],
          ].map(([icon, title, sub]) => (
            <div key={title}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A5C35' }}>{title}</div>
              <div style={{ fontSize: 12, color: '#3B7A50' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px 80px' }}>

        {/* ── HOW IT WORKS ── */}
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 12, color: C.terracotta, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
            Step by step
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700 }}>How it works</h2>
            {/* Tab toggle */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              background: '#EDE5D8', borderRadius: 12, padding: 4, gap: 0,
            }}>
              {['tenant', 'landlord'].map(r => (
                <button
                  key={r}
                  onClick={() => setActiveTab(r)}
                  style={{
                    padding: '9px 22px', borderRadius: 9, border: 'none',
                    fontFamily: font.body, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', transition: 'all .2s',
                    background: activeTab === r ? C.white : 'transparent',
                    color: activeTab === r ? C.terracotta : C.textSub,
                    boxShadow: activeTab === r ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  }}
                >
                  {r === 'tenant' ? '🏠 I\'m a Tenant' : '🏢 I\'m a Landlord'}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, position: 'relative' }}>
                {/* Line connector */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: i === steps.length - 1 ? C.terracotta : C.white,
                    border: `2px solid ${i === steps.length - 1 ? C.terracotta : C.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, flexShrink: 0, zIndex: 1,
                  }}>
                    {s.icon}
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: C.border, minHeight: 24 }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingBottom: 28, paddingTop: 8, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.textMuted }}>{s.step}</span>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: C.dark }}>{s.title}</h3>
                    {i === steps.length - 1 && (
                      <span style={{
                        background: '#EAF3DE', color: '#27500A',
                        fontSize: 11, fontWeight: 700, borderRadius: 20,
                        padding: '2px 10px', border: '1px solid #97C459',
                      }}>
                        ✓ Scam-proof
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEES SUMMARY ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 64 }}>
          {[
            {
              role: 'Tenant', icon: '🏠', color: '#E6F1FB', border: '#93C5E8', textColor: '#185FA5',
              fee: 'Free to register',
              points: [
                'Create your account at no cost',
                'Browse all listings immediately',
                'Pay KSh 500 to unlock communication',
                '30 days access to all contact details',
                'Expires early once you find a house',
              ],
            },
            {
              role: 'Landlord', icon: '🏢', color: '#EAF3DE', border: '#97C459', textColor: '#1A5C35',
              fee: 'KSh 2,000 / year',
              points: [
                'Unlimited property listings',
                'Reach thousands of tenants',
                'Verified badge on your profile',
                'Collect KSh 500 per viewing on site',
                'Renews annually via M-Pesa',
              ],
            },
          ].map(({ role, icon, color, border, textColor, fee, points }) => (
            <div key={role} style={{
              background: color, border: `1.5px solid ${border}`,
              borderRadius: 16, padding: 24,
            }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{role}</div>
              <div style={{
                fontFamily: font.display, fontSize: 22, fontWeight: 700,
                color: textColor, marginBottom: 16,
              }}>{fee}</div>
              {points.map(p => (
                <div key={p} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, color: '#333', alignItems: 'flex-start' }}>
                  <span style={{ color: textColor, marginTop: 1 }}>✓</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── FAQ ── */}
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 12, color: C.terracotta, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
            Common questions
          </p>
          <h2 style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700, marginBottom: 24 }}>
            FAQs
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: C.white, border: `1.5px solid ${openFaq === i ? C.terracotta : C.border}`,
                  borderRadius: 14, overflow: 'hidden', transition: 'border-color .2s',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: '16px 20px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: font.body, textAlign: 'left', gap: 12,
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.dark, lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{
                    fontSize: 18, color: C.terracotta, flexShrink: 0,
                    transform: openFaq === i ? 'rotate(45deg)' : 'none',
                    transition: 'transform .2s', display: 'inline-block',
                  }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{
                    padding: '0 20px 18px',
                    fontSize: 14, color: '#555', lineHeight: 1.8,
                    borderTop: `1px solid ${C.border}`, paddingTop: 14,
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{
          background: 'linear-gradient(135deg, #2D3A1E, #1A1A1A)',
          borderRadius: 20, padding: '44px 40px', textAlign: 'center',
        }}>
          <h3 style={{ fontFamily: font.display, fontSize: 24, color: '#FFFDF9', fontWeight: 700, marginBottom: 10 }}>
            Ready to find your next keja?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(255,253,249,0.6)', marginBottom: 28, lineHeight: 1.7 }}>
            Register free as a tenant and start browsing verified listings today.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              style={{ ...btn.primary, padding: '14px 32px', fontSize: 15, borderRadius: 12 }}
              onClick={() => setPage && setPage('signup')}
            >
              Register Free →
            </button>
            <button
              style={{ ...btn.outline, padding: '14px 32px', fontSize: 15, borderRadius: 12, borderColor: 'rgba(255,255,255,0.3)', color: '#FFFDF9' }}
              onClick={() => setPage && setPage('listings')}
            >
              Browse Listings
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}