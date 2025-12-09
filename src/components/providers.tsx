"use client"; // 👈 Essential for App Router!

import { trpc } from "@/src/lib/trpc"; // The file you just made
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // We use useState to ensure the client is only created once per request
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:5000/trpc", // 👈 Your actual Backend URL
        }),
      ],
    }),
  );

  return (
    <trpc.Provider
      client={trpcClient}
      queryClient={queryClient}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
