import { useState } from 'react'
import { C, font, btn } from '../styles'
import { TRUST_LAYERS, SIMS } from '../data'

export default function Trust() {
  const [activeLayer, setActiveLayer] = useState(0)
  const [tab, setTab] = useState("layers")
  const [simType, setSimType] = useState("fake")

  const layer = TRUST_LAYERS[activeLayer]
  const sim = SIMS[simType]

  const cardStyle = {
    background: C.white, border: `1.5px solid ${C.border}`,
    borderRadius: 16, padding: 24,
  }

  const labelStyle = {
    fontSize: 11, fontWeight: 700, textTransform: "uppercase",
    letterSpacing: 0.8, color: C.textMuted, marginBottom: 8, marginTop: 18,
  }

  const simRowBg = { blocked: "#FCEBEB", warn: "#FFF4E0", pass: "#EAF3DE" }
  const simRowColor = { blocked: "#7A1F1F", warn: "#5A3206", pass: "#1E4D0A" }

  return (
    <div style={{ background: C.cream, minHeight: "100vh" }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1A1A1A 0%, #2D3A1E 100%)",
        padding: "60px 24px 52px", textAlign: "center",
      }}>
        <span style={{
          display: "inline-block", background: "rgba(196,82,42,0.25)",
          border: "1px solid rgba(196,82,42,0.45)", color: C.amber,
          borderRadius: 20, padding: "5px 18px", fontSize: 12,
          fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20,
        }}>
          🔒 Trust & Safety
        </span>
        <h1 style={{ fontFamily: font.display, fontSize: "clamp(28px, 5vw, 48px)", color: "#FFFDF9", fontWeight: 700, marginBottom: 14 }}>
          How Keja Eliminates Scammers
        </h1>
        <p style={{ fontSize: 15, color: "rgba(255,253,249,0.65)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          Payment alone won't stop fraud — a scammer will pay KSh 500 to steal KSh 50,000.<br />
          Keja uses a 7-layer Trust Stack where scamming becomes structurally impossible.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 36, borderBottom: `1.5px solid ${C.border}` }}>
          {[["layers", "The 7 Layers"], ["sim", "Scam Simulator"], ["model", "Pricing Model"]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                padding: "12px 24px", fontSize: 14, fontWeight: 600,
                cursor: "pointer", border: "none", background: "none",
                fontFamily: font.body, color: tab === key ? C.terracotta : C.textSub,
                borderBottom: tab === key ? `2.5px solid ${C.terracotta}` : "2.5px solid transparent",
                marginBottom: -2, transition: "all .15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── LAYERS TAB ── */}
        {tab === "layers" && (
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24 }}>
            {/* Layer list */}
            <div>
              {TRUST_LAYERS.map((l, i) => (
                <div
                  key={i}
                  onClick={() => setActiveLayer(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 14px", borderRadius: 12, marginBottom: 8,
                    border: activeLayer === i ? `2px solid ${l.border}` : `1.5px solid ${C.border}`,
                    background: activeLayer === i ? l.color : C.white,
                    cursor: "pointer", transition: "all .15s",
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, minWidth: 14 }}>{l.num}</span>
                  <div style={{
                    width: 36, height: 36, borderRadius: 9,
                    background: l.color, border: `1px solid ${l.border}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                  }}>
                    {l.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{l.title}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>{l.sub}</div>
                  </div>
                  <span style={{ fontSize: 11, color: C.textMuted }}>›</span>
                </div>
              ))}
            </div>

            {/* Detail panel */}
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: layer.color, border: `1px solid ${layer.border}55`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                }}>
                  {layer.icon}
                </div>
                <div>
                  <h2 style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
                    Layer {layer.num}: {layer.title}
                  </h2>
                  <div style={{ display: "flex", gap: 6 }}>
                    {layer.who.map(w => (
                      <span key={w} style={{
                        background: w === "Landlord" ? "#FAECE7" : "#E6F1FB",
                        color: w === "Landlord" ? "#993C1D" : "#185FA5",
                        borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 600,
                      }}>
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p style={labelStyle}>How it works</p>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.8, margin: 0 }}>{layer.how}</p>

              <p style={labelStyle}>Why this layer matters</p>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.8, margin: 0 }}>{layer.why}</p>

              <p style={labelStyle}>Step by step</p>
              {layer.steps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: "#EAF3DE", color: "#3B6D11",
                    fontSize: 11, fontWeight: 700, display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, paddingTop: 2 }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SIMULATOR TAB ── */}
        {tab === "sim" && (
          <div>
            <p style={{ fontSize: 14, color: C.textSub, marginBottom: 22, lineHeight: 1.7 }}>
              Pick a scammer type and trace exactly which layer stops them — and why they can't bypass it.
            </p>
            <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
              {[["fake", "🎭 Fake landlord"], ["photo", "📷 Stolen photos"], ["ghost", "👻 Ghost listing"], ["repeat", "🔄 Serial scammer"]].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSimType(key)}
                  style={{
                    ...btn.ghost,
                    background: simType === key ? "#FAF0EC" : C.white,
                    color: simType === key ? C.terracotta : "#555",
                    borderColor: simType === key ? C.terracotta : C.border,
                    fontWeight: simType === key ? 700 : 600,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div style={{ maxWidth: 700 }}>
              <h3 style={{ fontFamily: font.display, fontSize: 18, fontWeight: 700, marginBottom: 18 }}>
                Scenario: {sim.label}
              </h3>
              {sim.steps.map((step, i) => (
                <div key={i} style={{
                  display: "flex", gap: 14, alignItems: "flex-start",
                  padding: "13px 16px", borderRadius: 12, marginBottom: 8,
                  background: simRowBg[step.status],
                  border: `1px solid ${step.status === "blocked" ? "#F09595" : step.status === "warn" ? "#FAC775" : "#C0DD97"}`,
                }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{step.icon}</span>
                  <span style={{ fontSize: 14, color: simRowColor[step.status], lineHeight: 1.6 }}>{step.text}</span>
                </div>
              ))}
              <div style={{
                background: "#EAF3DE", border: "1px solid #97C459",
                borderRadius: 12, padding: "15px 18px",
                display: "flex", gap: 12, alignItems: "flex-start", marginTop: 16,
              }}>
                <span style={{ fontSize: 22 }}>✅</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#1E4D0A", lineHeight: 1.6 }}>{sim.verdict}</span>
              </div>
            </div>
          </div>
        )}

        {/* ── PRICING MODEL TAB ── */}
        {tab === "model" && (
          <div>
            {/* Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 32 }}>
              {[["KSh 500", "Tenant annual fee", "🏠"], ["KSh 2,000", "Landlord annual fee", "🏢"], ["KSh 10,000", "Refundable trust stake", "🔒"]].map(([n, l, ic]) => (
                <div key={l} style={{ ...cardStyle, textAlign: "center", padding: "24px 18px" }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{ic}</div>
                  <div style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700, color: C.terracotta }}>{n}</div>
                  <div style={{ fontSize: 13, color: C.textMuted, marginTop: 5 }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Compare */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              <div style={{ background: "#FCEBEB", border: "1.5px solid #F09595", borderRadius: 14, padding: 22 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#791F1F", marginBottom: 14 }}>❌ Free platforms (BuyRentKenya, etc.)</p>
                {["Anyone can list anonymously", "No identity verification", "Scammer loses nothing if caught", "Victim has zero recourse", "Platform has no fraud incentive", "New account = clean slate"].map(t => (
                  <div key={t} style={{ display: "flex", gap: 8, fontSize: 13, color: "#5A1F1F", marginBottom: 8 }}><span>✗</span><span>{t}</span></div>
                ))}
              </div>
              <div style={{ background: "#EAF3DE", border: "1.5px solid #97C459", borderRadius: 14, padding: 22 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#1E4D0A", marginBottom: 14 }}>✅ Keja (paid + verified)</p>
                {["Every user verified against National ID", "Every landlord's ownership document checked", "Scammer's KSh 10,000 stake goes to victim", "Paper trail ready for DCI prosecution", "AI monitors every listing before it goes live", "Permanent biometric blacklist — no second chance"].map(t => (
                  <div key={t} style={{ display: "flex", gap: 8, fontSize: 13, color: "#27500A", marginBottom: 8 }}><span>✓</span><span>{t}</span></div>
                ))}
              </div>
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                Why the stake model beats a simple subscription fee
              </h3>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.8, margin: 0 }}>
                A scammer will happily pay KSh 2,000 to defraud someone out of KSh 50,000 — the annual fee is completely irrelevant to them.
                But if they must also deposit <strong>KSh 10,000 that gets transferred directly to the victim the moment a scam is proven</strong>,
                the expected value of scamming on Keja becomes negative. No rational fraudster enters a game where being caught means they
                pay the victim KSh 10,000 on top of losing their verified identity to a police report. The stake also becomes a powerful
                marketing signal to honest landlords — it's a public trust badge that sets Keja apart from every other platform in Kenya.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
