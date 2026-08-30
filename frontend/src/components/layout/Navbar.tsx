"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className={`text-2xl font-display font-bold tracking-tighter ${isScrolled ? "text-primary" : "text-white"}`}>
          Rafin<span className="text-primary">.</span>
        </div>

        {/* Desktop Links */}
        <div className={`hidden md:flex items-center gap-8 px-8 py-3 rounded-full transition-all duration-300 ${
          isScrolled ? "glass-card" : "bg-transparent"
        }`}>
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-primary transition-colors tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass-card border-t border-white/5 py-6 px-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-200 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
