import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getOrCreateCart } from "../../../functions/cart/get-or-create-cart";
import z from "zod";

export const getOrCreateCartRoute: FastifyPluginAsyncZod = async app => {
  app.get('/cart/:id', {
    schema: {
      description: 'Get or create a cart by ID',
      tags: ['Cart'],
      params: z.object({
        id: z.string()
      }),
    },
  }, async (request, reply) => {
    try {
      const { id } = request.params;
      const cart = await getOrCreateCart(id);
      return cart
    } catch (error) {
      reply.status(500).send({ error: "Could not retrieve or create cart" });
    }
  })
};