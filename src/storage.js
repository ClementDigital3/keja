const KEYS = {
  USERS:    'keja_users',
  SESSION:  'keja_session',
  LISTINGS: 'keja_listings',
}

// ── Users ─────────────────────────────────────────────────────────────────────
export function getUsers() {
  try { return JSON.parse(localStorage.getItem(KEYS.USERS)) || [] }
  catch { return [] }
}

export function saveUser(user) {
  const users = getUsers()
  if (users.find(u => u.email === user.email))
    return { error: 'An account with this email already exists.' }
  users.push(user)
  localStorage.setItem(KEYS.USERS, JSON.stringify(users))
  return { success: true }
}

export function findUser(email, password, role) {
  const users = getUsers()
  const user  = users.find(u => u.email === email && u.password === password && u.role === role)
  if (!user) return { error: 'Invalid email, password, or account type.' }
  const { password: _, ...safe } = user
  return { user: safe }
}

export function updateUser(email, updates) {
  const users   = getUsers()
  const index   = users.findIndex(u => u.email === email)
  if (index === -1) return
  users[index]  = { ...users[index], ...updates }
  localStorage.setItem(KEYS.USERS, JSON.stringify(users))
  // Return safe version (no password)
  const { password: _, ...safe } = users[index]
  return safe
}

// ── Session ───────────────────────────────────────────────────────────────────
export function saveSession(user) {
  localStorage.setItem(KEYS.SESSION, JSON.stringify(user))
}

export function getSession() {
  try { return JSON.parse(localStorage.getItem(KEYS.SESSION)) || null }
  catch { return null }
}

export function clearSession() {
  localStorage.removeItem(KEYS.SESSION)
}

// ── Tenant subscription ───────────────────────────────────────────────────────
export function activateTenantSubscription(email) {
  const expiry  = new Date()
  expiry.setFullYear(expiry.getFullYear() + 1)
  const updates = { subscriptionPaid: true, subscriptionExpiry: expiry.toISOString() }
  const updated = updateUser(email, updates)
  if (updated) saveSession(updated)
  return updated
}

export function isTenantSubscribed(user) {
  if (!user || user.role !== 'tenant') return false
  if (!user.subscriptionPaid)          return false
  return new Date(user.subscriptionExpiry) > new Date()
}

// ── Listings ──────────────────────────────────────────────────────────────────
export function getSavedListings() {
  try { return JSON.parse(localStorage.getItem(KEYS.LISTINGS)) || [] }
  catch { return [] }
}

export function saveListings(listings) {
  localStorage.setItem(KEYS.LISTINGS, JSON.stringify(listings))
}