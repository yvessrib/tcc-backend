import { and, eq } from "drizzle-orm";
import { cartItems } from "../../db/schema";
import { db } from "../../db";

interface UpdateCartItemQuantityParams {
  cartId: string;
  productId: number;
  newQuantity: number;
}

export async function updateCartItemQuantity(params: UpdateCartItemQuantityParams) {
  const updatedItem = await db
    .update(cartItems)
    .set({ quantity: params.newQuantity })
    .where(and(eq(cartItems.cartId, params.cartId), eq(cartItems.productId, params.productId)))
    .returning();

  return updatedItem;
}