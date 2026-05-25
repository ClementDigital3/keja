# Keja.ke — Kenya's Trusted House Rental Platform

A full-featured rental platform built for the Kenyan market with a 7-layer anti-scam Trust Stack.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## Project Structure

```
keja/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx          # React entry point
    ├── App.jsx           # Root component + page routing
    ├── data.js           # All listings, trust layers, sim data
    ├── styles.js         # Shared colour tokens + button styles
    ├── components/
    │   ├── Navbar.jsx
    │   └── PropertyCard.jsx
    └── pages/
        ├── Home.jsx      # Landing page
        ├── Listings.jsx  # Search + filter page
        ├── Detail.jsx    # Individual property page
        └── Trust.jsx     # Trust Stack explainer
```

## Pages

| Page | Description |
|------|-------------|
| **Home** | Hero, neighbourhood grid, featured listings, landlord CTA |
| **Listings** | Full search, filters (location, type, price, beds, availability), sort |
| **Detail** | Property info, amenities, lease terms, viewing request form |
| **Trust & Safety** | 7-layer anti-scam architecture, scam simulator, pricing model |

## Anti-Scam Trust Stack

1. **Pay to Access** — KSh 500/yr (tenant) · KSh 2,000/yr (landlord)
2. **National ID Lock (KYC)** — IPRS verification + selfie match
3. **Property Ownership Proof** — Title deed + GPS photo metadata
4. **Trust Stake & Escrow** — KSh 10,000 refundable stake, forfeited on proven fraud
5. **AI Fraud Detection** — Reverse image search, price anomaly, duplicate fingerprinting
6. **Mutual Trust Score** — Permanent public ratings for both parties
7. **Legal Traceability & DCI Hook** — Auto-generated crime report package

## Next Steps (Backend)

- [ ] Node.js + Express API
- [ ] MongoDB — property, user, agent schemas
- [ ] M-Pesa Daraja API — payment + stake deposit
- [ ] Safaricom IPRS API — National ID verification
- [ ] Cloudinary — property photo uploads
- [ ] JWT auth — landlord + tenant accounts
- [ ] Google Maps — embedded map per listing
- [ ] WhatsApp Bot integration (Twilio)

## Built With

- React 18 + Vite
- Pure CSS-in-JS (no external UI library)
- Unsplash (property photos — replace with Cloudinary in production)

---

Built in Kenya 🇰🇪 by Claudius
# keja
