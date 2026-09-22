import { useIsStacked } from '../hooks/useMediaQuery.js'
import Gallery from './Gallery.jsx'

function Tile({ c, children, className = '' }) {
  return (
    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl md:h-22 md:w-22 ${className}`} style={{ background: c.tile, color: c.tileFg }}>
      {children}
    </div>
  )
}

const labelClass = 'text-[11px] font-semibold uppercase tracking-[0.14em] opacity-85 md:text-[12px]'

// Wide: tile in its own column, centred on the label and body copy it refers to
// — tags and metrics sit on a second row so they don't drag the tile down.
// Phone: tile sits on the label line so the body text keeps the full column width.
function Row({ tile, label, text, children }) {
  const stacked = useIsStacked()
  if (stacked) {
    return (
      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex items-center gap-3">
          {tile}
          <span className={labelClass}>{label}</span>
        </div>
        <p className={body}>{text}</p>
        {children}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-[88px_1fr] items-center gap-x-[clamp(24px,4vw,56px)] gap-y-3.5">
      {tile}
      <div className="flex min-w-0 flex-col gap-3.5">
        <span className={labelClass}>{label}</span>
        <p className={body}>{text}</p>
      </div>
      {/* min-w-0: lets the 1fr track shrink below its content, so the metrics
          grid measures the real available width instead of forcing 3 columns */}
      {children ? <div className="col-start-2 min-w-0">{children}</div> : null}
    </div>
  )
}

const body = 'm-0 max-w-[62ch] text-[15px] leading-[1.6] md:text-[clamp(15px,1.3vw,18px)] md:leading-[1.65]'

export default function CasePanel({ c, index, radius }) {
  return (
    <div
      className="box-border flex flex-col gap-9 p-5 transition-colors duration-[400ms] md:gap-12 md:p-[clamp(28px,4vw,56px)]"
      style={{ background: c.bg, color: c.fg, border: `2px solid ${c.border}`, borderRadius: radius }}
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 border-b border-current pb-3 text-[11px] uppercase tracking-[0.14em] md:grid md:grid-cols-[auto_1fr_auto_auto] md:gap-6 md:pb-4 md:text-[12px]">
        <span className="font-semibold">Stage 0{index + 1} / {c.stage}</span>
        <span className="opacity-80">{c.client}</span>
        <span className="opacity-80">{c.year}</span>
        <span className="opacity-80">{c.markets}</span>
      </div>

      {/* Stage framing: what this stage is, before the proof that it works.
          Deliberately quiet — mono at body size, no chips — so the case
          headline below it stays the panel's arrival. */}
      <div className="-mt-3 flex flex-col gap-6 md:-mt-6 md:grid md:grid-cols-[1.6fr_1fr] md:gap-x-[clamp(24px,4vw,56px)]">
        <div className="flex min-w-0 flex-col gap-3">
          <span className={labelClass}>What I do here</span>
          <p className="m-0 max-w-[52ch] text-[13px] leading-[1.7] opacity-90 md:text-[14px]">
            {c.capabilities.join('  /  ')}
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <span className={labelClass}>Outcome</span>
          <p className="m-0 max-w-[32ch] text-[15px] leading-[1.5] md:text-[16px]">{c.outcome}</p>
        </div>
      </div>

      <h3 className="m-0 max-w-[14ch] font-display text-[clamp(32px,8.5vw,48px)] font-extrabold uppercase leading-[0.92] [overflow-wrap:anywhere] md:text-[clamp(40px,6vw,88px)]">{c.headline}</h3>

      <div className="flex flex-col gap-9 md:gap-[clamp(40px,5vw,72px)]">
        <Row label="01 · The problem" text={c.problem} tile={<Tile c={c}><span className="text-[26px] font-semibold leading-none md:text-[56px]">?</span></Tile>} />

        <Row label="02 · What was done" text={c.done} tile={
          <Tile c={c}>
            <svg className="h-6 w-6 md:h-13 md:w-13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.6 20.4a1.5 1.5 0 0 1 0-2.1l8.2-8.2 2.1 2.1-8.2 8.2a1.5 1.5 0 0 1-2.1 0zM13.2 4.2 15.3 2.1l3.5 3.5 1.6-.4L22 6.8l-3.2 3.2-1.6-1.6-.4 1.6-2.1 2.1-5.6-5.6 2.1-2.1 2 .4z" /></svg>
          </Tile>
        }>
          <div className="flex flex-wrap gap-2">
            {c.tags.map((t) => (
              <span key={t} className="rounded border border-current px-2.5 py-1.5 text-[11px] uppercase tracking-[0.1em]">{t}</span>
            ))}
          </div>
        </Row>

        <Row label="03 · The results" text={c.results} tile={
          <Tile c={c} className="!items-end gap-1 pb-2.5 md:gap-[7px] md:pb-[18px]">
            <span className="h-3 w-1.5 rounded-[5px] bg-current md:h-[22px] md:w-2.5" />
            <span className="h-6 w-1.5 rounded-[5px] bg-current md:h-[46px] md:w-2.5" />
            <span className="h-4 w-1.5 rounded-[5px] bg-current md:h-[32px] md:w-2.5" />
          </Tile>
        }>
          {/* the 1px rules are the container showing through the gaps, so an odd
              last cell has to span the phone's two columns or it leaves a hole */}
          <div className={`grid max-w-[720px] grid-cols-2 gap-px border border-current bg-current md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] ${c.metrics.length % 2 ? '[&>*:last-child]:col-span-2 md:[&>*:last-child]:col-span-1' : ''}`}>
            {c.metrics.map((m) => (
              <div key={m.label} className="flex flex-col gap-2 px-3.5 py-3.5 md:px-4 md:py-4.5" style={{ background: c.bg }}>
                <span className="font-display text-[32px] font-extrabold leading-[0.9] md:text-[clamp(36px,3.5vw,56px)]">{m.value}</span>
                <span className="text-[11px] uppercase tracking-[0.12em] opacity-80">{m.label}</span>
              </div>
            ))}
          </div>
        </Row>
      </div>

      {c.gallery?.length ? <Gallery items={c.gallery} /> : null}

      {/* the card's own Expand/Collapse control is the only way back up */}
      <div className="border-t border-current pt-5 text-[11px] uppercase tracking-[0.14em] md:pt-6">
        <span className="opacity-70">{c.footer}</span>
      </div>
    </div>
  )
}
