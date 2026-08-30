"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground"
    >
      <div className="relative w-64 h-1 bg-surface-light overflow-hidden rounded-full mt-8">
        <motion.div
          className="absolute left-0 top-0 h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.2 }}
        />
      </div>
      
      <div className="mt-4 font-mono text-sm tracking-widest text-primary/80 uppercase">
        Initializing System [{progress}%]
      </div>
    </motion.div>
  );
}
