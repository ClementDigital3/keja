import { useState } from 'react'
import { C, font, btn } from '../styles'
import { AMENITY_ICONS } from '../data'
import { StarRating, AmenityBadge } from '../components/PropertyCard'

export default function Detail({ listing: l, setPage, saved, toggleSave }) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [msg, setMsg] = useState("")
  const [sent, setSent] = useState(false)

  if (!l) return null

  const inputStyle = {
    width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 10,
    padding: "12px 14px", fontSize: 14, fontFamily: font.body,
    background: C.cream, outline: "none", marginBottom: 12,
    boxSizing: "border-box", color: C.dark,
  }

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "36px 24px 80px" }}>
      <button style={{ ...btn.ghost, marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 6 }}
        onClick={() => setPage("listings")}>
        ← Back to listings
      </button>

      <img src={l.img} alt={l.title}
        style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: 20, marginBottom: 32 }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 36 }}>

        {/* ── LEFT ── */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
            <div>
              {l.tag && (
                <span style={{
                  display: "inline-block", background: "#C4522A", color: "#fff",
                  borderRadius: 6, padding: "3px 12px", fontSize: 11,
                  fontWeight: 700, textTransform: "uppercase", marginBottom: 10,
                }}>
                  {l.tag}
                </span>
              )}
              <h1 style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, lineHeight: 1.2 }}>{l.title}</h1>
            </div>
            <button
              onClick={() => toggleSave(l.id)}
              style={{
                ...btn.ghost, fontSize: 20,
                background: saved ? "#FAF0EC" : C.white, color: saved ? C.terracotta : "#888",
                borderColor: saved ? C.terracotta : C.border,
              }}
            >
              {saved ? "♥" : "♡"}
            </button>
          </div>

          <p style={{ fontSize: 15, color: C.textSub, marginBottom: 18 }}>
            📍 {l.location} &nbsp;·&nbsp; <StarRating r={l.rating} />
            <span style={{ fontSize: 13, color: C.textMuted }}> ({l.reviews} reviews)</span>
          </p>

          {/* Meta cards */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            {[["🛏", l.beds, "Bedrooms"], ["🚿", l.baths, "Bathrooms"], ["📐", `${l.sqft}`, "Sq Ft"], ["🏠", l.type, "Type"]].map(([icon, val, lbl]) => (
              <div key={lbl} style={{
                background: "#F5F0E8", borderRadius: 12, padding: "12px 18px", textAlign: "center", minWidth: 80,
              }}>
                <div style={{ fontSize: 22 }}>{icon}</div>
                <div style={{ fontFamily: font.display, fontSize: 18, fontWeight: 700, color: C.terracotta }}>{val}</div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, marginBottom: 10 }}>About this property</h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#444", marginBottom: 24 }}>{l.desc}</p>

          <h2 style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Amenities</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
            {l.amenities.map(a => <AmenityBadge key={a} a={a} />)}
          </div>

          <div style={{
            background: "#F5F0E8", borderRadius: 14, padding: "18px 22px",
            fontSize: 14, color: "#555", lineHeight: 1.8,
          }}>
            <strong style={{ color: C.dark }}>📋 Lease Terms</strong><br />
            Minimum lease: 6 months &nbsp;·&nbsp; Deposit: 2 months rent<br />
            Utilities: Negotiable &nbsp;·&nbsp; Pets: On request
          </div>

          {/* Trust badge */}
          <div style={{
            background: "#EAF3DE", border: "1.5px solid #97C459",
            borderRadius: 14, padding: "16px 20px", marginTop: 20,
            display: "flex", gap: 12, alignItems: "flex-start",
          }}>
            <span style={{ fontSize: 22 }}>🔒</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#27500A", marginBottom: 4 }}>Keja Verified Listing</div>
              <div style={{ fontSize: 13, color: "#3B6D11", lineHeight: 1.6 }}>
                This landlord has passed National ID verification, provided ownership documents, and deposited the KSh 10,000 trust stake. You are protected.
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div>
          <div style={{
            background: C.white, border: `1.5px solid ${C.border}`,
            borderRadius: 20, padding: 28, position: "sticky", top: 80,
          }}>
            <div style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: C.terracotta }}>
              KSh {l.price.toLocaleString()}
            </div>
            <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 22 }}>
              per month &nbsp;·&nbsp; {l.available ? "✅ Available now" : "❌ Currently unavailable"}
            </div>

            {!sent ? (
              <>
                <input style={inputStyle} placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} />
                <input style={inputStyle} placeholder="Phone number (07xx...)" value={phone} onChange={e => setPhone(e.target.value)} />
                <textarea
                  style={{ ...inputStyle, height: 84, resize: "vertical" }}
                  placeholder="Message to landlord (optional)"
                  value={msg} onChange={e => setMsg(e.target.value)}
                />
                <button
                  style={{
                    ...btn.primary, width: "100%", padding: 15, fontSize: 15, borderRadius: 12,
                    background: l.available ? C.terracotta : "#bbb",
                    cursor: l.available ? "pointer" : "not-allowed",
                  }}
                  onClick={() => name && phone && setSent(true)}
                  disabled={!l.available}
                >
                  {l.available ? "📩 Request Viewing" : "Property Unavailable"}
                </button>
                <button style={{ ...btn.outline, width: "100%", padding: 13, fontSize: 14, borderRadius: 12, marginTop: 10 }}>
                  💬 Chat with Agent
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: 46, marginBottom: 12 }}>✅</div>
                <div style={{ fontFamily: font.display, fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Request Sent!</div>
                <div style={{ fontSize: 14, color: C.textSub, lineHeight: 1.7 }}>
                  The agent will contact you within 24 hours at the number you provided.
                </div>
              </div>
            )}

            {/* Agent */}
            <div style={{ marginTop: 22, paddingTop: 20, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "#2D6A4F", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, fontWeight: 700, flexShrink: 0,
              }}>JM</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>James Mwangi</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>Verified Agent · ⭐ 4.9</div>
              </div>
              <span style={{ fontSize: 20, cursor: "pointer" }}>📞</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
