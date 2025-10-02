import { db } from "../../db";
import { products } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function deleteProduct(id: number) {
  const existingProduct = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .orderBy(products.categories)

  if (!existingProduct) {
    throw new Error("Error fetching product");
  } 

  const deletedProduct = await db
    .delete(products)
    .where(eq(products.id, id))

  if (!deletedProduct) {
    throw new Error("Error deleting product");
  } else {
    console.log("Product deleted successfully", deletedProduct);
  }

  return {
    message: "Product deleted successfully",
    deletedProduct
  }
}