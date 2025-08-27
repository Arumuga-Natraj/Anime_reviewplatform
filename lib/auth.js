import clientPromise from "./mongodb";
import bcrypt from "bcrypt";

export async function getUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db(); // default db

  const user = await db.collection("users").findOne({ email });
  return user;
}
