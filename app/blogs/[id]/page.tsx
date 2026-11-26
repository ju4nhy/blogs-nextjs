import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { addBlogLike } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="max-w-2xl p-6">
      <h3 className="font-bold mb-4">{blog.title}</h3>
      <p>Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
      <p>Likes: {blog.likes}</p>

       <form action={addBlogLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="bg-gray-600 hover:bg-green-500 px-3 py-1 mt-2 rounded text-sm">
          Like
        </button>
      </form>
    </div>
  )
}

export default BlogPage