"use client"

import { useActionState } from "react"
import { createBlog, type BlogFormState } from "../../actions/blogs"

const initialState: BlogFormState = {
  errors: {},
  values: {
    title: "",
    author: "",
    url: "",
  },
}

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)

  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input id="title" name="title" type="text" defaultValue={state.values?.title} />
          </label>
          {state.errors?.title && (
            <p style={{ color: "red" }}>{state.errors.title}</p>
          )}
        </div>
        <div>
          <label>
            Author
            <input id="author" name="author" type="text" defaultValue={state.values?.author} />
          </label>
          {state.errors?.author && (
            <p style={{ color: "red" }}>{state.errors.author}</p>
          )}
        </div>
        <div>
          <label>
            Url
            <input id="url" name="url" type="text" defaultValue={state.values?.url} />
          </label>
          {state.errors?.url && (
            <p style={{ color: "red" }}>{state.errors.url}</p>
          )}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog