import { useEffect, useState } from 'react'

// Reads a media query and re-renders on change. Used for layout switches that
// CSS alone can't make — on a phone the case panel has to live directly under
// its own card, which is a different tree, not a different rule.
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export const useIsStacked = () => useMediaQuery('(max-width: 759.98px)')
export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
