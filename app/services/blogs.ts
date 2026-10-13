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
  await db.insert(blogs).values({ title, author, url, likes })
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

/*
const blogs = [
  { id: 1, title: "title", author: "author", url: "url", likes: 2 },
  { id: 2, title: "another title", author: "another author", url: "anotherurl", likes: 0},
  {
    id: 3,
    title: "testTitle",
    author: "testAuthor",
    url: "testUrl",
    likes: 1
  },
]


export const getBlogs = (filter?: string) => {
  const searchFilter = filter?.trim().toLowerCase() ?? ""

  return blogs
    .filter((blog) => blog.title.toLowerCase().includes(searchFilter))
    .sort((a, b) => b.likes - a.likes)
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}

export const addBlog = (title: string, author: string, url: string, likes: number) => {
  blogs.push({ id: nextId++, title, author, url, likes })
}

export const addLike = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id)
  if (blog) {
    blog.likes = blog.likes + 1;
  }
}

*/