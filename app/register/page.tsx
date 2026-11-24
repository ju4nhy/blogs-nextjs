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
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required defaultValue={state.values?.username} />
          </label>
          {state.errors?.username && (
            <p style={{ color: "red" }}>{state.errors.username}</p>
          )}
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required defaultValue={state.values?.name} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
          {state.errors?.password && (
            <p style={{ color: "red" }}>{state.errors.password}</p>
          )}
        </div>
         <div>
          <label>
            Confirm password
            <input type="password" name="passwordConfirm" required />
          </label>
          {state.errors?.passwordConfirm && (
            <p style={{ color: "red" }}>{state.errors.passwordConfirm}</p>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}