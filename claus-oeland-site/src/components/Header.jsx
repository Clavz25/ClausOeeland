const services = ['Strategy', 'Marketing', 'Brand', 'Creative', 'Data']

export default function Header() {
  return (
    <header className="flex flex-col items-start gap-4 border-b border-ink px-5 pt-7 pb-5 animate-fade-up md:flex-row md:items-start md:justify-between md:gap-10 md:px-10 md:pt-12 md:pb-10 lg:px-16">
      <nav className="flex flex-wrap gap-x-2.5 text-[12px] uppercase leading-relaxed tracking-[0.04em] md:text-[15px]">
        {services.map((s, i) => (
          <span key={s} className="flex gap-x-2.5">
            <span>{s}</span>
            {/* the trailing rule reads as a spec-sheet divider, not a list bullet */}
            <span className={i === services.length - 1 ? 'hidden md:inline' : ''}>|</span>
          </span>
        ))}
      </nav>
      {/* phone: the two links get padded hit areas (36px) and a gap, so they
          can't be mistapped for each other — -my-2 keeps the header height */}
      <div className="-my-2 flex flex-col gap-1.5 text-[12px] leading-relaxed whitespace-nowrap [&>a]:py-2 md:my-0 md:gap-0 md:items-end md:text-[15px] md:[&>a]:py-0">
        <a href="mailto:clausnich@gmail.com" className="hover:text-red">email: clausnich@gmail.com</a>
        <a href="tel:23676950" className="hover:text-red">tlf: 23676950</a>
      </div>
    </header>
  )
}
