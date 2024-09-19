"use client";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    console.log("User Details:", session.user); // User's email, name, image, etc.
    return (
      <div>
        Welcome, {session.user.name}
        <Button
          onClick={async () => {
            await signOut("google");
          }}
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return <div>Please sign in.</div>;
}
