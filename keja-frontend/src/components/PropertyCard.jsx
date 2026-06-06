import { useState } from 'react'
import { C, font, btn } from '../styles'
import { AMENITY_ICONS, TAG_COLORS } from '../data'

export function StarRating({ r }) {
  return (
    <span style={{ color: C.amber, fontSize: 13, fontWeight: 700 }}>
      {"★".repeat(Math.floor(r))}{"☆".repeat(5 - Math.floor(r))}{" "}
      <span style={{ color: C.textMuted, fontWeight: 400 }}>{r}</span>
    </span>
  )
}

export function AmenityBadge({ a }) {
  return (
    <span style={{
      background: "#F5F0E8", borderRadius: 20, padding: "3px 10px",
      fontSize: 11, color: "#555", display: "inline-flex", alignItems: "center", gap: 4,
    }}>
      {AMENITY_ICONS[a] || "✓"} {a}
    </span>
  )
}

export default function PropertyCard({ listing, onView, saved, onToggleSave }) {
  const [hovered, setHovered] = useState(false)
  const l = listing

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onView(l)}
      style={{
        background: C.white, borderRadius: 18, overflow: "hidden",
        border: `1.5px solid ${C.border}`, cursor: "pointer",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.11)" : "0 1px 4px rgba(0,0,0,0.05)",
        transition: "transform .25s, box-shadow .25s",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative" }}>
        <img
          src={l.img} alt={l.title}
          style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
        />
        {l.tag && (
          <span style={{
            position: "absolute", top: 12, left: 12,
            background: TAG_COLORS[l.tag] || "#555", color: "#fff",
            borderRadius: 6, padding: "3px 10px", fontSize: 11,
            fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5,
          }}>
            {l.tag}
          </span>
        )}
        {!l.available && (
          <span style={{
            position: "absolute", top: 12, right: 44,
            background: "rgba(0,0,0,0.7)", color: "#fff",
            borderRadius: 6, padding: "3px 10px", fontSize: 11,
          }}>
            Taken
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSave(l.id) }}
          style={{
            position: "absolute", top: 10, right: 10,
            background: saved ? C.terracotta : "rgba(255,255,255,0.92)",
            border: "none", borderRadius: "50%", width: 32, height: 32,
            cursor: "pointer", fontSize: 15, display: "flex",
            alignItems: "center", justifyContent: "center",
            color: saved ? "#fff" : "#888", transition: "all .2s",
          }}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ fontFamily: font.display, fontSize: 17, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>{l.title}</div>
        <div style={{ fontSize: 13, color: C.textSub, marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}>
          📍 {l.location}
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#555", marginBottom: 12 }}>
          <span>🛏 {l.beds} bed{l.beds > 1 ? "s" : ""}</span>
          <span>🚿 {l.baths} bath</span>
          <span>📐 {l.sqft} sqft</span>
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", paddingTop: 12,
          borderTop: `1px solid ${C.border}`,
        }}>
          <div>
            <span style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.terracotta }}>
              KSh {l.price.toLocaleString()}
            </span>
            <span style={{ fontSize: 12, color: C.textMuted }}>/mo</span>
            <div style={{ marginTop: 4 }}>
              <StarRating r={l.rating} />
              <span style={{ fontSize: 11, color: C.textMuted }}> ({l.reviews})</span>
            </div>
          </div>
          <button
            style={{ ...btn.primary, padding: "9px 18px", fontSize: 13 }}
            onClick={(e) => { e.stopPropagation(); onView(l) }}
          >
            View →
          </button>
        </div>
      </div>
    </div>
  )
}
