export const LISTINGS = [
  { id: 1, title: "Modern 2BR Apartment", location: "Westlands, Nairobi", price: 35000, beds: 2, baths: 1, sqft: 900, type: "Apartment", tag: "Featured", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80", amenities: ["WiFi", "Parking", "Security", "Gym"], available: true, rating: 4.8, reviews: 24, desc: "Spacious modern apartment in the heart of Westlands. Minutes from Sarit Centre and top restaurants. Fully furnished with high-speed fibre internet." },
  { id: 2, title: "Cozy Studio in Kilimani", location: "Kilimani, Nairobi", price: 22000, beds: 1, baths: 1, sqft: 500, type: "Studio", tag: "New", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80", amenities: ["WiFi", "Security", "CCTV"], available: true, rating: 4.5, reviews: 11, desc: "Perfect starter apartment for a professional. Walking distance to Valley Arcade and Yaya Centre. Reliable water and electricity." },
  { id: 3, title: "Spacious 3BR Townhouse", location: "Karen, Nairobi", price: 85000, beds: 3, baths: 2, sqft: 1800, type: "Townhouse", tag: "Luxury", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80", amenities: ["WiFi", "Parking", "Garden", "Borehole", "Generator"], available: true, rating: 4.9, reviews: 37, desc: "Elegant townhouse set in a leafy Karen compound. Large garden, DSQ included, ample parking. Ideal for families relocating to Nairobi." },
  { id: 4, title: "Affordable 1BR Bedsitter", location: "Kasarani, Nairobi", price: 9500, beds: 1, baths: 1, sqft: 300, type: "Bedsitter", tag: "Budget", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&q=80", amenities: ["Security", "Water"], available: true, rating: 4.1, reviews: 8, desc: "Clean, affordable bedsitter near Kasarani Stadium and TRM Mall. Good public transport access. Suitable for students and young professionals." },
  { id: 5, title: "Executive 4BR Villa", location: "Muthaiga, Nairobi", price: 180000, beds: 4, baths: 3, sqft: 3200, type: "Villa", tag: "Premium", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80", amenities: ["WiFi", "Pool", "Garden", "Generator", "Security", "Parking"], available: false, rating: 5.0, reviews: 15, desc: "Prestigious Muthaiga villa with swimming pool, lush garden, and 24-hr security. Fully equipped kitchen, backup generator, and DSQ for staff." },
  { id: 6, title: "Modern 2BR in Lavington", location: "Lavington, Nairobi", price: 48000, beds: 2, baths: 2, sqft: 1100, type: "Apartment", tag: "Featured", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80", amenities: ["WiFi", "Gym", "Parking", "Pool", "Security"], available: true, rating: 4.7, reviews: 19, desc: "Stunning apartment in a high-rise complex with rooftop pool. Open-plan living, fitted kitchen, and secure basement parking. Fibre-ready." },
  { id: 7, title: "Student Hostel Room", location: "Ruaraka, Nairobi", price: 6000, beds: 1, baths: 1, sqft: 200, type: "Bedsitter", tag: "Budget", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80", amenities: ["Security", "Water", "WiFi"], available: true, rating: 3.9, reviews: 44, desc: "Affordable self-contained room near several universities. Common laundry area, CCTV, and consistent water supply. Shared compound." },
  { id: 8, title: "3BR Maisonette", location: "Ruaka, Nairobi", price: 55000, beds: 3, baths: 2, sqft: 1400, type: "Maisonette", tag: "New", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80", amenities: ["Parking", "Borehole", "Security", "WiFi"], available: true, rating: 4.6, reviews: 6, desc: "Brand-new maisonette in a quiet Ruaka estate. Open kitchen, master en-suite, borehole water, and ample parking. Easy access to USIU and Ridgeways." },
  { id: 9, title: "1BR Apartment Mombasa Road", location: "Mlolongo, Nairobi", price: 16000, beds: 1, baths: 1, sqft: 450, type: "Apartment", tag: null, img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&q=80", amenities: ["Security", "Parking", "Water"], available: true, rating: 4.2, reviews: 13, desc: "Compact apartment along Mombasa Road corridor. Easy commute to Industrial Area and SGR Terminus. Good value for the location." },
]

export const NEIGHBORHOODS = [
  { name: "Westlands",  count: 42, img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=60" },
  { name: "Kilimani",   count: 31, img: "https://images.unsplash.com/photo-1591086520060-01adaa6b04bc?w=400&q=60" },
  { name: "Karen",      count: 18, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=60" },
  { name: "Lavington",  count: 23, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=60" },
  { name: "Kasarani",   count: 56, img: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400&q=60" },
  { name: "Muthaiga",   count: 9,  img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&q=60" },
]

export const TRUST_LAYERS = [
  {
    num: 1, icon: "💳", color: "#EAF3DE", border: "#639922",
    title: "Pay to Access",
    sub: "Financial commitment from both parties",
    who: ["Landlord", "Tenant"],
    how: "Tenants pay KSh 500/yr. Landlords pay KSh 2,000/yr. Neither can browse listings or post properties without payment. This creates an audit trail and filters out anonymous actors.",
    why: "Anonymous users can scam endlessly for free. The moment there's a payment, there's an M-Pesa number, a bank account, and a paper trail that law enforcement can subpoena.",
    steps: ["Payment processed via M-Pesa or card", "M-Pesa number tied to Safaricom subscriber data", "Account cannot be created without completed payment", "Repeat registrations with the same number are auto-blocked"],
  },
  {
    num: 2, icon: "🪪", color: "#E6F1FB", border: "#378ADD",
    title: "National ID Lock (KYC)",
    sub: "Every user tied to a real Kenyan identity",
    who: ["Landlord", "Tenant"],
    how: "Upload National ID or passport. Selfie matched against ID photo using facial recognition. ID number cross-referenced with IPRS (Integrated Population Registration System). Phone number must match the registered name.",
    why: "Scammers rely on anonymity. Once your face, ID number, and phone are linked to your account, every action on Keja is legally attributable to you personally.",
    steps: ["Upload front and back of National ID", "Live selfie taken and matched to ID photo via AI", "ID number verified against IPRS database", "Phone number (Safaricom/Airtel) permanently linked", "Account status becomes: Verified ✓"],
  },
  {
    num: 3, icon: "🏠", color: "#FFF4E0", border: "#BA7517",
    title: "Property Ownership Proof",
    sub: "Landlords must prove they own or manage the property",
    who: ["Landlord"],
    how: "Upload title deed, lease agreement, or letter of authority from the owner. GPS metadata from property photos must match the stated address. Keja field agents do physical spot-checks on premium listings.",
    why: "The most common Kenyan rental scam: someone advertises a property they don't own, collects advance rent, then vanishes. Property proof makes this structurally impossible.",
    steps: ["Title deed or ownership document uploaded", "OCR extracts plot number and owner name automatically", "Owner name cross-checked against verified ID on file", "Photo GPS metadata verified against listed address", "Listing only goes live after approval"],
  },
  {
    num: 4, icon: "🔒", color: "#FAECE7", border: "#993C1D",
    title: "Trust Stake & Escrow",
    sub: "KSh 10,000 refundable stake held against fraud",
    who: ["Landlord"],
    how: "Every landlord deposits a KSh 10,000 refundable stake into Keja escrow before their first listing goes live. If a verified scam is reported, the stake is transferred directly to the victim. Clean landlords get it back after 12 months.",
    why: "A subscription fee is a sunk cost — a scammer ignores it. A stake is a live liability. A landlord who scams loses KSh 10,000 immediately. The expected value of scamming on Keja becomes negative. This is the killer layer.",
    steps: ["KSh 10,000 deposited to Keja escrow via M-Pesa", "Stake balance shown publicly on landlord profile", "Tenant raises dispute within 14 days of incident", "Keja reviews evidence within 48 hours", "Stake transferred to victim if fraud is confirmed; account permanently suspended"],
  },
  {
    num: 5, icon: "🤖", color: "#E1F5EE", border: "#1D9E75",
    title: "AI Fraud Detection",
    sub: "Every listing scanned before going live",
    who: ["Landlord"],
    how: "AI scans every submitted listing: reverse image search for stolen photos, price anomaly detection vs area median, duplicate description fingerprinting, and messaging monitoring for 'pay me outside the platform' language.",
    why: "Fraudsters reuse the same photos, descriptions, and tactics across multiple scams. AI catches patterns at scale that human reviewers would miss — before any tenant is exposed.",
    steps: ["Listing submitted → photos reverse-searched instantly", "Description fingerprinted against known scam templates", "Price flagged if more than 35% below area median", "Messaging scanned for off-platform payment requests", "Flagged listings held for manual review before going live"],
  },
  {
    num: 6, icon: "⭐", color: "#FFF4E0", border: "#BA7517",
    title: "Mutual Trust Score",
    sub: "Both landlord and tenant are permanently rated",
    who: ["Landlord", "Tenant"],
    how: "After every completed transaction, both parties rate each other. Landlords see tenant scores before confirming viewings. Tenants see landlord review history. Scores are permanent and cannot be deleted or reset.",
    why: "Reputation is the oldest anti-fraud system in human history. Making it public, permanent, and mutual means bad actors are visible before they can strike again.",
    steps: ["Post-viewing rating prompt sent to both parties via SMS", "Minimum 3 reviews before score displays publicly", "Negative reviews cannot be removed by the subject", "Accounts below 3.0 stars get restricted listing visibility", "Verified move-in reviews weigh 3× more than basic ratings"],
  },
  {
    num: 7, icon: "⚖️", color: "#FCEBEB", border: "#A32D2D",
    title: "Legal Traceability & DCI Hook",
    sub: "Every confirmed scam is police-reportable with a ready dossier",
    who: ["Landlord", "Tenant"],
    how: "Keja auto-generates a crime report package when a scam is confirmed: verified ID, M-Pesa transaction history, messages, listing screenshots. The victim downloads it and walks into any DCI office.",
    why: "Most Kenyan scammers operate because getting caught costs them nothing. When a victim has a complete dossier with the scammer's verified ID, phone, and M-Pesa trail, prosecution becomes viable.",
    steps: ["Scam confirmed → evidence package auto-generated in PDF", "Package includes: ID, payment records, listing history, messages", "Victim downloads and takes to nearest DCI office", "Keja cooperates with valid court orders for additional data", "Confirmed offenders publicly blacklisted; cannot re-register"],
  },
]

export const SIMS = {
  fake: {
    label: "Fake landlord — advertises a property they don't own",
    steps: [
      { status: "pass",    icon: "💳", text: "Pays KSh 2,000 registration fee — now committed." },
      { status: "pass",    icon: "🪪", text: "Uploads their real National ID — passes KYC." },
      { status: "blocked", icon: "🏠", text: "BLOCKED at Layer 3 — cannot produce a title deed or ownership document. Listing never goes live." },
      { status: "blocked", icon: "🔒", text: "Also blocked here — no KSh 10,000 stake can be deposited for a property they don't own." },
    ],
    verdict: "Stopped at Layer 3 before a single tenant is harmed.",
  },
  photo: {
    label: "Stolen photos — copies a real listing from another site",
    steps: [
      { status: "pass",    icon: "💳", text: "Pays registration fee." },
      { status: "pass",    icon: "🪪", text: "Passes ID verification with their own real ID." },
      { status: "pass",    icon: "🏠", text: "Uploads a vague document for ownership." },
      { status: "blocked", icon: "🤖", text: "BLOCKED at Layer 5 — AI reverse image search matches photos to an existing listing on Property24 or BuyRentKenya. Listing flagged, manual review confirms no ownership." },
    ],
    verdict: "Stopped at Layer 5 — AI catches stolen photos before any tenant sees the listing.",
  },
  ghost: {
    label: "Ghost listing — real property, collects deposit then 'rents to someone else'",
    steps: [
      { status: "pass",    icon: "💳", text: "Pays registration fee." },
      { status: "pass",    icon: "🪪", text: "Passes ID verification — this is a real person." },
      { status: "pass",    icon: "🏠", text: "Owns the property — has real documents. Listing goes live." },
      { status: "pass",    icon: "🔒", text: "Deposits KSh 10,000 trust stake, believing they'll extract more." },
      { status: "warn",    icon: "🤖", text: "AI flags: unusually high viewing bookings with zero recorded move-ins." },
      { status: "blocked", icon: "🔒", text: "BLOCKED at Layer 4 — victim raises dispute. Keja reviews evidence and transfers KSh 10,000 stake to the victim. Account permanently suspended." },
    ],
    verdict: "Tenant is compensated from the stake. Scammer loses KSh 10,000 and their identity goes to a DCI report.",
  },
  repeat: {
    label: "Serial scammer — tries to re-register after being caught",
    steps: [
      { status: "blocked", icon: "🪪", text: "BLOCKED at Layer 2 — National ID is on the permanent blacklist from their previous account. Cannot register with the same ID." },
      { status: "blocked", icon: "🤖", text: "Even with someone else's ID, their selfie is in the facial recognition database. Biometric match triggers an immediate alert." },
      { status: "blocked", icon: "💳", text: "The M-Pesa number is also flagged. Any linked number is rejected at the payment layer." },
    ],
    verdict: "Permanently excluded from the platform. Their identity is already in a DCI crime report.",
  },
}

export const AMENITY_ICONS = {
  WiFi: "📶", Parking: "🚗", Security: "🔒", Gym: "💪",
  Pool: "🏊", Garden: "🌿", Generator: "⚡", Borehole: "💧",
  CCTV: "📷", Water: "🚿",
}

export const TAG_COLORS = {
  Featured: "#C4522A", New: "#2D6A4F", Luxury: "#7B2D8B",
  Budget: "#1565C0", Premium: "#B7791F",
}

export const LOCATIONS = ["All Locations","Westlands","Kilimani","Karen","Kasarani","Muthaiga","Lavington","Ruaraka","Ruaka","Mlolongo"]
export const TYPES = ["All Types","Apartment","Studio","Townhouse","Bedsitter","Villa","Maisonette"]
