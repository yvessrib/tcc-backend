import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { real } from "drizzle-orm/pg-core";
import { string } from "zod/v4";

export const users = pgTable(`users`, {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
})

export const products = pgTable(`products`, {
  id: serial('id')
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  price: real('price').notNull(),
  categories: text("categories").array().notNull(),
})

export const carts = pgTable(`carts`, {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  status: text('status').default('active').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const cartItems = pgTable(`cart_items`, {
  id: serial('id')
    .primaryKey(),
  cartId: text('cart_id')
    .notNull()
    .references(() => carts.id),
  productId: integer('product_id')
    .references(() => products.id),
  quantity: integer('quantity')
    .default(1),
})
