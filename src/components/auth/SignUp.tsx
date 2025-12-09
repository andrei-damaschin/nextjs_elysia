"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authClient } from "../../lib/auth-client"; // Import your new client

// Define the validation schema
const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export function SignUp() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    setServerError(null);

    // 👇 The magic happens here!
    const { error } = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.username, // mapping username to 'name'
    });

    if (error) {
      setServerError(error.message || "Something went wrong");
    } else {
      // Redirect or show success message
      alert("Account created successfully!");
    }
  };

  return (
    <div className="p-6 border rounded-lg text-black shadow-sm bg-white mt-8 border-green-200">
      <h2 className="text-lg font-bold text-green-800 mb-4">
        Sign Up (Better Auth)
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            {...register("username")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

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
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
