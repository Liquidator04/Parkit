"use client";
import { Button } from "@/components/ui/button";
import logo from "./public/logo.jpeg";
import Image from "next/image";
import { ThreeDCardDemo } from "@/components/threecard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import home from "../app/public/home.jpg"


function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleSignIn = () => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  };
  return (
    <>

      <br />
      <div className="flex justify-between items-center w-full  style={{ backgroundImage: `url(${home.src})` }}">
        <Image
          className="ml-8 rounded-full"
          src={logo}
          alt="Picture of the author"
          width={100}
          height={80}
        />
        <div className="flex space-x-4 mr-8">
          <Button variant="outline">About us</Button>
          <Button variant="outline">Contact us</Button>
        </div>
      </div>

      <div className="flex justify-between items-start mt-20">
        <div className="flex-1">
          <ThreeDCardDemo />
        </div>
        <div className="flex flex-col justify-center items-center flex-1 mt-20">
          <Button
            onClick={handleSignIn}
            variant="outline"
            className="text-white py-2 px-4 rounded-lg h-20 w-40 text-xl font-sans mb-4 mt-10"
          >
            Get Started
          </Button>

          <h1 className="text-center text-5xl md:text-7xl font-bold text-white-800 mt-20">
            Let us find your parking
          </h1>
        </div>
      </div>
      
    </>
  );
}

export default Page;
