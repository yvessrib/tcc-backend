import { pgTable, text } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const user = pgTable(`products`, {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId())
    .unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  price: text('price').notNull(),
  category: text('category').notNull(),
})