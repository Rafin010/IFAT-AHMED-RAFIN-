"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/layout/Loader";

export function Providers({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  // Example: we wait for the loader to finish
  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
}
