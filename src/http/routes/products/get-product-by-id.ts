import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getProductById } from "../../../functions/products/get-product-by-id";

export const getProductByIdRoute: FastifyPluginAsyncZod = async app => {
  app.get('/products/:id', {
    schema: {
      description: 'Get a product by its ID',
      tags: ['Products'],
      params: z.object({
        id: z.coerce.number()
      }),
    },
  }, async (request, reply) => {
    try {
      const { id } = request.params;
      const product = await getProductById(id);
      return product;
    } catch (error) {
      reply.status(404).send({ error: "Product not found" });
    }
  });
};
