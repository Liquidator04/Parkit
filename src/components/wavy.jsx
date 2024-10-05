"use client";
import React from "react";
import { WavyBackground } from "../components/ui/wavy-background";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DrawerDemo } from "@/components/drawer";
import Image from "next/image"; // Make sure to import Image from Next.js
import map from "../../src/app/public/map.jpg";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import Map to prevent SSR issues with mapbox-gl
const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export let sortedarray;

export function WavyBackgroundDemo() {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <div className="flex max-w-full  max-h-screen overflow-hidden">
      <div className="">
        <div className="flex md:flex-row flex-col items-start w-screen">
          <div className="md:w-1/2 w-full pr-5">
            <div className="flex justify-between items-center mt-10">
              <div className="flex space-x-4 ml-10 mr-3">
                <Button
                  variant="outline"
                  onClick={() => router.push("/hostform")}
                >
                  Host? Click Here
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={async () => {
                  await signOut({ callbackUrl: "/", redirect: true });
                  console.log("Right after sign out");
                }}
              >
                Sign Out
              </Button>
            </div>
            <div className="m-10">
              <p className="md:mt-40 mt-10 text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
                Hello,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-sky-500">
                  {session?.user.name}
                </span>
              </p>
              <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
                Leverage Parkit to get hassle free parking.
              </p>
            </div>
            <div className="flex justify-center mt-5 mb-10">
              <DrawerDemo />
            </div>
          </div>
          <Map />
          {/* <Image
            src={map} // Replace with your image path
            alt="Description of the image"
            layout="responsive" // Adjust as necessary
            width={9} // Set to the actual width of your image
            height={70} // Set to the actual height of your image
            className="z-50 h-lvh ml-20" // Make the image cover the area
          /> */}
        </div>
      </div>

      {/* Right Side: Image */}
    </div>
  );
}
