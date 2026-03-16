import dotenv from 'dotenv'
dotenv.config()

import { app } from '../src/app.js'
import { initBaseDeDatos } from '../src/bd/init.js'

let conectado = false

async function conectar() {
  if (!conectado) {
    await initBaseDeDatos()
    conectado = true
  }
}

await conectar()

export default app
