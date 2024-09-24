"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { WavyBackgroundDemo } from "../../components/wavy";
import { useRouter } from "next/navigation";
import { DrawerDemo } from "@/components/drawer";

export default function Dashboard() {
  const router = useRouter();

  const { data: session, status } = useSession();
  if (status === "authenticated") {
    console.log("User Details:", session?.user); // User's email, name, image, etc.
    return (
      <div>
        {/* <BackgroundLines/> */}
        <WavyBackgroundDemo />

        <br />
      </div>
    );
  }
}
