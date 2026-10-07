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

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string, likes: number) => {
  blogs.push({ id: nextId++, title, author, url, likes })
}