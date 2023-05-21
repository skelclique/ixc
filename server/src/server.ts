import Fastify from 'fastify'
import cors from '@fastify/cors'

import { routes } from './routes'
import { main } from './app'

import 'dotenv/config'

const app = Fastify()

app.register(cors)
app.register(main)
app.register(routes)

app.listen({
  port: Number(process.env.ENV_PORT),
  host: '0.0.0.0',
})
