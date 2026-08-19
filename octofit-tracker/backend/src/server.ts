import express from 'express'
import { connectDatabase } from './config/database.js'
import { apiRouter } from './routes/api.js'

const app = express()
const port = Number(process.env.PORT || 8000)
const baseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())
app.use('/api', apiRouter)

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl })
})

async function startServer() {
  try {
    await connectDatabase()
    app.listen(port, () => {
      console.log(`OctoFit API listening at ${baseUrl}`)
    })
  } catch (error) {
    console.error('Unable to start OctoFit API:', error)
    process.exit(1)
  }
}

startServer()
