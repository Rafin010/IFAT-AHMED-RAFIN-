"use client";
import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Hero({ profile }: { profile: any }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden" id="home">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {mounted && (
          <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full px-6 max-w-7xl mx-auto mt-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left: Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-primary font-mono tracking-widest text-sm md:text-base uppercase mb-4">
              Welcome to the future of the web
            </h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6 leading-tight"
          >
            I am <br className="hidden lg:block" />
            <span className="text-gradient font-unique tracking-wider">
              {profile?.name || "Ifat Ahmed Rafin"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 font-sans"
          >
            {profile?.headline || "Full-Stack Architect | AI Builder"}
            <br />
            <span className="text-sm mt-4 block text-gray-500">
              {profile?.bio}
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
          >
            <a
              href="#projects"
              className="px-8 py-4 rounded-full bg-primary text-black font-semibold tracking-wide hover:scale-105 transition-transform w-full sm:w-auto text-center"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full glass border border-primary/20 text-white font-semibold tracking-wide hover:bg-primary/10 transition-colors w-full sm:w-auto text-center"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center lg:justify-start gap-6"
          >
            <a 
              href={profile?.github || "https://github.com/Rafin010/"} 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
            </a>
            <a 
              href={profile?.linkedin || "https://www.linkedin.com/in/ifat-ahmed-rafin-056741360/"} 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-400 hover:text-primary hover:-translate-y-1 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            {profile?.instagram && (
              <a 
                href={profile.instagram} 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-pink-500 hover:-translate-y-1 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            )}
          </motion.div>
        </div>

        {/* Right: Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1 flex justify-center lg:justify-end relative"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]">
            {/* Glowing effect behind image */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            
            <img 
              src="/rafin for linkedin.png" 
              alt={profile?.name || "Ifat Ahmed Rafin"} 
              className="relative z-10 w-full h-full object-cover rounded-full border-2 border-primary/30 p-2 glass"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
