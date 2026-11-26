import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogs } from "../../services/users"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserWithBlogs(username)

  if (!user) {
    notFound()
  }

  return (
    <div className="max-w-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3 className="font-bold mb-4 mt-4">Blogs</h3>
      {!user.blogs?.length && <p className="text-white">{user.name} has no blogs yet.</p>}
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`} className="hover:underline">{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage