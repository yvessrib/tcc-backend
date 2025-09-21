import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { loginUser } from "../../functions/auth/login-user";

export const loginRoute: FastifyPluginAsyncZod = async app => {
  app.post('/login', {
    schema: {
      body: z.object({
        email: z.string().email(),
        password: z.string().min(6)
      })
    },
  }, 

  async (request, reply) => {
    const { email, password } = request.body

    try {
      const { token, user } = await loginUser({ email, password })

      return reply.status(200).send({
        message: "Login successful",
        token,
        user,
      });
    } catch (err) {
      return reply.status(401).send({
        message: err instanceof Error ? err.message : "Unauthorized"
      })
    }
  }

)
}