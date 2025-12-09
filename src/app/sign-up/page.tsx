import { SignUp } from "@/src/components/auth/SignUp";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <main className="py-12 flex items-center justify-center flex-col bg-white">
      <SignUp />
      <span className="text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-blue-600 hover:underline"
        >
          Sign In
        </Link>
      </span>
    </main>
  );
};

export default SignUpPage;
