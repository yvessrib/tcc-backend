import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getOrCreateCart } from "../../../functions/cart/get-or-create-cart";
import { removeItemFromCart } from "../../../functions/cart/remove-item-from-cart";

export const deleteItemFromCartRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/cart',
  {
    schema: {
      description: 'Remove item from cart',
      tags: ['Cart'],
      body: z.object({
        cartId: z.string(),
        productId: z.number().min(1),
      }),
    },
  },
    async (request, reply) => {
      const { cartId, productId } = request.body;

      await removeItemFromCart({
        cartId,
        productId
      });

      return reply.status(200).send("Product deleted successfully")
    }
  )
}