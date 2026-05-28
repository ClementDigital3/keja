import { useState } from 'react'
import { C, font, btn } from '../styles'
import { LOCATIONS, TYPES } from '../data'
import PropertyCard from '../components/PropertyCard'

export default function Listings({ savedIds, toggleSave, setSelectedListing, setPage, initialSearch, listings = [], currentUser }) {
  const [search, setSearch] = useState(initialSearch || "")
  const [location, setLocation] = useState("All Locations")
  const [type, setType] = useState("All Types")
  const [maxPrice, setMaxPrice] = useState(200000)
  const [minBeds, setMinBeds] = useState(0)
  const [availOnly, setAvailOnly] = useState(false)
  const [sort, setSort] = useState("rating")
  const [showFilters, setShowFilters] = useState(true)

  const filtered = listings
    .filter(l => {
      const q = search.toLowerCase()
      return (
        (l.title.toLowerCase().includes(q) || l.location.toLowerCase().includes(q)) &&
        (location === "All Locations" || l.location.includes(location)) &&
        (type === "All Types" || l.type === type) &&
        l.price <= maxPrice &&
        l.beds >= minBeds &&
        (!availOnly || l.available)
      )
    })
    .sort((a, b) =>
      sort === "price-asc" ? a.price - b.price :
      sort === "price-desc" ? b.price - a.price :
      b.rating - a.rating
    )

  const inputStyle = {
    border: `1.5px solid ${C.border}`, borderRadius: 10,
    padding: "10px 14px", fontSize: 14, fontFamily: font.body,
    background: C.cream, outline: "none", width: "100%",
    boxSizing: "border-box", color: C.dark,
  }

  return (
    <div style={{ maxWidth: 1140, margin: "0 auto", padding: "36px 24px 80px" }}>
      {currentUser && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.textMuted, marginBottom: 20 }}>
          <span
            onClick={() => setPage(currentUser.role === 'landlord' ? 'dashboard' : 'tenant-dashboard')}
            style={{ color: C.terracotta, cursor: 'pointer', fontWeight: 600 }}
          >
            My Dashboard
          </span>
          <span>›</span>
          <span style={{ color: C.dark, fontWeight: 500 }}>Listings</span>
        </div>
      )}
      <h1 style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
        Find a House in Kenya
      </h1>
      <p style={{ color: C.textSub, fontSize: 14, marginBottom: 28 }}>
        All listings are ID-verified and backed by the Keja Trust Stack.
      </p>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <button
          style={{ ...btn.primary, padding: "10px 20px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
          onClick={() => setShowFilters(f => !f)}
        >
          ⚙️ Filters {showFilters ? "▲" : "▼"}
        </button>
        <div style={{ flex: 1, minWidth: 200 }}>
          <input
            style={inputStyle}
            placeholder="🔍  Search properties, locations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          style={{ ...inputStyle, width: "auto", cursor: "pointer" }}
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="rating">Sort: Top Rated</option>
          <option value="price-asc">Sort: Price ↑</option>
          <option value="price-desc">Sort: Price ↓</option>
        </select>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div style={{
          background: C.white, border: `1.5px solid ${C.border}`,
          borderRadius: 16, padding: "22px 24px", marginBottom: 28,
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 20,
        }}>
          {/* Location */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: C.textMuted, marginBottom: 7 }}>Location</div>
            <select style={inputStyle} value={location} onChange={e => setLocation(e.target.value)}>
              {LOCATIONS.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          {/* Type */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: C.textMuted, marginBottom: 7 }}>Property Type</div>
            <select style={inputStyle} value={type} onChange={e => setType(e.target.value)}>
              {TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          {/* Price */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: C.textMuted, marginBottom: 7 }}>
              Max Price: KSh {maxPrice.toLocaleString()}
            </div>
            <input type="range" min={5000} max={200000} step={1000}
              value={maxPrice} onChange={e => setMaxPrice(+e.target.value)}
              style={{ width: "100%", accentColor: C.terracotta }} />
          </div>
          {/* Beds */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: C.textMuted, marginBottom: 7 }}>
              Min Bedrooms: {minBeds === 0 ? "Any" : minBeds}
            </div>
            <input type="range" min={0} max={4} step={1}
              value={minBeds} onChange={e => setMinBeds(+e.target.value)}
              style={{ width: "100%", accentColor: C.terracotta }} />
          </div>
          {/* Available */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer", paddingBottom: 10 }}>
              <input type="checkbox" checked={availOnly} onChange={e => setAvailOnly(e.target.checked)}
                style={{ accentColor: C.terracotta, width: 16, height: 16 }} />
              Available only
            </label>
          </div>
        </div>
      )}

      <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 22 }}>
        {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
      </p>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 24px", color: C.textMuted }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>🏚</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "#555", marginBottom: 6 }}>No properties match your filters</div>
          <div style={{ fontSize: 14 }}>Try broadening your search or adjusting the price range.</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 24 }}>
          {filtered.map(l => (
            <PropertyCard
              key={l.id} listing={l}
              saved={savedIds.includes(l.id)}
              onToggleSave={toggleSave}
              onView={(listing) => { setSelectedListing(listing); setPage("detail") }}
            />
          ))}
        </div>
      )}
    </div>
  )
}