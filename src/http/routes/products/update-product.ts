import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod';
import { updateProduct } from '../../../functions/products/update-product';

export const updateProductRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/products/:id',
    {
      schema: {
        params: z.object({
          id: z.coerce.string(),
        }),
        body: z.object({
          name: z.string().min(1).optional(),
          description: z.string().min(4).optional(),
          image: z.string().url().optional(),
          price: z.number().positive().optional(),
          category: z.string().min(1).optional(),
        }),
      },
    },

    async (request, reply) => {
      const { id } = request.params;
      const { name, image, description, price, category } = request.body;

      try {
        const result = await updateProduct({
          id: Number(id),
          name,
          image,
          description,
          price,
          category
        });
        return reply.status(200).send(result.message);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error updating product';
        return reply.status(400).send({
          message: errorMessage,
        });
      }
    }
  );
}
