import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:5000", // 👈 Make sure this matches your Backend URL!
});
