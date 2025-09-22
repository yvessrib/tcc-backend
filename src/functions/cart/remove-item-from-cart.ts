import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { cartItems } from "../../db/schema";

interface RemoveItemFromCartParams {
  cartId: string;
  productId: number;
}

export async function removeItemFromCart(params: RemoveItemFromCartParams) {
  const removedItem = await db
    .delete(cartItems)
    .where(and(eq(cartItems.cartId, params.cartId), eq(cartItems.productId, params.productId)))
    .returning();

  if (removedItem.length === 0) {
    throw new Error("Item not found in cart");
  }

  return removedItem[0];
}