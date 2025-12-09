import client from "@/src/lib/eden"; // Import the client we just made
import { TrpcCreateUser } from "../components/trpc/TrpcCreateUser";
import { TrpcTest } from "../components/trpc/TrpcTest";
import { VanillaUserList } from "../components/vanilla/VanillaUserList";

export default async function Home() {
  // 👇 Notice how we call the route.
  // If your backend is app.get('/', ...), we use client.index.get()
  const { data, error } = await client.index.get();

  if (error) {
    return <div>Error: {JSON.stringify(error.value)}</div>;
  }

  return (
    <main>

     
      <VanillaUserList />
      <div className="mt-8">
        <TrpcCreateUser />
        <TrpcTest />
      </div>
    </main>
  );
}
