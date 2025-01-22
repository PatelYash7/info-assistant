'use client'
import { motion } from "framer-motion";
import { useGlowingCursor } from "./ui/useGlowingCursor";
import { LandingInput } from "./LandingInput";

export default function LandingPage() {
  const cursorPosition = useGlowingCursor();

  return (
    <div className="h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      <motion.div
        className="absolute bg-blue-500 rounded-full filter blur-[100px] opacity-30"
        animate={{
          x: cursorPosition.x - 200,
          y: cursorPosition.y - 200,
        }}
        transition={{ type: "spring", damping: 10, stiffness: 50 }}
        style={{
          width: "400px",
          height: "400px",
        }}
      />
      <motion.main
        className="text-center px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="block text-blue-400">Info Assistant</span>
          <span className="block mt-2 text-gray-300">
            Your Web Knowledge Companion
          </span>
        </motion.h1>
        <motion.p
          className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Enter a web URL to start exploring. Ask questions about any webpage
          and get instant answers.
        </motion.p>
        <motion.div
          className="mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <LandingInput/>
        </motion.div>
      </motion.main>
      <motion.footer
        className="mt-8 text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p className="text-base text-gray-400">
          &copy; {new Date().getFullYear()} Info Assistant. All rights reserved.
        </p>
      </motion.footer>
    </div>
  );
}
