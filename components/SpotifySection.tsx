'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type TopSong = {
  name: string
  artist: { name: string }
  albumPic: string
}

export default function SpotifySection() {
  const [songs, setSongs] = useState<TopSong[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('/api/top-songs')
        const data = await response.json()
        if (data.songs) {
          setSongs(data.songs)
        }
      } catch (error) {
        console.error('Failed to fetch top songs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSongs()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="glass-card rounded-2xl p-8 md:p-10 lg:p-12"
    >
      {/* Top Songs */}
      <div>
        <h2 className="text-xl font-display font-bold mb-6 text-primary">top songs this month</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2 animate-pulse">
                <div className="w-full aspect-square max-w-[140px] rounded-lg bg-bg-deep" />
                <div className="h-3 w-3/4 bg-bg-deep rounded" />
                <div className="h-2.5 w-1/2 bg-bg-deep rounded" />
              </div>
            ))
          ) : songs.length === 0 ? (
            <div className="col-span-2 md:col-span-3 text-muted font-mono text-sm">
              no data available
            </div>
          ) : (
            songs.map((song, index) => (
              <motion.div
                key={`${song.name}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                className="flex flex-col group"
              >
                <div className="relative w-full aspect-square max-w-[140px] rounded-lg overflow-hidden film-vignette mb-2">
                  <Image
                    src={song.albumPic}
                    alt={`${song.name} by ${song.artist.name}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    style={{
                      filter: 'brightness(1.1) saturate(1.2) contrast(1.05)',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
                <p className="text-xs md:text-sm font-mono text-primary">
                  <span className="font-semibold">{song.name}</span>
                </p>
                <p className="text-xs font-mono text-muted mt-0.5">{song.artist.name}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  )
}
