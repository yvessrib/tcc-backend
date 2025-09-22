import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { type ZodTypeProvider, validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod'

import { createUserRoute } from './routes/users/create-user-route'
import { loginRoute } from './routes/users/login-user-route'

import { createProductRoute } from './routes/products/create-product-route'
import { deleteProductRoute } from './routes/products/delete-product-route'
import { getProductByIdRoute } from './routes/products/get-product-by-id'
import { updateProductRoute } from './routes/products/update-product'
import { getProductsRoute } from './routes/products/get-products'

import { addItemToCartRoute } from './routes/cart/add-item-to-cart-route'
import { checkoutCartRoute } from './routes/cart/checkout-cart-route'
import { getOrCreateCartRoute } from './routes/cart/get-or-create-cart-route'
import { updateCartItemQuantityRoute } from './routes/cart/update-cart-item-quantity-route'
import { deleteItemFromCartRoute } from './routes/cart/remove-item-from-cart-route'



const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

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

app.listen({
  host: '0.0.0.0',
  port: 3333,
}).then(() => {
  console.log('Server is running on http://localhost:3333')
})
