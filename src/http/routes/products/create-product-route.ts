import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod';
import { createProduct } from '../../../functions/products/create-product';

export const createProductRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/products', 
    {
      schema: {
        description: 'Create a new product',
        tags: ['Products'],
        body: z.object({
          name: z.string().min(1),
          description: z.string().min(10),
          image: z.string().url(),
          price: z.number().positive(),
          category: z.string().min(3),
        }),
      },
    },

    async (request, reply) => {
      const { name, image, description, price, category } = request.body

      await createProduct({
        name,
        description,
        image,
        price,
        category
      });

      return reply.status(200).send("Product created successfully");
    }
  )
}