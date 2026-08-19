import mongoose from 'mongoose'

const { Schema } = mongoose
const objectId = Schema.Types.ObjectId

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    grade: { type: Number, required: true, min: 9, max: 12 },
    points: { type: Number, default: 0, min: 0 },
    team: { type: objectId, ref: 'Team' },
  },
  { timestamps: true },
)

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    coach: { type: String, required: true, trim: true },
    members: [{ type: objectId, ref: 'User' }],
    totalPoints: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
)

const activitySchema = new Schema(
  {
    user: { type: objectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['running', 'walking', 'cycling', 'strength'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceMiles: { type: Number, min: 0 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
)

const leaderboardSchema = new Schema(
  {
    user: { type: objectId, ref: 'User', required: true, unique: true },
    team: { type: objectId, ref: 'Team', required: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    period: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, enum: ['cardio', 'strength', 'mobility'] },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, required: true, trim: true }],
    recommendedFor: [{ type: objectId, ref: 'User' }],
  },
  { timestamps: true },
)

export const User = mongoose.models.User || mongoose.model('User', userSchema)
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema)
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema)
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema)
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema)