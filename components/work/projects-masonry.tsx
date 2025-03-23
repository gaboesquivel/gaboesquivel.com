'use client'
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "components/work/project-card";
import type { Project } from "gaboesquivel";

interface ProjectsMasonryProps {
  projects: Project[];
  identifier?: string;
}

export function ProjectsMasonry({ projects, identifier = 'projects' }: ProjectsMasonryProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={identifier}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="w-full h-full flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
} 