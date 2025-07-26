import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    const app = express()
    app.listen(3333, () => {
      // biome-ignore lint/suspicious/noConsole: test framework
      console.log('Server running on port 3333')
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

main()
