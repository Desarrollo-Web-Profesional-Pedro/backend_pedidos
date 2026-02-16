import dotenv from 'dotenv'
dotenv.config()

import { app } from './app.js'
import { initBaseDeDatos } from './bd/init.js'

try {
  await initBaseDeDatos()
  const PORT = process.env.PORT
  app.listen(PORT)
  console.info(`Servidor Express ejecutandose sobre http://localhost:${PORT}`)
} catch (err) {
  console.error('Error conecteando a la Base de Datos:', err)
}
