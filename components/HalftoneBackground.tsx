'use client'

import { HalftoneDots } from '@paper-design/shaders-react'
import { useEffect, useState, useCallback } from 'react'

export default function HalftoneBackground() {
  const [mounted, setMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  useEffect(() => {
    setMounted(true)
    updateDimensions()

    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [updateDimensions])

  if (!mounted || dimensions.width === 0) {
    return <div className="fixed inset-0 bg-bg-deep -z-10" />
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <HalftoneDots
        width={dimensions.width}
        height={dimensions.height}
        image="/bg.webp"
        type="gooey"
        grid="hex"
        originalColors={true}
        inverted={false}
        size={0.25}
        radius={1.2}
        contrast={0.4}
        grainMixer={0.15}
        grainOverlay={0.1}
        grainSize={0.4}
        fit="cover"
      />
    </div>
  )
}
