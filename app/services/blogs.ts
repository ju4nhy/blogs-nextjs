import { eq, desc, ilike, sql } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

let nextId = 4

export const getBlogs = async (filter?: string) => {
  const searchFilter = filter?.trim().toLowerCase() ?? ""

  return db.query.blogs.findMany({
    where: ilike(blogs.title, `%${searchFilter}%`),
    orderBy: desc(blogs.likes),
  })
}

export const addBlog = async (title: string, author: string, url: string, likes: number) => {
  const user = await db.query.users.findFirst({
    orderBy: sql`RANDOM()`,
  })

  if (!user) {
    throw new Error("No users found")
  }

  await db.insert(blogs).values({ title, author, url, likes, userId: user.id })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const addLike = async (id: number) => {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id))
}