import { NavLink, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navItems = [
  { label: 'Overview', to: '/' },
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Athletes', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
]

function Overview() {
  return (
    <section className="overview resource-page">
      <div className="page-heading"><p className="eyebrow">Wednesday, August 19</p><h1>Make today count.</h1><p>Your team is already in motion. Keep the streak going.</p></div>
      <div className="overview-grid"><Link className="overview-card overview-card-primary" to="/activities"><span className="card-kicker">This week</span><strong>Log an activity</strong><span>Turn movement into momentum <span aria-hidden="true">-&gt;</span></span></Link><Link className="overview-card" to="/leaderboard"><span className="card-kicker">Competition</span><strong>See the leaderboard</strong><span>Find your place in the pack <span aria-hidden="true">-&gt;</span></span></Link><Link className="overview-card" to="/workouts"><span className="card-kicker">For you</span><strong>Choose a workout</strong><span>There is always a next set <span aria-hidden="true">-&gt;</span></span></Link></div>
      <div className="overview-note"><span className="status-dot" /> OctoFit is ready for your next win.</div>
    </section>
  )
}

function App() {
  return <div className="app-shell"><header className="app-header"><Link className="brand" to="/"><span className="brand-mark">O</span><span>OctoFit<span className="brand-accent">/</span>Tracker</span></Link><nav aria-label="Primary navigation">{navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'}>{item.label}</NavLink>)}</nav></header><main><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main><footer>OCTOFIT TRACKER <span>Build your best day, one activity at a time.</span></footer></div>
}

export default App
