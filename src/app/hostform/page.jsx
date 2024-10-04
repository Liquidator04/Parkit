import { ProfileForm } from "@/components/host-form";
import Image from "next/image";
import signinimage from "../public/signinpic.jpg";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Choose the weights you need
});

export default function Page() {
  return (
    <>
      <div className={montserrat.className}>
        <div className="flex justify-center mt-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 shadow-md">
            Let&apos;s Host
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-between max-w-7xl mx-auto p-4 relative md:mt-15 mt-7">
        {/* Glowing line */}
        <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-400 to-blue-600 shadow-glow" />

        <div className="md:visible collapse md:w-1/2 md:pr-4 md:mt-16 w-0">
          <Image
            src={signinimage}
            alt="Description of the image"
            width={500}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-4">
          <ProfileForm />
        </div>
      </div>
    </>
  );
}
