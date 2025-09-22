import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod';
import { checkoutCart } from '../../../functions/cart/checkout-cart';
import { getOrCreateCart } from '../../../functions/cart/get-or-create-cart';

export const checkoutCartRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/cart/checkout',
    {
      schema: {
        description: 'Checkout the cart for a user',
        tags: ['Cart'],
        body: z.object({
          userId: z.string(),
        }),
      },
    },

    async (request, reply) => {
      const { userId } = request.body

      const cart = await getOrCreateCart(userId);
      const checkout = await checkoutCart(cart[0].id);

      return checkout;
    }
  )
}