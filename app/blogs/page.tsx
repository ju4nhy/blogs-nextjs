
import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = async ({
  searchParams
}: { 
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const blogs = getBlogs(filter)

  return (
    <div>
      <h2>Blogs</h2>
      <form action="/blogs">
        <div>
          <label>
            <input type="text" name="filter" defaultValue={filter} />
          </label>
        </div>
        <button type="submit">Search</button>
      </form>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title} by {blog.author} -- {blog.url} -- {blog.likes}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs