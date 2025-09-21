import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { type ZodTypeProvider, validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod'

import { createUserRoute } from './routes/create-user-route'
import { loginRoute } from './routes/login-user'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createUserRoute)
app.register(loginRoute)

app.listen({
  host: '0.0.0.0',
  port: 3333,
}).then(() => {
  console.log('Server is running on http://localhost:3333')
})