import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "elysia-back"; // 👈 Replace with your package name again

export const trpc = createTRPCReact<AppRouter>();
