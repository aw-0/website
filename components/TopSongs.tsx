'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type TopSong = {
  name: string
  artist: { name: string }
  albumPic: string
}

export default function TopSongs() {
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
      transition={{ delay: 0.4, duration: 0.6 }}
      className="bg-bg-surface border border-halftone-cream/10 rounded-lg p-6"
    >
      <h2 className="text-2xl font-display font-bold mb-6 text-primary">
        my top songs this month:
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3 animate-pulse">
              <div className="w-24 h-24 rounded-md bg-bg-deep" />
              <div className="h-4 w-32 bg-bg-deep rounded" />
            </div>
          ))
        ) : songs.length === 0 ? (
          <div className="col-span-2 text-muted font-mono text-sm">no data available</div>
        ) : (
          songs.map((song, index) => (
            <motion.div
              key={`${song.name}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              className="flex flex-col items-center group"
            >
              <div className="relative w-24 h-24 rounded-md overflow-hidden film-vignette light-leak-hover">
                <Image
                  src={song.albumPic}
                  alt={`${song.name} by ${song.artist.name}`}
                  width={96}
                  height={96}
                  className="object-cover transition-transform duration-300 group-hover:scale-110 w-full h-full"
                  style={{
                    filter: 'brightness(1.1) saturate(1.2) contrast(1.05)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              <p className="mt-3 text-sm font-mono text-center text-primary max-w-[150px]">
                <span className="font-semibold">{song.name}</span>
                <span className="text-muted"> • {song.artist.name}</span>
              </p>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}
