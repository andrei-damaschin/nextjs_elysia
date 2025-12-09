import { SignIn } from "@/src/components/auth/SignIn";
import Link from "next/link";

 const SignInPage=()=>{return(
    <main className="py-12 flex items-center justify-center flex-col bg-white">
         <SignIn />
         <span className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </span>
    </main>
);
};


export default SignInPage;