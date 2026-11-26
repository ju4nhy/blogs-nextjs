import Link from "next/link"
import { getUsers } from "../services/users"

export const dynamic = "force-dynamic"

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="max-w-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.username}`} className="hover:underline">{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users