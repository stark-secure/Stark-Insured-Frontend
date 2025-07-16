import { z } from "zod"

export const SignUpFormSchema = z.object({
    email: z.email({
        message: "Invalid email address",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }).regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
        .regex(/[0-9]/, { message: "Contain at least one number" })
        .regex(/[^a-zA-Z0-9]/, { message: "Contain at least one special character" }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
// .check((ctx) => {
//     if (ctx.value.password !== ctx.value.confirmPassword) {
//         ctx.issues.push({
//             code: "custom",
//             message: `Passwords don't match`,
//             input: ctx.value,
//         })
//         return
//     }
// })

export type SignUpForm = z.infer<typeof SignUpFormSchema>

export const SignInFormSchema = z.object({
    email: z.email({
        message: "Invalid email address",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }),
})

export type SignInForm = z.infer<typeof SignInFormSchema>

export type FormState =
    | {
        errors?: {
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined