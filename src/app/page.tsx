import client from "@/src/lib/eden"; // Import the client we just made
import { TrpcTest } from "../components/TrpcTest";

export default async function Home() {
  // 👇 Notice how we call the route.
  // If your backend is app.get('/', ...), we use client.index.get()
  const { data, error } = await client.index.get();

  if (error) {
    return <div>Error: {JSON.stringify(error.value)}</div>;
  }

  return (
    <main>
      <h1>Server Response (Eden):</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <TrpcTest />
    </main>
  );
}
