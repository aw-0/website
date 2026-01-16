'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const links = [
  { name: 'email', href: 'mailto:me@andreww.co' },
  { name: 'twitter', href: 'https://twitter.com/andwolf_' },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/in/andrew-wolf-a5a746234/',
  },
  { name: 'github', href: 'https://github.com/aw-0' },
  { name: 'resume', href: '/resume.pdf' },
]

export default function SocialLinks() {
  return (
    <ul className="flex flex-wrap items-center gap-y-2" aria-label="Social links">
      {links.map((link, index) => (
        <motion.li
          key={link.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 + index * 0.03, duration: 0.3 }}
          className="flex items-center"
        >
          <Link
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center text-sm md:text-base font-mono text-primary"
          >
            <span className="group-hover:underline decoration-wavy hover:text-film-amber transition-colors font-semibold">{link.name}</span>
          </Link>
          {index < links.length - 1 && <span className="text-muted mx-2">·</span>}
        </motion.li>
      ))}
    </ul>
  )
}
