import { db } from "../../db";
import { products } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function getProductById(id: number) {
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  if (!product || product.length === 0) {
    throw new Error("product not found");
  } else {
    console.log("Product fetched successfully", product);
  }

  return {
    product
  }
}