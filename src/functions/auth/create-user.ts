import { eq } from "drizzle-orm";
import { db } from "../../db/index";
import { users } from "../../db/schema";
import bcrypt from "bcryptjs";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export async function createUser(
  {
    name,
    email,
    password,
  }: CreateUserRequest){

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existingUser.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  if (!newUser) {
    throw new Error("Error creating user");
  } else {
    console.log("User created successfully", newUser);
  }

  return {
    newUser
  }
}