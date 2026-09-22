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
        className="relative flex aspect-square flex-col p-[8%] [container-type:inline-size] will-change-transform"
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
        {/* stage word holds one top corner, the index numeral the other */}
        <div className="flex items-start justify-between text-[11px] uppercase tracking-[0.14em] opacity-75">
          <span>{c.stage}</span>
          <span>0{index + 1}</span>
        </div>

        {/* proof imagery where there is any; otherwise the space stays empty and
            lets the role heading sit low, the same way on all three cards */}
        <div className="relative min-h-0 flex-1">
          {c.image ? (
            <div
              role="img" aria-label={`${c.title} packaging`}
              className="absolute inset-[6%_0_4%] bg-contain bg-center bg-no-repeat drop-shadow-[0_20px_28px_rgba(0,0,0,0.45)]"
              style={{ backgroundImage: `url("${c.image}")` }}
            />
          ) : null}
        </div>

        {/* the role is the card's headline — one size below the ØELAND lockup,
            with the line break authored in the data rather than left to wrap */}
        <h3 className="m-0 font-display text-[clamp(22px,9.4cqw,44px)] font-extrabold uppercase leading-[0.92] tracking-[-0.01em]">
          {c.role.map((line) => <span key={line} className="block">{line}</span>)}
        </h3>
        <p className="m-0 mt-[3%] text-[clamp(10px,3.6cqw,13px)] leading-[1.4] opacity-80">{c.promise}</p>

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
