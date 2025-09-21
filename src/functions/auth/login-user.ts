import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from 'drizzle-orm';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface LoginRequest {
  email: string;
  password: string;
}

export async function loginUser ({
    email, 
    password
  }: LoginRequest){
  
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existingUser.length === 0) {
    throw new Error("User not found");
  }

  const passwordMatch = await bcrypt.compare(password, existingUser[0].password)

  if (!passwordMatch) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      id: existingUser[0].id,
      email: existingUser[0].email,
    },
    process.env.JWT_SECRET!,
    {expiresIn: '7d'}
  );

  return {
    token,
    user: {
      id: existingUser[0].id,
      name: existingUser[0].name,
      email: existingUser[0].email,
    }
  }
}