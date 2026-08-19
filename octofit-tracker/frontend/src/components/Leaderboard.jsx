import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

const leaderboardApiUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRecords(leaderboardApiUrl).then(setEntries).then(() => setStatus('ready')).catch((loadError) => { setError(loadError.message); setStatus('error') })
  }, [])

  if (status === 'loading') return <p className="state-message">Loading leaderboard...</p>
  if (status === 'error') return <p className="state-message error-message">{error}</p>

  return <section className="resource-page"><div className="page-heading"><p className="eyebrow">The standings</p><h1>Leaderboard</h1><p>Every point counts. See who is leading the pack.</p></div><div className="resource-list leaderboard-list">{entries.map((entry, index) => <article className="resource-row" key={entry._id ?? `${entry.user}-${index}`}><div className="rank">{entry.rank ?? index + 1}</div><div className="leader-name"><strong>{entry.user?.name ?? entry.user ?? 'Athlete'}</strong><span>{entry.team?.name ?? entry.team ?? 'Independent'}</span></div><div className="points">{entry.points ?? 0}<small> pts</small></div></article>)}</div>{!entries.length && <p className="empty-message">The leaderboard is waiting for its first entries.</p>}</section>
}

export default Leaderboard
