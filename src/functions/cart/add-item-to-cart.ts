import { db } from "../../db";
import { cartItems, carts } from "../../db/schema";
import { and, eq } from "drizzle-orm";

interface AddItemToCartParams {
  cartId: string;
  productId: number;
  quantity: number;
}

export async function addItemToCart(params: AddItemToCartParams) {
  const existingItem = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.cartId, params.cartId), eq(cartItems.productId, params.productId)))
    .limit(1);

  if (existingItem.length > 0 && existingItem[0] !== null) {
    const newQuantity = (existingItem[0]?.quantity ?? 0) + params.quantity;
    await db
      .update(cartItems)
      .set({ quantity: newQuantity })
      .where(eq(cartItems.id, existingItem[0]!.id));
    return { ...existingItem[0], quantity: newQuantity };
  }

  const [newItem] = await db
    .insert(cartItems)
    .values({
      cartId: params.cartId,
      productId: params.productId,
      quantity: params.quantity,
    })
    .returning();

  return newItem;
}