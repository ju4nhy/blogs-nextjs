"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"

export type RegisterState = {
  errors?: {
    username?: string
    password?: string
    passwordConfirm?: string
  }
  values?: {
    username: string
    name: string
  }
}

export const registerUser = async (
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> => {
  const errors: { username?: string; password?: string; passwordConfirm?: string } = {}

  const username = ((formData.get("username") as string) ?? "").trim()
  const name = ((formData.get("name") as string) ?? "").trim()
  const password = (formData.get("password") as string) ?? ""
  const passwordConfirm = (formData.get("passwordConfirm") as string) ?? ""

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  } else {
    const existing = await db.query.users.findFirst({
      where: eq(users.username, username),
    })
    if (existing) {
      errors.username = "Username is already taken"
    }
  }

  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }

   if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })
  revalidatePath("/users")
  redirect("/login")
}