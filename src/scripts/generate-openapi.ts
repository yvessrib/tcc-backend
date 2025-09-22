import fs from 'fs/promises'
import fastify from 'fastify'
import {
  type ZodTypeProvider,
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'

import fastifySwagger from '@fastify/swagger'

// importe suas rotas
import { createUserRoute } from '../http/routes/users/create-user-route'
import { loginRoute } from '../http/routes/users/login-user-route'
import { createProductRoute } from '../http/routes/products/create-product-route'
import { deleteProductRoute } from '../http/routes/products/delete-product-route'
import { getProductByIdRoute } from '../http/routes/products/get-product-by-id'
import { updateProductRoute } from '../http/routes/products/update-product'
import { getProductsRoute } from '../http/routes/products/get-products'
import { addItemToCartRoute } from '../http/routes/cart/add-item-to-cart-route'
import { checkoutCartRoute } from '../http/routes/cart/checkout-cart-route'
import { getOrCreateCartRoute } from '../http/routes/cart/get-or-create-cart-route'
import { deleteItemFromCartRoute } from '../http/routes/cart/remove-item-from-cart-route'
import { updateCartItemQuantityRoute } from '../http/routes/cart/update-cart-item-quantity-route'



async function generateSpec() {
  const app = fastify().withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'E-commerce API',
        description: 'API for an e-commerce application',
        version: '1.0.0',
      },
      servers: [{ url: 'http://localhost:3333' }],
    },
    transform: jsonSchemaTransform,
  })

  // registra as rotas para que entrem na spec
  app.register(createUserRoute)
  app.register(loginRoute)
  app.register(createProductRoute)
  app.register(deleteProductRoute)
  app.register(getProductByIdRoute)
  app.register(updateProductRoute)
  app.register(getProductsRoute)
  app.register(addItemToCartRoute)
  app.register(checkoutCartRoute)
  app.register(getOrCreateCartRoute)
  app.register(deleteItemFromCartRoute)
  app.register(updateCartItemQuantityRoute)

  await app.ready()

  const openapi = app.swagger() // <-- gera o objeto
  await fs.writeFile('openapi.json', JSON.stringify(openapi, null, 2))
  console.log('✅ openapi.json gerado!')
  await app.close()
}

generateSpec()
