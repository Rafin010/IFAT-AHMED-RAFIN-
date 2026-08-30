"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { submitContactForm } from "@/lib/api";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitContactForm(formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="py-32 relative z-10 bg-black" id="contact">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-gray-400">Have a project in mind or just want to say hi? My inbox is always open.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-mono text-gray-400">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-mono text-gray-400">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-mono text-gray-400">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="How can I help you?"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-primary text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
              <Send size={18} />
            </button>

            {status === "success" && (
              <p className="text-green-400 text-center text-sm font-medium">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-center text-sm font-medium">Something went wrong. Please try again.</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
