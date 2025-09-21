import { db } from "../../db";
import { products } from "../../db/schema";

export async function getProducts() {
  const productsComplete = await db
    .select()
    .from(products)
    .orderBy(products.category)

  if (!productsComplete) {
    throw new Error("Error fetching products");
  } else {
    console.log("Products fetched successfully", productsComplete);
  }

  return {
    productsComplete
  }
}