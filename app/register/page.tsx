"use client"

import { useActionState } from "react"
import { registerUser, type RegisterState } from "../actions/users"

const initialState: RegisterState = {
  errors: {},
  values: { username: "", name: "" },
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div className="max-w-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form action={formAction}>
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
          <label>Username</label>
          <div>
            <input 
              type="text" 
              name="username" 
              required 
              defaultValue={state.values?.username} 
              className="rounded bg-white px-3 py-1.5 text-black" 
            />
            {state.errors?.username && (
              <p style={{ color: "red" }}>{state.errors.username}</p>
            )}
          </div>

          <label>Name</label>
          <div>
            <input 
              type="text" 
              name="name" 
              required 
              defaultValue={state.values?.name} 
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
            {state.errors?.password && (
              <p style={{ color: "red" }}>{state.errors.password}</p>
            )}
          </div>


          <label>Confirm password</label>
          <div>
            <input 
              type="password" 
              name="passwordConfirm" 
              required 
              className="rounded bg-white px-3 py-1.5 text-black" 
            />
            {state.errors?.passwordConfirm && (
              <p style={{ color: "red" }}>{state.errors.passwordConfirm}</p>
            )}
          </div>
          
        </div>
        <button type="submit" className="bg-gray-600 hover:bg-green-500 px-3 py-1 mt-2 rounded text-sm">Register</button>
      </form>
    </div>
  )
}