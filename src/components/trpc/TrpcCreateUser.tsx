"use client";

import { trpc } from "@/src/lib/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the validation schema (matching your backend!)
const createUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
});

// Infer the type from the schema
type CreateUserForm = z.infer<typeof createUserSchema>;

export function TrpcCreateUser() {
  // 1. Get the "utils" object to manage the cache
  const utils = trpc.useUtils();

  // 2. Setup the mutation
  const createUserMutation = trpc.userCreate.useMutation({
    onSuccess: () => {
      // 🎉 When successful, tell the list to refresh automatically
      utils.userList.invalidate();
      reset(); // Clear the form
    },
  });

  // 3. Setup the form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = (data: CreateUserForm) => {
    createUserMutation.mutate(data);
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white mt-8 border-purple-200">
      <h2 className="text-lg font-bold text-purple-800 mb-4">
        Create User (tRPC)
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
            className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm p-2 border"
            placeholder="jdoe"
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
            className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm p-2 border"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={createUserMutation.isLoading}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {createUserMutation.isLoading ? "Creating..." : "Create User"}
        </button>

        {createUserMutation.error && (
          <p className="text-red-500 text-sm mt-2">
            Error: {createUserMutation.error.message}
          </p>
        )}
      </form>
    </div>
  );
}
