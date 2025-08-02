import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import path from 'node:path'
import { env } from './config/env'
import { router } from './router'

async function main() {
  try {
    await mongoose.connect(env.MONGODB_URI)
    const app = express()
    const port = env.PORT

    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    )
    app.use(express.json())
    app.use(router)

    app.listen(port, () => {
      // biome-ignore lint/suspicious/noConsole: console.log
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: validate error
    console.error((error as Error).message)
  }
}

main()
