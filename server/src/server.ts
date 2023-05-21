import Fastify from 'fastify'
import cors from '@fastify/cors'

import { routes } from './routes'
import { main } from './app'

import 'dotenv/config'

const app = Fastify()

app.register(cors)
app.register(main)
app.register(routes)

app
  .listen({
    port: 4751,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('server running on port 4751...')
  })
