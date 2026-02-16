import mongoose from 'mongoose'
import { beforeAll, afterAll } from '@jest/globals'

import { initBaseDeDatos } from '../bd/init.js'

beforeAll(async () => {
  await initBaseDeDatos()
})

afterAll(async () => {
  await mongoose.disconnect()
})
