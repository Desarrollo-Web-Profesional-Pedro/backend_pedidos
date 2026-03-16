import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { app } from '../src/app.js'

let isConnected = false

async function dbConnect() {
  if (isConnected) return
  await mongoose.connect(process.env.DATABASE_URL)
  isConnected = true
}

export default async function handler(req, res) {
  await dbConnect()
  return app(req, res)
}
