import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { pedidosRoutes } from './rutas/pedidos.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())

pedidosRoutes(app)

app.get('/', (req, res) => {
  res.send('Hola from Express!')
})

export { app }
