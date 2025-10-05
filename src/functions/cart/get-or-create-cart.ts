import { db } from "../../db";
import { carts, cartItems, products } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function getOrCreateCart(userId: string) {
  let [cart] = await db
    .select()
    .from(carts)
    .where(eq(carts.userId, userId))
    .limit(1);

  if (!cart) {
    [cart] = await db
      .insert(carts)
      .values({ userId })
      .returning();
  }

  const cartItemsResult = await db
    .select({
      productId: products.id,
      productName: products.name,
      image: products.image,
      price: products.price,
      quantity: cartItems.quantity,
    })
    .from(cartItems)
    .leftJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.cartId, cart.id));

  return {
    cartId: cart.id,
    userId: cart.userId,
    status: cart.status,
    createdAt: cart.createdAt,
    items: cartItemsResult,
  };
}
