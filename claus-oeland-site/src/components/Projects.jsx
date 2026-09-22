import { useRef, useState } from 'react'
import { cases } from '../data/cases.js'
import { useIsStacked, useReducedMotion } from '../hooks/useMediaQuery.js'
import ProjectCard, { UNFOLD } from './ProjectCard.jsx'
import CasePanel from './CasePanel.jsx'

const R = '14px'

// grid-rows 0fr → 1fr, so the panel folds open from its own height. A folded
// panel stays in the DOM, so it is made inert — stacked there are three of them
// and their Collapse buttons would otherwise sit in the tab order.
function Fold({ open, children }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: open ? '1fr' : '0fr',
        transition: `grid-template-rows ${UNFOLD} cubic-bezier(.2,.8,.2,1)`,
      }}
      inert={open ? undefined : ''}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}

export default function Projects({ progress = 0 }) {
  const [open, setOpen] = useState(-1)   // index of the unfolded card, -1 = none
  const [last, setLast] = useState(0)    // keeps panel content while it folds shut
  const idx = open >= 0 ? open : last
  const e = 1 - Math.pow(1 - Math.min(progress, 1), 2)

  const stacked = useIsStacked()
  const reduced = useReducedMotion()
  const rows = useRef([])

  const openCase = (i) => {
    setOpen(i)
    setLast(i)
    // Stacked, the panel opens between the cards — bring its card to the top of
    // the viewport so the case starts where the thumb just tapped.
    if (stacked) {
      requestAnimationFrame(() =>
        rows.current[i]?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }),
      )
    }
  }

  return (
    <section id="projects" className="px-5 pt-4 pb-16 md:px-10 md:pt-8 md:pb-20 lg:px-16">
      {stacked ? (
        // One column: each Card carries its own Case Study directly beneath it.
        <div className="flex flex-col gap-4">
          {cases.map((c, i) => (
            <div key={c.id} ref={(el) => { rows.current[i] = el }} className="scroll-mt-4">
              <ProjectCard c={c} index={i} isOpen={open === i} parallax={0} stacked onOpen={() => openCase(i)} onCollapse={() => setOpen(-1)} />
              <Fold open={open === i}>
                <CasePanel c={c} index={i} radius={`0 0 ${R} ${R}`} />
              </Fold>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 items-start gap-[clamp(16px,3vw,40px)]">
            {cases.map((c, i) => (
              <ProjectCard
                key={c.id}
                c={c}
                index={i}
                isOpen={open === i}
                parallax={(1 - e) * (24 + i * 18)}
                onOpen={() => openCase(i)}
                onCollapse={() => setOpen(-1)}
              />
            ))}
          </div>
          <Fold open={open >= 0}>
            <CasePanel
              c={cases[idx]}
              index={idx}
              radius={idx === 0 ? `0 ${R} ${R} ${R}` : idx === 2 ? `${R} 0 ${R} ${R}` : R}
            />
          </Fold>
        </>
      )}
    </section>
  )
}
