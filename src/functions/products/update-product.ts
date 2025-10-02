import { db } from "../../db";
import { eq } from "drizzle-orm";
import { products } from "../../db/schema";

interface updateProductRequest {
  id: number,
  name?: string,
  description?: string,
  image?: string,
  price?: number,
  categories?: string[]
}

export async function updateProduct({id, name, description, image, price, categories} : updateProductRequest) {

  const existingProduct = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1)

  if (existingProduct.length === 0) {
    throw new Error("Product does not exist");
  }

  const updateData: any = {};

  if (name !== undefined) {
    updateData.name = name;
  }
  if (image !== undefined) {
    updateData.image = image;
  }
  if (description !== undefined) {
    updateData.description = description;
  }
  if (price !== undefined) {
    updateData.price = price;
  }
  if (categories !== undefined) {
    updateData.categories = categories;
  }

  if (Object.keys(updateData).length === 0) {
    throw new Error("No valid fields to update");
  }

  const updatedProduct = await db
    .update(products)
    .set(updateData)
    .where(eq(products.id, id));

  if (!updatedProduct) {
    throw new Error("Error updating product");
  } else {
    console.log("Product updated successfully", updatedProduct);
  }

  return {
    message: `Product with id ${id} updated successfully`,
    updatedProduct
  }
}