import { treaty } from "@elysiajs/eden";
import type { App } from "elysia-back"; // 👈 Replace 'my-backend' with your actual package name

const client = treaty<App>("localhost:5000");

export default client;
