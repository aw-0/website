'use client'

import { motion } from 'framer-motion'

type Project = {
  title: string
  role?: string
  dateRange: string
  techStack?: string
  description: string
  link?: string
}

const experience: Project[] = [
  {
    title: 'Grainger Engineering Design Innovation Lab',
    role: 'Technical Employee',
    dateRange: 'Sep 2025 – Present',
    techStack: '3D printing, rapid prototyping, electronics',
    description:
      'Support student, faculty, and research projects in a 25k+ sq ft makerspace. I maintain software for job intake, queue optimization, and status monitoring across 45+ 3D printers, and help with equipment training, shop operations, and safety.',
  },
  {
    title: 'AV',
    role: 'Software Engineering Intern',
    dateRange: 'Jun 2026 – Aug 2026',
    techStack: 'Rust, Python, GStreamer, FFmpeg, OpenCV, embedded Linux',
    description:
      'Built a 16-bit infrared video recording pipeline in Rust, with custom processing plugins for capture, encoding, compression, and per-frame timestamps. I also developed camera latency measurement tools and a synchronized EO/LWIR video overlay tool that doubled data annotation efficiency.',
  },
  {
    title: 'OktoRocket',
    role: 'Software Engineering Intern · Part-time',
    dateRange: 'Apr 2022 – Aug 2025',
    techStack: 'React, platform reliability',
    description:
      'Refactored a legacy React app used by thousands of clients and improved core features as the platform scaled from roughly 50 to 1,000+ locations. Reliability improvements supported 2M+ texts and 30k+ hours of audio transcription each month.',
  },
  {
    title: 'Hydrant Pay',
    role: 'Founding Software Engineer',
    dateRange: 'Jul 2024 – Jul 2025',
    techStack: 'Payment workflows, financial integrations, user interfaces',
    description:
      'Built interfaces for influencer talent agencies to manage invoices and contract payment splits. I designed backend integrations for early invoice payments, helping the platform process $500k+ in billing for 50+ clients within its first months.',
  },
  {
    title: 'Tamarak Day Camp',
    role: 'Lead Summer Camp Counselor · Seasonal',
    dateRange: 'Jun 2022 – Jul 2025',
    description:
      'Led groups of 15+ six-year-old campers and mentored 20+ junior counselors in leadership and conflict resolution. I also flew 10+ drone operations to capture photos and video for camp marketing.',
  },
]

const projects: Project[] = [
  {
    title: 'stevenson.space',
    dateRange: 'Feb 2022 – May 2025',
    techStack: 'Vue, Sass, TypeScript, AWS Textract, Netlify',
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
      'I led Windy City Hacks, a 24-hour Chicago hackathon for 70 peers, and handled everything from sponsorships to day‑of logistics. We raised $4k+ to fund meals, venue costs, and prizes while building a cross‑school community.',
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

export default function ProjectsSection({ variant = 'projects' }: { variant?: 'projects' | 'experience' }) {
  const entries = variant === 'experience' ? experience : projects
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="glass-card rounded-2xl p-8 md:p-10 lg:p-12 mb-12 md:mb-16"
    >
      <h2 className="text-xl font-display font-bold mb-8 text-primary">{variant === 'experience' ? 'experience' : 'projects'}</h2>
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-muted/40" />
        <div className="space-y-8">
          {entries.map((project, index) => (
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
                    {project.role && (
                      <p className="text-sm font-mono text-film-amber">{project.role}</p>
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
