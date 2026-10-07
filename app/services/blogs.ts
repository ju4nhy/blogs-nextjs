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

let nextId = 4

export const getBlogs = (filter?: string) => {
  const searchFilter = filter?.trim().toLowerCase() ?? ""

  return blogs
    .filter((blog) => blog.title.toLowerCase().includes(searchFilter))
    .sort((a, b) => b.likes - a.likes)
}

export const addBlog = (title: string, author: string, url: string, likes: number) => {
  blogs.push({ id: nextId++, title, author, url, likes })
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}

export const addLike = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id)
  if (blog) {
    blog.likes = blog.likes + 1;
  }
}