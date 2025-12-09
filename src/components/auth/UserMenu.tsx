"use client";

import { authClient } from "../../lib/auth-client";

export function UserMenu() {
  // 1. Hook into the session state
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <div className="text-sm text-gray-500">Loading...</div>;

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">
          Welcome, {session.user.name}
        </span>

        <button
          // 👇 What function do you think we call here?
          onClick={() => authClient.signOut()}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <a
      href="/sign-in"
      className="text-sm font-medium text-blue-600 hover:underline"
    >
      Sign In
    </a>
  );
}
