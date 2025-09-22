import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod';
import { updateProduct } from '../../../functions/products/update-product';
import { updateCartItemQuantity } from '../../../functions/cart/update-cart-item-quantity';

export const updateCartItemQuantityRoute: FastifyPluginAsyncZod = async app => {
  app.patch(
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
      const { cartId, productId, quantity } = request.body;

      await updateCartItemQuantity({
        cartId,
        productId,
        newQuantity: quantity
      });

      return reply.status(200).send("Cart item quantity updated successfully");
    }
  )
}