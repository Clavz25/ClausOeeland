import { forwardRef } from 'react'

// progress: 0..1 smoothed scroll progress. Drives the perspective "fold" of the two name lines.
const Hero = forwardRef(function Hero({ progress: p }, ref) {
  const e = 1 - Math.pow(1 - Math.min(p, 1), 2)
  return (
    <section ref={ref} className="px-5 pt-8 pb-8 [perspective:600px] md:px-10 md:pt-14 md:pb-10 lg:px-16 md:[perspective:900px]">
      <h1 className="m-0 flex flex-col font-display leading-[0.86] tracking-[-0.01em] uppercase">
        <span className="block overflow-hidden pb-[0.04em]">
          <span
            className="block origin-bottom-left text-[clamp(40px,11vw,72px)] font-light will-change-transform animate-rise-in [animation-delay:.1s] md:text-[clamp(96px,14vw,200px)]"
            style={{ transform: `translateY(${p * 38}%) scaleY(${1 - p * 0.45}) skewX(${-p * 10}deg)`, opacity: 1 - p * 0.6 }}
          >Claus</span>
        </span>
        <span className="block overflow-hidden -mt-[0.02em]">
          <span
            className="block origin-top-left text-[clamp(76px,24vw,120px)] font-black will-change-transform animate-rise-in [animation-delay:.25s] [animation-duration:1.1s] md:text-[clamp(120px,19vw,270px)]"
            style={{ transform: `translateY(${-p * 14}%) rotateX(${p * 42}deg) scaleY(${1 - p * 0.28})` }}
          >Øeland</span>
        </span>
      </h1>
      <div
        className="mt-7 animate-fade-up [animation-delay:.6s] md:mt-10"
        style={{ transform: `translateY(${p * -30}px)`, opacity: 1 - e * 0.5 }}
      >
        {/* the three stages, in the order the Cards below run them */}
        <p className="m-0 text-[clamp(16px,4.4vw,20px)] uppercase tracking-[0.08em] md:text-[clamp(18px,1.8vw,26px)]">Strategy <span className="opacity-60">&rarr;</span> Creative <span className="opacity-60">&rarr;</span> Growth</p>
        <p className="m-0 mt-3.5 max-w-[46ch] text-[13px] leading-[1.6] opacity-70 md:mt-5 md:text-[15px]">Strategy, brand, marketing, creative, technology and data — connected around one goal: making businesses work better.</p>
      </div>
    </section>
  )
})

export default Hero
