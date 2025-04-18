import React, { useEffect, useRef } from "react"

const blobsConfig = [
  { x: -4, y: 0, className: "bg-purple-500 mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20" },
  { x: -4, y: 0, className: "bg-cyan-500 mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 hidden sm:block" },
  { x: 20, y: -8, className: "bg-blue-500 mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20" },
  { x: 20, y: -8, className: "bg-blue-500 mix-blend-multiply filter blur-[128px] opacity-20 md:opacity-10 hidden sm:block" },
]

export default function AnimatedBackground() {
  const blobRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    let currentScroll = window.pageYOffset
    let rafId: number

    const updateBlobs = () => {
      const scrollY = window.pageYOffset
      blobRefs.current.forEach((blob, index) => {
        if (!blob) return
        const { x: startX, y: startY } = blobsConfig[index]
        const phase = scrollY / 100 + index * 0.5
        const xOffset = Math.sin(phase) * 340
        const yOffset = Math.cos(phase) * 40
        blob.style.transform = `translate(${startX + xOffset}px, ${startY + yOffset}px)`
        blob.style.transition = "transform 1.4s ease-out"
      })
      rafId = requestAnimationFrame(updateBlobs)
    }

    rafId = requestAnimationFrame(updateBlobs)

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {blobsConfig.map((blob, idx) => (
        <div
          key={idx}
          ref={(el) => (blobRefs.current[idx] = el)}
          className={`absolute w-72 h-72 md:w-96 md:h-96 rounded-full ${blob.className}`}
          style={{ top: blob.y === -8 ? "auto" : 0, bottom: blob.y === -8 ? "-2rem" : "auto", left: blob.x < 0 ? "-1rem" : blob.x > 0 ? blob.x > 0 && idx % 2 !== 0 ? "auto" : "5rem" : 0, right: blob.x > 0 && idx % 2 === 1 ? "5rem" : "auto" }}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
  )
}