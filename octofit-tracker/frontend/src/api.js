const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export async function fetchRecords(component) {
  const response = await fetch(`${apiBaseUrl}/${component}/`)
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
