import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Footer from './components/Footer.jsx'
import { useScrollProgress } from './hooks/useScrollProgress.js'

export default function App() {
  // 0 → 1 as the hero scrolls out; smoothed so it feels like a GSAP scrub.
  const { ref: heroRef, progress } = useScrollProgress()
  return (
    <div className="min-h-screen bg-paper text-ink font-mono">
      <Header />
      <Hero ref={heroRef} progress={progress} />
      <Projects progress={progress} />
      <Footer />
    </div>
  )
}
