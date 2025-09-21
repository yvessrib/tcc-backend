import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod';
import { createUser } from '../../functions/auth/create-user';

export const createUserRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/users', 
    {
      schema: {
        body: z.object({
          name: z.string().min(4),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },

    async (request, reply) => {
      const { name, email, password } = request.body

      await createUser({
        name,
        email,
        password,
      });

      return reply.status(200).send("User created successfully");
    }
  )
}