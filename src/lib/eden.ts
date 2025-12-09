import { treaty } from "@elysiajs/eden";
import type { App } from "elysia-back"; // 

const client = treaty<App>("localhost:5000");

export default client;
