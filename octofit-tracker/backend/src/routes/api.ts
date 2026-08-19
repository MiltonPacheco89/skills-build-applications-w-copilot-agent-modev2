import { Router, type Request, type Response } from 'express'
import type { Model } from 'mongoose'
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js'

type ResourceModel = Model<Record<string, unknown>>

function resourceRouter(model: ResourceModel) {
  const router = Router()

  router.get('/', async (_request: Request, response: Response) => {
    try {
      const records = await model.find().sort({ createdAt: -1 }).lean()
      response.json(records)
    } catch (error) {
      response.status(500).json({ error: 'Unable to fetch records', details: String(error) })
    }
  })

  router.post('/', async (request: Request, response: Response) => {
    try {
      const record = await model.create(request.body)
      response.status(201).json(record)
    } catch (error) {
      response.status(400).json({ error: 'Unable to create record', details: String(error) })
    }
  })

  return router
}

export const apiRouter = Router()

apiRouter.use('/users', resourceRouter(User))
apiRouter.use('/teams', resourceRouter(Team))
apiRouter.use('/activities', resourceRouter(Activity))
apiRouter.use('/leaderboard', resourceRouter(Leaderboard))
apiRouter.use('/workouts', resourceRouter(Workout))