const R = '14px'
const EASE = 'cubic-bezier(.2,.8,.2,1)'
// one duration for the whole unfold — card radius, connector, arrow and the
// panel fold in Projects.jsx all run on it, so they land together
export const UNFOLD = '1200ms'

// square-cap arrow, spec §4 icon grid; points down to the case, up to close it
const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
    <path d="M12 6v12M6 12l6 6 6-6" />
  </svg>
)

export default function ProjectCard({ c, index, isOpen, parallax, onOpen, onCollapse, stacked = false }) {
  return (
    <div
      className="relative flex min-w-0 flex-col animate-fade-up"
      style={{ animationDelay: `${0.8 + index * 0.12}s` }}
    >
      <div
        onClick={() => !isOpen && onOpen()}
        className="relative flex aspect-square flex-col justify-end p-[8%] [container-type:inline-size] will-change-transform"
        style={{
          background: c.bg, color: c.fg,
          border: `2px solid ${c.border}`,
          borderBottomColor: isOpen ? 'transparent' : c.border,
          borderRadius: isOpen ? `${R} ${R} 0 0` : R,
          cursor: isOpen ? 'default' : 'pointer',
          translate: `0 ${parallax}px`,
          transition: `border-radius ${UNFOLD} ${EASE}, transform ${UNFOLD} ${EASE}`,
        }}
      >
        {c.list ? (
          <div className="absolute inset-0 flex flex-col p-[8%]">
            {/* header: wordmark on the left of the card, the bottle beside it —
                the index numeral holds the opposite corner */}
            {c.logo ? (
              <img
                src={c.logo}
                alt={`${c.title} wordmark`}
                className="h-[clamp(15px,7cqw,32px)] w-auto self-start"
              />
            ) : null}
            <div className="grid min-h-0 flex-1 grid-cols-[1.3fr_1fr] items-center gap-[4%]">
              <ul className="m-0 flex list-none flex-col p-0 whitespace-nowrap leading-loose text-[clamp(9px,4.4cqw,14px)]">
                {c.list.map((li) => <li key={li}>-{li}</li>)}
              </ul>
              <div
                role="img" aria-label={`${c.title} packaging`}
                className="aspect-[3/5] origin-bottom translate-y-[calc(-30%-12px)] scale-144 self-end bg-contain bg-no-repeat drop-shadow-[0_20px_28px_rgba(0,0,0,0.45)]"
                style={{ backgroundImage: c.image ? `url("${c.image}")` : 'none', backgroundPosition: '50% 50%' }}
              />
            </div>
          </div>
        ) : (
          <span className="text-[clamp(36px,4.6vw,72px)] leading-none">{c.title}</span>
        )}
        <span className="absolute right-[8%] top-[8%] text-[11px] uppercase tracking-[0.14em] opacity-75">0{index + 1}</span>

        {/* card footer, spec §4: hairline rule, mono label, square-cap arrow.
            z-10 keeps it above card 01's absolutely positioned overlay. */}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={`${isOpen ? 'Collapse' : 'Expand'} case ${c.title}`}
          onClick={(ev) => { ev.stopPropagation(); isOpen ? onCollapse() : onOpen() }}
          className="group relative z-10 mt-[7%] mb-[-4%] flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent p-0 pt-3.5 font-mono text-[12px] uppercase tracking-[0.14em] text-current transition-opacity hover:opacity-70"
          style={{ borderTop: '1px solid currentColor' }}
        >
          {isOpen ? 'Collapse' : 'Expand'}
          {/* two layers so the hover nudge and the open-state flip don't fight
              over one transform */}
          <span className="inline-flex transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-y-0.5">
            <span className="inline-flex" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: `transform ${UNFOLD} ${EASE}` }}>
              <Arrow />
            </span>
          </span>
        </button>
      </div>

      {/* connector: joins the open card to the panel below, with concave corners
          where a neighbouring card sits beside it (wide layout only) */}
      <div
        className="relative z-10 box-border"
        style={{
          height: isOpen ? 'calc(clamp(16px,3vw,40px) + 2px)' : 0,
          marginBottom: isOpen ? -2 : 0,
          background: c.bg,
          borderLeft: `2px solid ${c.border}`, borderRight: `2px solid ${c.border}`,
          transition: `height ${UNFOLD} ${EASE}`,
        }}
      >
        <div className="absolute bottom-0 right-full h-3.5 w-3.5" style={{ opacity: isOpen && !stacked && index > 0 ? 1 : 0, background: `radial-gradient(circle at top left, transparent 13px, ${c.bg} 14px)` }} />
        <div className="absolute bottom-0 left-full h-3.5 w-3.5" style={{ opacity: isOpen && !stacked && index < 2 ? 1 : 0, background: `radial-gradient(circle at top right, transparent 13px, ${c.bg} 14px)` }} />
      </div>
    </div>
  )
}
