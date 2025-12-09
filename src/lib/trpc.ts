import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "elysia-back/src/trpc/index"; // 👈 Replace with your package name again

export const trpc = createTRPCReact<AppRouter>();
