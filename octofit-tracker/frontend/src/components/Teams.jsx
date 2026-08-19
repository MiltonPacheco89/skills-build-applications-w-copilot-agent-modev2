import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

const teamsApiUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRecords(teamsApiUrl).then(setTeams).then(() => setStatus('ready')).catch((loadError) => { setError(loadError.message); setStatus('error') })
  }, [])

  if (status === 'loading') return <p className="state-message">Loading teams...</p>
  if (status === 'error') return <p className="state-message error-message">{error}</p>

  return <section className="resource-page"><div className="page-heading"><p className="eyebrow">Find your people</p><h1>Teams</h1><p>Train together, keep each other moving.</p></div><div className="tile-grid">{teams.map((team) => <article className="team-tile" key={team._id ?? team.name}><span className="tile-mark">{team.name?.slice(0, 1) ?? 'T'}</span><h2>{team.name}</h2><p>Coach {team.coach ?? 'TBA'}</p><strong>{team.totalPoints ?? 0}<small> total points</small></strong><span className="member-count">{team.members?.length ?? 0} members</span></article>)}</div>{!teams.length && <p className="empty-message">No teams have been created yet.</p>}</section>
}

export default Teams
