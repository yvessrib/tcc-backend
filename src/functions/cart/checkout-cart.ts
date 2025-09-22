import { eq } from "drizzle-orm";
import { db } from "../../db";
import { carts } from "../../db/schema";

export async function checkoutCart(cartId: string) {
  const cart = await db
    .update(carts)
    .set({ status: 'checked_out' })
    .where(eq(carts.id, cartId))
    .returning();

  if (cart.length === 0) {
    throw new Error("Cart not found");
  }

  return cart[0];
}