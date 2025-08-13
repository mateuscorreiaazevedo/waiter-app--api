import http from 'node:http'
import path from 'node:path'
import { config } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import { router } from './router'

// Configurar dotenv baseado no ambiente
const envFile = process.env.NODE_ENV === 'development' ? '.env.local' : '.env'
config({ path: path.resolve(process.cwd(), envFile) })

const app = express()
const server = http.createServer(app)
export const socketService = new Server(server)

async function main() {
  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 8080
    await mongoose.connect(process.env.MONGODB_URI as string)

    socketService.on('connection', () => {
      // biome-ignore lint/suspicious/noConsole: console.log
      console.log('Client connected')
    })

    app.use((_req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
      res.setHeader('Access-Control-Allow-Methods', '*')
      res.setHeader('Access-Control-Allow-Headers', '*')

      next()
    })
    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    )
    app.use(express.json())
    app.use(router)

    server.listen(port, () => {
      // biome-ignore lint/suspicious/noConsole: console.log
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: validate error
    console.error((error as Error).message)
  }
}

main()
