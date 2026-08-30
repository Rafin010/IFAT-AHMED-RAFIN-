"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function Projects({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-32 relative z-10" id="projects">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-xs font-mono text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
                    {project.category || 'App'}
                  </div>
                  <div className="flex gap-3">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
                  {project.short_description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies?.map((tech: string, i: number) => (
                    <span key={i} className="text-xs font-medium text-gray-300 bg-white/5 px-2 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
