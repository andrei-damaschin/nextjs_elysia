"use client";

import { trpc } from "@/src/lib/trpc";

export function TrpcTest() {

  const { data, isLoading, error } = trpc.userList.useQuery(undefined);

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
