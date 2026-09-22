import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useMediaQuery.js'

// square-cap chevrons, spec §4 icon grid — same stroke language as the card arrow
const Chev = ({ dir }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
    <path d={dir === 'prev' ? 'M18 12H6M12 6l-6 6 6 6' : 'M6 12h12M12 6l6 6-6 6'} />
  </svg>
)

// Horizontal strip of work images at the foot of a Case Study. Native scroll +
// scroll-snap does the moving, so touch drag and keyboard come for free; the
// arrows and the index read off the same scroll position.
export default function Gallery({ items, label = 'Selected work' }) {
  const track = useRef(null)
  const [i, setI] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = track.current
    if (!el) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const slide = el.firstElementChild
        if (!slide) return
        const step = slide.getBoundingClientRect().width + (parseFloat(getComputedStyle(el).columnGap) || 0)
        if (!step) return
        setI(Math.max(0, Math.min(items.length - 1, Math.round(el.scrollLeft / step))))
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => { cancelAnimationFrame(frame); el.removeEventListener('scroll', onScroll) }
  }, [items.length])

  const go = (n) => {
    const el = track.current
    const slide = el?.children[Math.max(0, Math.min(items.length - 1, n))]
    if (!slide) return
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    // container-type: the slide count reads off the strip's own width, so a
    // half-width window gets the same treatment as a narrow phone.
    <section className="flex flex-col gap-3.5 [container-type:inline-size] md:gap-4" aria-label={label}>
      <div className="flex items-center justify-between gap-4 border-b border-current pb-3 text-[11px] uppercase tracking-[0.14em] md:text-[12px]">
        <span className="font-semibold">{label}</span>
        <div className="flex items-center gap-3">
          <span className="tabular-nums opacity-70">
            {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <span className="flex items-center gap-1.5">
            {['prev', 'next'].map((dir) => {
              const to = dir === 'prev' ? i - 1 : i + 1
              const disabled = to < 0 || to > items.length - 1
              return (
                <button
                  key={dir}
                  type="button"
                  onClick={() => go(to)}
                  disabled={disabled}
                  aria-label={dir === 'prev' ? 'Previous image' : 'Next image'}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center border border-current bg-transparent p-0 text-current transition-opacity hover:opacity-60 disabled:cursor-default disabled:opacity-25"
                >
                  <Chev dir={dir} />
                </button>
              )
            })}
          </span>
        </div>
      </div>

      {/* no-scrollbar: the index and arrows already say where you are */}
      <ul
        ref={track}
        className="m-0 flex list-none snap-x snap-mandatory gap-[var(--gap)] overflow-x-auto overscroll-x-contain p-0 [--gap:0.75rem] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden @[34rem]:[--gap:1rem]"
      >
        {items.map((it, n) => (
          <li
            key={it.src + n}
            className="w-full shrink-0 snap-start @[34rem]:w-[calc((100%-var(--gap))/2)] @[62rem]:w-[calc((100%-var(--gap)*2)/3)] @[96rem]:w-[calc((100%-var(--gap)*3)/4)]"
          >
            <figure className="m-0 flex flex-col gap-2">
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                decoding="async"
                width="1200"
                height="628"
                className="block aspect-[1200/628] w-full border border-current object-cover"
              />
              {it.caption ? (
                <figcaption className="text-[11px] uppercase tracking-[0.12em] opacity-70">
                  {String(n + 1).padStart(2, '0')} · {it.caption}
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
