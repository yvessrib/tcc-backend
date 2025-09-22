import { db } from "../../db";
import { carts } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function getOrCreateCart(userId: string) {
  let cart = await db
    .select()
    .from(carts)
    .where(eq(carts.userId, userId))
    .limit(1);

  if (cart.length === 0) {
    cart = await db
      .insert(carts)
      .values({ userId })
      .returning();
  }

  return cart;
}