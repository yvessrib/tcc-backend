import { eq } from "drizzle-orm";
import { db } from "../../db/index";
import { products } from "../../db/schema";

interface CreateProductRequest {
  name: string,
  description: string,
  image: string,
  price: number,
  category: string
}

export async function createProduct(
  {
    name,
    description,
    image,
    price,
    category
  }: CreateProductRequest){

  const existingProduct = await db
    .select()
    .from(products)
    .where(eq(products.name, name))
    .limit(1)

  if (existingProduct.length > 0) {
    throw new Error("Product already exists");
  }

  const [newProduct] = await db.insert(products).values({
    name,
    description,
    image,
    price,
    category
  }).returning();

  if (!newProduct) {
    throw new Error("Error creating product");
  } else {
    console.log("Product created successfully", newProduct);
  }

  return {
    newProduct
  }

}