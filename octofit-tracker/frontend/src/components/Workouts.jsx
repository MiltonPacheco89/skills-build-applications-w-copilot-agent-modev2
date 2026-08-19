import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRecords('workouts').then(setWorkouts).then(() => setStatus('ready')).catch((loadError) => { setError(loadError.message); setStatus('error') })
  }, [])

  if (status === 'loading') return <p className="state-message">Loading workouts...</p>
  if (status === 'error') return <p className="state-message error-message">{error}</p>

  return <section className="resource-page"><div className="page-heading"><p className="eyebrow">Your next session</p><h1>Workouts</h1><p>Simple plans for stronger, steadier progress.</p></div><div className="tile-grid">{workouts.map((workout) => <article className="workout-tile" key={workout._id ?? workout.title}><div className="workout-top"><span>{workout.type ?? 'training'}</span><span>{workout.difficulty ?? 'all levels'}</span></div><h2>{workout.title}</h2><p>{workout.exercises?.join(' / ') ?? 'A focused movement session.'}</p><strong>{workout.durationMinutes ?? 0}<small> minutes</small></strong></article>)}</div>{!workouts.length && <p className="empty-message">No workouts are available yet.</p>}</section>
}

export default Workouts
