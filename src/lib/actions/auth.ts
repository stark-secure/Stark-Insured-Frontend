"use server"

import z from "zod"
import { FormState, SignUpFormSchema, SignInFormSchema } from "@/src//lib/definitions"
import { createSession } from "@/src/lib/session";
import { redirect } from "next/navigation"

// A test user credentils since no DB integration for
const TestUser = {
  id: "testuserId-1",
  email: "user@stackinsured.com",
  password: "#user@Stack88"
}
export async function signup(prevSate: FormState, formData: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    }
  }
  else {
    return {
      data: validatedFields.data,
    }
  }
}

export async function signin(prevSate: FormState, formData: FormData) {
  const result = SignInFormSchema.safeParse(Object.fromEntries(formData))
  console.log(result)

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    }
  }

  const { email, password } = result.data

  if (email !== TestUser.email || password !== TestUser.password) {

    return {
      errors: {
        email: ["Invalid credentials"],
        password: ["Invalid credentials"]
      }
    }
  }

  await createSession(TestUser.id)
  redirect("/dashboard")
  return { errors: {} };

}

