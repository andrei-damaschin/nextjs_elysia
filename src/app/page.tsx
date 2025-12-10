import client from "@/src/lib/eden"; // Import the client we just made
import DrizzleTest from "../components/trpc/TestDrizzle";
import { TrpcCreateUser } from "../components/trpc/TrpcCreateUser";
import { TrpcTest } from "../components/trpc/TrpcTest";
import { VanillaUserList } from "../components/vanilla/VanillaUserList";

export default async function Home() {
  // 👇 Notice how we call the route.
  // If your backend is app.get('/', ...), we use client.index.get()
  const { data, error } = await client.get();

  if (error) {
    return <div>Error: {JSON.stringify(error.value)}</div>;
  }

  return (
    <main>
      <DrizzleTest />
      <VanillaUserList />
      <div className="mt-8">
        <TrpcCreateUser />
        <TrpcTest />
      </div>
    </main>
  );
}
