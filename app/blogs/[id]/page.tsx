import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { addBlogLike } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
      <p>Likes: {blog.likes}</p>

       <form action={addBlogLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">
          Like
        </button>
      </form>
    </div>
  )
}

export default BlogPage