"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authClient } from "../../lib/auth-client";

// 1. Simpler Schema: We only need email and password
const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

type SignInForm = z.infer<typeof signInSchema>;

export function SignIn() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInForm) => {
    setServerError(null);

    // 2. The Sign In Call
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setServerError(error.message || "Invalid email or password");
    } else {
      // Redirect to home or dashboard on success
      window.location.href = "/";
    }
  };

  return (
    <div className="p-6 border text-black rounded-lg shadow-sm bg-white mt-8 border-blue-200">
      <h2 className="text-lg font-bold text-blue-800 mb-4">
        Sign In (Better Auth)
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {serverError && (
          <p className="text-red-500 text-sm text-center">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
