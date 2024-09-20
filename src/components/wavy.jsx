"use client";
import React from "react";
import { WavyBackground } from "../components/ui/wavy-background";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DrawerDemo } from "@/components/drawer";
import Image from "next/image"; // Make sure to import Image from Next.js
import map from "../../src/app/public/map.jpg"
import { useRouter } from "next/navigation";


export function WavyBackgroundDemo() {
    const { data: session, status } = useSession();
    const router = useRouter()

    return (
        <div className="flex max-w-full  max-h-screen overflow-hidden">
           
            <div className="pb-40 mb-10 ">
                <WavyBackground className=" flex justify-between gap-20 items-center" >
                   <div >
                    <div className="flex justify-between items-center ">
                        <div className="flex space-x-4 ml-10 ">
                            <DrawerDemo />
                            <Button variant="outline" onClick={()=>router.push('/hostform')}>Host? Click Here</Button>
                        </div>
                        <Button
                            variant="outline"
                            onClick={async () => {
                                await signOut("google",{callbackUrl:"/"});

                            }}
                        >
                            Sign Out
                        </Button>
                    </div>

                    <p className="mt-20 text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
                        Welcome, {session.user.name}
                    </p>
                    <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
                        Leverage the power of Parkit to get hassel free parking.
                    </p>
                    </div>
                    <Image
                    src={map} // Replace with your image path
                    alt="Description of the image"
                    layout="responsive" // Adjust as necessary
                    width={9} // Set to the actual width of your image
                    height={70} // Set to the actual height of your image
                    className="object-cover  w-full z-50 h-lvh ml-20" // Make the image cover the area
                />
                </WavyBackground>
            </div>

            {/* Right Side: Image */}
            
                
            
        </div>
    );
}
