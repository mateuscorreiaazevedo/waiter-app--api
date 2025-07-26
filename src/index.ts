import express from 'express'
import 'dotenv/config'

const app = express()

app.listen(3333, () => {
  // biome-ignore lint/suspicious/noConsole: test framework
  console.log('Server running on port 3333')
})
