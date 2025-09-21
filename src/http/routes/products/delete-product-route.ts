import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { deleteProduct } from "../../../functions/products/delete-product";

export const deleteProductRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/products/:id', 
  {
    schema: {
      params: z.object({
        id: z.coerce.number(),
      }),
    },
  },
    async (request, reply) => {
      const { id } = request.params;
      await deleteProduct(id);

      return reply.status(200).send("Product deleted successfully")
    }
  )
}