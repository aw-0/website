'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

export function useLightLeak() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const elementRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return

    const rect = elementRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))

    setMousePosition({ x, y })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0.5, y: 0.5 })
  }, [])

  // Calculate shadow intensity based on distance from cursor to edges
  const getShadowStyle = useCallback(() => {
    const { x, y } = mousePosition

    // Calculate distance from edges (0 = at edge, 1 = at center)
    const distFromLeft = x
    const distFromRight = 1 - x
    const distFromTop = y
    const distFromBottom = 1 - y

    // Edge intensity: stronger when cursor is near edge (inverse of distance)
    const leftIntensity = 1 - distFromLeft
    const rightIntensity = 1 - distFromRight
    const topIntensity = 1 - distFromTop
    const bottomIntensity = 1 - distFromBottom

    // Boost intensity when cursor is very close to edge
    const edgeBoost = 2

    const shadows = []

    // Base subtle shadows (always visible)
    shadows.push(`inset 20px -5px 40px -5px rgba(242, 236, 228, 0.1)`)
    shadows.push(`inset -30px 10px 40px -8px rgba(232, 168, 124, 0.1)`)

    // Left edge leak - stronger near cursor and edge
    if (leftIntensity > 0.3) {
      const leftBoost = x < 0.2 ? edgeBoost : 1
      const leftOpacity = Math.min(0.6, 0.2 + leftIntensity * 0.4 * leftBoost)
      shadows.push(
        `inset ${25 + leftIntensity * 40 * leftBoost}px ${-8 - leftIntensity * 20}px ${50 + leftIntensity * 40}px ${-8 - leftIntensity * 15}px rgba(242, 236, 228, ${leftOpacity})`
      )
    }

    // Right edge leak
    if (rightIntensity > 0.3) {
      const rightBoost = x > 0.8 ? edgeBoost : 1
      const rightOpacity = Math.min(0.6, 0.25 + rightIntensity * 0.35 * rightBoost)
      shadows.push(
        `inset ${-35 - rightIntensity * 40 * rightBoost}px ${12 + rightIntensity * 20}px ${50 + rightIntensity * 40}px ${-10 - rightIntensity * 15}px rgba(232, 168, 124, ${rightOpacity})`
      )
    }

    // Top edge leak
    if (topIntensity > 0.3) {
      const topBoost = y < 0.2 ? edgeBoost : 1
      const topOpacity = Math.min(0.5, 0.15 + topIntensity * 0.35 * topBoost)
      shadows.push(
        `inset ${12 + topIntensity * 25}px ${25 + topIntensity * 30 * topBoost}px ${35 + topIntensity * 30}px ${-12 - topIntensity * 10}px rgba(242, 236, 228, ${topOpacity})`
      )
    }

    // Bottom edge leak
    if (bottomIntensity > 0.3) {
      const bottomBoost = y > 0.8 ? edgeBoost : 1
      const bottomOpacity = Math.min(0.5, 0.2 + bottomIntensity * 0.3 * bottomBoost)
      shadows.push(
        `inset ${-18 - bottomIntensity * 25}px ${-25 - bottomIntensity * 30 * bottomBoost}px ${40 + bottomIntensity * 30}px ${-18 - bottomIntensity * 10}px rgba(232, 168, 124, ${bottomOpacity})`
      )
    }

    // Cursor position glow - always visible, stronger near edges
    const cursorX = x * 100
    const cursorY = y * 100
    const minDist = Math.min(distFromLeft, distFromRight, distFromTop, distFromBottom)
    const cursorIntensity = 0.2 + (1 - minDist) * 0.3
    shadows.push(
      `inset ${cursorX - 10}% ${cursorY - 10}% 30px -8px rgba(242, 236, 228, ${cursorIntensity})`
    )

    return {
      boxShadow: shadows.join(', '),
    }
  }, [mousePosition])

  return {
    elementRef,
    handleMouseMove,
    handleMouseLeave,
    shadowStyle: getShadowStyle(),
  }
}
