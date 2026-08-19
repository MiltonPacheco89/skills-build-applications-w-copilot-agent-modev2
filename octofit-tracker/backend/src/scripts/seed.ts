import mongoose from 'mongoose'
import { connectDatabase } from '../config/database.js'
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js'

// Seed the octofit_db database with test data.
async function seed() {
  await connectDatabase()

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const teams = await Team.create([
    { name: 'Trailblazers', coach: 'Coach Rivera', totalPoints: 420 },
    { name: 'Peak Performers', coach: 'Coach Thompson', totalPoints: 365 },
  ])

  const users = await User.create([
    { name: 'Avery Johnson', email: 'avery.johnson@mergington.edu', grade: 10, points: 235, team: teams[0]._id },
    { name: 'Jordan Lee', email: 'jordan.lee@mergington.edu', grade: 11, points: 185, team: teams[0]._id },
    { name: 'Samira Patel', email: 'samira.patel@mergington.edu', grade: 9, points: 210, team: teams[1]._id },
  ])

  await Team.bulkWrite([
    { updateOne: { filter: { _id: teams[0]._id }, update: { members: [users[0]._id, users[1]._id] } } },
    { updateOne: { filter: { _id: teams[1]._id }, update: { members: [users[2]._id] } } },
  ])

  await Activity.create([
    { user: users[0]._id, type: 'running', durationMinutes: 32, distanceMiles: 3.1, points: 100, completedAt: new Date('2026-08-17') },
    { user: users[1]._id, type: 'strength', durationMinutes: 45, points: 85, completedAt: new Date('2026-08-16') },
    { user: users[2]._id, type: 'cycling', durationMinutes: 50, distanceMiles: 8.4, points: 110, completedAt: new Date('2026-08-18') },
  ])

  await Leaderboard.create([
    { user: users[0]._id, team: teams[0]._id, rank: 1, points: 235, period: 'August 2026' },
    { user: users[2]._id, team: teams[1]._id, rank: 2, points: 210, period: 'August 2026' },
    { user: users[1]._id, team: teams[0]._id, rank: 3, points: 185, period: 'August 2026' },
  ])

  await Workout.create([
    { title: 'After-School Cardio Circuit', type: 'cardio', difficulty: 'beginner', durationMinutes: 25, exercises: ['Jumping jacks', 'High knees', 'Fast feet'] },
    { title: 'Strength Foundations', type: 'strength', difficulty: 'intermediate', durationMinutes: 35, exercises: ['Bodyweight squats', 'Push-ups', 'Plank shoulder taps'], recommendedFor: [users[1]._id] },
    { title: 'Recovery Mobility Flow', type: 'mobility', difficulty: 'beginner', durationMinutes: 15, exercises: ['Cat-cow', 'World\'s greatest stretch', 'Child\'s pose'], recommendedFor: [users[0]._id, users[2]._id] },
  ])

  console.log('Seeded users, teams, activities, leaderboard, and workouts.')
}

seed()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
