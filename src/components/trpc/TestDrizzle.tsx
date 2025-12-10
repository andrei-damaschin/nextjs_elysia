"use client";
import { trpc } from "@/src/lib/trpc";
import { useState } from "react";

export default function DrizzleTest() {
  // 1. Get the mutation function
  const createUser = trpc.userCreate.useMutation({
    onSuccess: (data) => {
      alert(`Success! Created user: ${data}`);
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 2. Trigger the mutation
    createUser.mutate(form);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Create User (Dual Write)</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-sm"
      >
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          disabled={createUser.isPending}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {createUser.isPending ? "Saving..." : "Create User"}
        </button>
      </form>
    </div>
  );
}
