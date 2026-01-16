'use client'

import { motion } from 'framer-motion'

type Project = {
  title: string
  dateRange: string
  techStack?: string
  description: string
  link?: string
}

const projects: Project[] = [
  {
    title: 'stevenson.space',
    dateRange: 'Feb 2022 – May 2025',
    techStack: 'Vue, Sass, TypeScript, Cloudflare R2 and Pages',
    description:
      'Ran stevenson.space, an open‑source hub used weekly by 4k+ students for schedules, lunch, events, GPA tools, and a student music feature. The Vue/Sass/TypeScript platform scaled to 80k+ monthly views and stayed reliable for three years.',
    link: 'https://stevenson.space',
  },
  {
    title: 'SHSMaps',
    dateRange: 'Mar 2023 – May 2025',
    techStack: 'Next, OCR, Tailwind, Vercel',
    description:
      'Built SHSMaps, an indoor maps experience for a 1M+ sq ft campus that turns class schedules into turn‑by‑turn directions in a PWA. The launch reached 5.7k users in the first month while I partnered with school leadership on privacy and security.',
    link: 'https://shsmaps.com',
  },
  {
    title: 'Windy City Hacks',
    dateRange: 'Dec 2023 – Jul 2024',
    techStack: 'Event Ops, Sponsorships, Outreach, Nuxt',
    description:
      'I led Windy City Hacks, a 100‑student high‑school hackathon in Chicagoland, and handled everything from sponsorships to day‑of logistics. We raised $4k+ to fund meals, venue costs, and prizes while building a cross‑school community.',
    link: 'https://windycityhacks.com',
  },
  {
    title: 'Koal',
    dateRange: 'Jan 2020 – Jun 2024',
    techStack: 'TypeScript, Python, Nuxt, Firebase',
    description:
      'I founded Koal, a SaaS platform that automated Discord integrations for Roblox communities and grew to tens of thousands of users. I built and operated the full stack across TypeScript, Python, Nuxt, Firebase, and Docker, while leading a small volunteer team.',
  },
]

export default function ProjectsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="glass-card rounded-2xl p-8 md:p-10 lg:p-12 mb-12 md:mb-16"
    >
      <h2 className="text-xl font-display font-bold mb-8 text-primary">projects / experience</h2>
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-muted/40" />
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: 'easeOut' }}
              className="relative pl-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.4, ease: 'easeOut' }}
                className="absolute left-[10px] top-2 h-3 w-3 rounded-full bg-film-amber shadow-sm shadow-film-amber/40"
              />
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex flex-col gap-1">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-lg md:text-xl font-display font-semibold text-primary hover:text-film-amber transition"
                      >
                        {project.title}
                      </a>
                    ) : (
                      <h3 className="text-lg md:text-xl font-display font-semibold text-primary">
                        {project.title}
                      </h3>
                    )}
                    <p className="text-xs md:text-sm font-mono text-muted">
                      {project.dateRange}
                      {project.techStack ? ` • ${project.techStack}` : ''}
                    </p>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + index * 0.08, duration: 0.5 }}
                    className="mt-3 text-sm md:text-base font-mono text-primary/90 leading-relaxed"
                  >
                    {project.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
