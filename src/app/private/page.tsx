import { useSession } from "next-auth/react";
import { auth, signOut } from "@/auth";
import LoginForm from "../ui/login-form";
export default async function PublicPage() {
  const session = await auth();

  return (
    <div className="w-full max-w-screen-xl h-screen flex flex-col justify-center items-center">
      <h1>Private page</h1>
      {session && (
        <pre className="bg-slate-900 text-slate-50 p-10 rounded-lg mt-10">
          {JSON.stringify(session, null, 2)}
        </pre>
      )}

      <SignOut />
    </div>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
