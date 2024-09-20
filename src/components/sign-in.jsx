import { signIn } from "@/auth";

import * as React from "react"
 
import { Button } from "@/components/ui/button"
import { FaGoogle } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SignIn() {
  return (
    <div className="flex  w-full items-center justify-center h-40 ">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-center mb-4">Sign In</CardTitle>
          <CardDescription className="flex items-center justify-center">Log in to your Parkit account</CardDescription>
        </CardHeader>
        <CardContent>
        <form className="flex items-center justify-center "
        action={async () => {
          "use server";
          await signIn("google");
        }}>
          <Button className="flex w-75% gap-3 items-center justify-center " type="submit"><FaGoogle /><p>Sign in with Google</p></Button>
        </form>
        </CardContent>
      </Card>
    </div>
  )
}
