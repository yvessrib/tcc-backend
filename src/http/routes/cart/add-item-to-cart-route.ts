import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod';
import { addItemToCart } from '../../../functions/cart/add-item-to-cart';

export const addItemToCartRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/cart',
    {
      schema: {
        body: z.object({
          cartId: z.string(),
          productId: z.number().min(1),
          quantity: z.number().min(1).optional().default(1),
        }),
      },
    },

    async (request, reply) => {
      const { cartId, productId, quantity } = request.body

      await addItemToCart({
        cartId,
        productId,
        quantity
      });

      return reply.status(200).send("Item added to cart successfully");
    }
  )
}