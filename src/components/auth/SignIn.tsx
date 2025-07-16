"use client"

import { useActionState } from "react"
import { signin } from "@/src/lib/actions/auth"
import Image from "next/image"
import { Wallet } from "lucide-react"
import { FormState } from "@/src/lib/definitions"

export default function SignInForm() {
    const [state, formAction, pending] = useActionState(
        async (_prevState: FormState, formData: FormData) => {
          return await signin(_prevState,formData)
        },
        undefined
      )


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0F1F] text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl shadow-lg shadow-[#22BBF9] overflow-hidden">

                <div className="bg-[#0B0D1A] p-10 md:p-14  relative">
                    <div className="absolute inset-0 border-2 border-blue-500 opacity-10 rounded-xl pointer-events-none"></div>

                    <h1 className="text-2xl font-bold">Stark Insured</h1>
                    <p className="text-lg mt-1 font-semibold">Welcome Back</p>
                    <p className="text-sm text-gray-400 mt-2">
                        Sign in to secure your digital assets
                    </p>

                    <form action={formAction} className="space-y-5 mt-8">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Your@email.com"
                                className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                            />
                            {state?.errors?.email?.[0] && <p className="text-sm text-red-500 mt-1">{state.errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your Password"
                                className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                            />
                      {state?.errors?.password && <p className="text-sm text-red-500 mt-1">{state.errors.password}</p>}


                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center">
                                    <input type="checkbox" id="remember" />
                                    <label htmlFor="remember" className="flex items-center ml-2">Remember me</label>
                                </div>
                                <div className="ml-3 text-sm">
                                    <a href="#" className="font-medium text-[#37B0E0] hover:underline">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                        </div>



                        <button
                            type="submit"
                            disabled={pending}
                            className="w-full py-2 text-darkBlue bg-lightBlue rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-[#34a2dc] transition disabled:opacity-50"
                        >
                            {pending ? (
                                <>
                                    <svg
                                        className="w-5 h-5 animate-spin text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        />
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={() => { }}
                            className="w-full py-2 bg-[#111] text-white border border-gray-700 rounded-md font-medium hover:bg-[#222] transition flex justify-center items-center gap-2"
                        >
                            <Wallet />
                            Sign in with Wallet
                        </button>
                        <p className="text-sm text-center mt-6 text-gray-400">
                            Don&apos;t have an account?{" "}
                            <a href="/sign-up" className="text-[#37B0E0] hover:underline">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>

                <div className="bg-[#111827] hidden md:flex items-center justify-center">
                    <Image
                        src="/lovable-uploads/60c0f559176c1d66e933e10caf41e25aebedcfab.jpg"
                        alt="Crypto coins"
                        width={512}
                        height={512}
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}
