export async function fetchRecords(endpoint) {
  const response = await fetch(endpoint)
  if (!response.ok) {
    throw new Error(`Unable to load ${component} (${response.status})`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  return payload.results ?? payload.data ?? payload.items ?? []
}

export function formatDate(value) {
  if (!value) return 'Unknown date'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}
