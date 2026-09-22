import { useEffect, useRef, useState } from 'react'

// Returns a ref (attach to the hero) and a smoothed scroll progress 0..1 across the hero's height.
export function useScrollProgress(smoothing = 0.14) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let target = 0, cur = 0, raf = null
    const tick = () => {
      cur += (target - cur) * smoothing
      if (Math.abs(cur - target) < 0.0005) cur = target
      setProgress(cur)
      raf = cur !== target ? requestAnimationFrame(tick) : null
    }
    const onScroll = () => {
      const h = ref.current
      if (!h) return
      target = Math.min(Math.max(window.scrollY / Math.max(h.offsetHeight, 300), 0), 1)
      if (!raf) raf = requestAnimationFrame(tick)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [smoothing])
  return { ref, progress }
}
