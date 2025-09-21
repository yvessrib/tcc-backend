import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { real } from "drizzle-orm/pg-core";

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
  category: text('category').notNull(),
})