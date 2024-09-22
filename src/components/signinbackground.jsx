"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { googleSignIn } from "@/app/action"; // Adjust the import path
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";

const AuroraBackgroundDemo = () => {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold text-white text-center">
          Parkit is Awesome
        </div>
        <div className="font-extralight text-base md:text-4xl text-white py-4">
          Park smarter, Not harder
        </div>

        {/* Sign-In Button */}
        <form
          className="flex items-center justify-center"
          action={googleSignIn}
        >
          <Button
            className="flex gap-3 items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-full px-4 py-2"
            type="submit"
          >
            <FaGoogle />
            <p>Sign in with Google</p>
          </Button>
        </form>
      </motion.div>
    </AuroraBackground>
  );
};

export default AuroraBackgroundDemo;
