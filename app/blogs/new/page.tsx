"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog, type BlogFormState } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"

const initialState: BlogFormState = {
  errors: {},
  values: {
    title: "",
    author: "",
    url: "",
  },
  success: false
}

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)

  const { showNotification } = useNotification()
  const router = useRouter() 

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction}>
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
          <label>Title</label>
          <div>
          <input 
              id="title" 
              name="title" 
              type="text" 
              defaultValue={state.values?.title} 
              className="rounded bg-white px-3 py-1.5 text-black" 
          />
          {state.errors?.title && (
            <p style={{ color: "red" }}>{state.errors.title}</p>
          )}
          </div>
        
          <label>Author</label>
          <div>
          <input 
            id="author" 
            name="author" 
            type="text" 
            defaultValue={state.values?.author} 
            className="rounded bg-white px-3 py-1.5 text-black" 
          />
          {state.errors?.author && (
            <p style={{ color: "red" }}>{state.errors.author}</p>
          )}
        </div>
      
          <label>Url</label>
          <div>
          <input 
            id="url" 
            name="url" 
            type="text" 
            defaultValue={state.values?.url} 
            className="rounded bg-white px-3 py-1.5 text-black" 
          />
          {state.errors?.url && (
            <p style={{ color: "red" }}>{state.errors.url}</p>
          )}
          </div>
        </div>
        <button type="submit" className="bg-gray-600 hover:bg-green-500 px-3 py-1 mt-4 rounded text-sm">Create</button>
      </form>
    </div>
  )
}

export default NewBlog