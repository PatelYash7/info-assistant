import { useState, useEffect } from "react"

export const useGlowingCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateCursor)

    return () => {
      window.removeEventListener("mousemove", updateCursor)
    }
  }, [])

  return position
}

