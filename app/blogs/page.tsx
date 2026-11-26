
import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = async ({
  searchParams
}: { 
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const blogs = await getBlogs(filter)

  return (
    <div className="max-w-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <form action="/blogs">
        <div className="mb-2">
          <label className="bg-white text-black">
            <input 
            type="text" 
            name="filter" 
            defaultValue={filter} 
            className="rounded bg-white px-3 py-1.5 text-black" 
            />
          </label>
        </div>
        <button type="submit" className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm">Search</button>
      </form>
      <ul className="space-y-2 mt-4">
        {blogs.map(blog => (
          <li key={blog.id} className="bg-blue-950 border rounded p-3 hover:bg-blue-400">
            <Link
              href={`/blogs/${blog.id}`}
              className="flex justify-between gap-4 text-white hover:underline"
            >
              <div>
                <p>{blog.title}</p>
                <p className="text-sm">by {blog.author}</p>
              </div>
              <div className="flex flex-col items-end justify-between text-sm min-w-0">
                <p className="break-all text-right">URL: {blog.url}</p>
                <p>LIKES: {blog.likes}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs