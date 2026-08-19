import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRecords('users').then(setUsers).then(() => setStatus('ready')).catch((loadError) => { setError(loadError.message); setStatus('error') })
  }, [])

  if (status === 'loading') return <p className="state-message">Loading athletes...</p>
  if (status === 'error') return <p className="state-message error-message">{error}</p>

  return <section className="resource-page"><div className="page-heading"><p className="eyebrow">The community</p><h1>Athletes</h1><p>Meet the people putting in the work.</p></div><div className="resource-list">{users.map((user) => <article className="resource-row" key={user._id ?? user.email}><div className="avatar">{user.name?.slice(0, 1) ?? '?'}</div><div className="leader-name"><strong>{user.name}</strong><span>Grade {user.grade ?? 'N/A'}</span></div><div className="points">{user.points ?? 0}<small> pts</small></div></article>)}</div>{!users.length && <p className="empty-message">No athletes found.</p>}</section>
}

export default Users
