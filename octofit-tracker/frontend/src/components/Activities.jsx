import { useEffect, useState } from 'react'
import { fetchRecords, formatDate } from '../api.js'

const activitiesApiUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRecords(activitiesApiUrl)
      .then((records) => {
        setActivities(records)
        setStatus('ready')
      })
      .catch((loadError) => {
        setError(loadError.message)
        setStatus('error')
      })
  }, [])

  if (status === 'loading') return <p className="state-message">Loading activities...</p>
  if (status === 'error') return <p className="state-message error-message">{error}</p>

  return (
    <section className="resource-page">
      <div className="page-heading"><p className="eyebrow">Movement log</p><h1>Activities</h1><p>Recent workouts and the points they earned.</p></div>
      <div className="resource-list">
        {activities.map((activity) => (
          <article className="resource-row" key={activity._id ?? `${activity.type}-${activity.completedAt}`}>
            <div><strong>{activity.type ?? 'Workout'}</strong><span>{formatDate(activity.completedAt)}</span></div>
            <div className="row-metric">{activity.durationMinutes ?? 0}<small> min</small></div>
            <div className="points">+{activity.points ?? 0}<small> pts</small></div>
          </article>
        ))}
      </div>
      {!activities.length && <p className="empty-message">No activities logged yet.</p>}
    </section>
  )
}

export default Activities
