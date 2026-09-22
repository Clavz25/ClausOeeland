export default function Footer() {
  return (
    <footer className="mt-16 flex flex-col items-start gap-4 border-t border-ink px-5 pt-5 pb-8 md:mt-24 md:flex-row md:items-start md:justify-between md:gap-10 md:px-10 md:pt-8 md:pb-12 lg:px-16">
      <p className="m-0 text-[12px] uppercase leading-relaxed tracking-[0.04em] md:text-[15px]">
        Claus Øeland <span className="mx-2.5">|</span> Copenhagen
      </p>
      {/* same padded hit areas as the header, so the two links can't be mistapped */}
      <div className="-my-2 flex flex-col gap-1.5 text-[12px] leading-relaxed whitespace-nowrap [&>a]:py-2 md:my-0 md:gap-0 md:items-end md:text-[15px] md:[&>a]:py-0">
        <a href="mailto:clausnich@gmail.com" className="hover:text-red">email: clausnich@gmail.com</a>
        <a href="tel:23676950" className="hover:text-red">tlf: 23676950</a>
      </div>
    </footer>
  )
}
