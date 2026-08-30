"use client";
import { motion } from "framer-motion";

export default function Experience({ experience, skills }: { experience: any[], skills: any[] }) {
  return (
    <section className="py-32 relative z-10 bg-surface/50" id="experience">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-display font-bold mb-4">
                Work <span className="text-primary">Experience</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />
            </motion.div>

            <div className="space-y-12">
              {experience.length > 0 ? experience.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-8 border-l border-white/10"
                >
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[8.5px] top-1 shadow-[0_0_10px_rgba(0,229,255,0.6)]" />
                  <div className="text-sm font-mono text-primary mb-2">
                    {item.start_date} - {item.is_current ? "Present" : item.end_date}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{item.role}</h3>
                  <h4 className="text-lg text-gray-400 mb-4">{item.company}</h4>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies?.map((tech: string, i: number) => (
                      <span key={i} className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )) : (
                <p className="text-gray-500">No experience added yet.</p>
              )}
            </div>
          </div>

          {/* Skills Area */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-display font-bold mb-4">
                Tech <span className="text-primary">Stack</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />
            </motion.div>

            <div className="glass-card p-8 rounded-2xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5 group"
                  >
                    <span className="font-medium text-gray-300 group-hover:text-primary transition-colors text-center text-sm">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{skill.category}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
