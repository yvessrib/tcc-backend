import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { type ZodTypeProvider, validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.listen({
  host: '0.0.0.0',
  port: 3333,
}).then(() => {
  console.log('Server ids running on http://0.0.0.0:3333')
})