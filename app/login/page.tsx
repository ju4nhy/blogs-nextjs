"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="max-w-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
          <label>Username</label>
          <div>
            <input 
              type="text" 
              name="username" 
              required
              className="rounded bg-white px-3 py-1.5 text-black" 
            />
          </div>
          <label>Password</label>
          <div>
            <input 
              type="password" 
              name="password" 
              required 
              className="rounded bg-white px-3 py-1.5 text-black" 
            />
          </div>
        </div>
        <button type="submit" className="bg-gray-600 hover:bg-green-500 px-3 py-1 mt-2 rounded text-sm">Login</button>
      </form>
    </div>
  )
}