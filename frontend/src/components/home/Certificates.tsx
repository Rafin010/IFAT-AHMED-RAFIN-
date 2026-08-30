"use client";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function Certificates({ certificates }: { certificates: any[] }) {
  if (!certificates || certificates.length === 0) return null;

  return (
    <section className="py-32 relative z-10" id="certificates">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Awards & <span className="text-primary">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl border-t border-white/10 hover:border-primary/50 transition-colors flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>
              <p className="text-sm font-mono text-gray-400">{cert.issuer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
