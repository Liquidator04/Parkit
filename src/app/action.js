// src/app/actions.js

"use server";

import { signIn } from "@/auth";

export async function googleSignIn() {
  await signIn("google", { redirectTo: "/dashboard" });
}
