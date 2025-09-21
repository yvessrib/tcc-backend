import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getProducts } from "../../../functions/products/get-products";

export const getProductsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/products', async () => {
    const products = await getProducts()

    return products
  })
}