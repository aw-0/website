'use client'

import { motion } from 'framer-motion'
import HalftoneBackground from '@/components/HalftoneBackground'
import SpotifySection from '@/components/SpotifySection'
import SocialLinks from '@/components/SocialLinks'

export default function Home() {
  return (
    <>
      <HalftoneBackground />
      <main className="relative min-h-screen px-6 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="glass-card rounded-2xl p-8 md:p-10 lg:p-12 mb-12 md:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-6 md:mb-8"
            >
              <SocialLinks />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base md:text-lg lg:text-xl font-mono text-primary leading-relaxed"
            >
              hi, i'm andrew, a computer engineering student at uw-madison with solid full‑stack web
              development experience.
              <br />
              <br />
              i've led development on a revenue‑generating saas for roblox communities, built
              creator‑payment tools, and organized a 24‑hour chicago hackathon for 70 peers.
              comfortable with typescript/react, flutter, and cloud infrastructure on GCP &amp; AWS,
              i focus on translating ideas into dependable, production‑grade software.
            </motion.p>
          </motion.div>

          <SpotifySection />
        </div>
      </main>
    </>
  )
}
