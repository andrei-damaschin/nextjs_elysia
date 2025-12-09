"use client";

import { trpc } from "@/src/lib/trpc";

export function TrpcTest() {
  // 👇 REPLACE 'hello' with the actual name of a procedure in your backend trpc router!
  // It might be 'test', 'index', 'getUsers', etc.
  // TypeScript should autocomplete this for you!
  const { data, isLoading, error } = trpc.userList.useQuery();

  if (isLoading) return <div>Loading tRPC...</div>;
  if (error) return <div>tRPC Error: {error.message}</div>;

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", marginTop: "20px" }}
    >
      <h2>tRPC Client Response:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
