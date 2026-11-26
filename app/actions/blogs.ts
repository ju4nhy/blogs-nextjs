"use server"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, addLike } from "@/app/services/blogs"

export type BlogFormState = {
  errors?: {
    title?: string
    author?: string
    url?: string
  }
  values?: {
    title: string
    author: string
    url: string
  }
  success?: boolean
}

export const createBlog = async (
  prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const errors: { title?: string; author?: string; url?: string } = {}

  const title = formData.get("title") as string ?? ""
  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters long"
  }

  const author = formData.get("author") as string ?? ""
  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters long"
  }

  const url = formData.get("url") as string ?? ""
  if (!url || url.length < 5) {
    errors.url = "URL must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url } }
  }

  const likes = Number(formData.get("likes"))
  await addBlog(title, author, url, likes)
  revalidatePath("/blogs")
  return { success: true }
}

export const addBlogLike = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await addLike(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}