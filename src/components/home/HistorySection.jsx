const TIMELINE = [
  {
    era: '3.2M BCE',
    title: 'Lucy is Born',
    desc: "Australopithecus afarensis — the skeleton named 'Lucy' — walked these highlands, making Ethiopia humanity's oldest known home.",
  },
  {
    era: '980 BCE',
    title: 'Queen of Sheba',
    desc: "The legendary Queen of Sheba rules from Axum, trading gold, ivory, and incense with Solomon's Jerusalem and pharaonic Egypt.",
  },
  {
    era: '100 CE',
    title: 'Aksumite Empire',
    desc: "One of the ancient world's four great powers alongside Rome, Persia, and China — Aksum minted its own coins and erected towering stelae.",
  },
  {
    era: '330 CE',
    title: 'Christianity Adopted',
    desc: 'Emperor Ezana makes Ethiopia one of the first states to adopt Christianity, a faith that shapes architecture, art, and identity to this day.',
  },
  {
    era: '1200s CE',
    title: "Lalibela's Churches",
    desc: 'King Lalibela orders eleven monolithic churches carved downward into living rock — a Jerusalem in Africa that still draws pilgrims today.',
  },
  {
    era: '1896',
    title: 'Battle of Adwa',
    desc: "Emperor Menelik II defeats Italy's invading army — the first African victory over a European colonial force, inspiring independence movements worldwide.",
  },
];

const HistorySection = () => (
  <section
    id="history"
    className="bg-stone-950 py-28 px-8 relative overflow-hidden"
  >
    {/* Decorative large text */}
    <p
      className="absolute top-8 right-8 text-stone-900 select-none pointer-events-none hidden lg:block"
      style={{
        fontFamily: 'Georgia, serif',
        fontSize: '10rem',
        fontWeight: 700,
        lineHeight: 1,
      }}
      aria-hidden="true"
    >
      3000
    </p>

    <div className="  mx-auto relative z-10">
      <div className="mb-16">
        <p className="text-amber-400 text-xs tracking-[4px] uppercase mb-3">
          Through the Ages
        </p>
        <h2
          className="text-white leading-tight"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400,
          }}
        >
          A civilization older
          <br />
          than history itself
        </h2>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[110px] top-0 bottom-0 w-px bg-stone-800 hidden md:block" />

        <div className="space-y-0">
          {TIMELINE.map(({ era, title, desc }, i) => (
            <div
              key={era}
              className="group flex gap-8 md:gap-0 items-start relative"
            >
              {/* Era */}
              <div className="hidden md:flex flex-col items-end w-[110px] pt-6 flex-shrink-0 pr-8">
                <span
                  className="text-amber-500/60 group-hover:text-amber-400 transition-colors text-sm font-medium"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {era}
                </span>
              </div>

              {/* Dot */}
              <div className="hidden md:flex items-start pt-7 flex-shrink-0 relative z-10">
                <div className="w-2.5 h-2.5 rounded-full border-2 border-stone-700 group-hover:border-amber-400 bg-stone-950 transition-colors duration-300 -ml-[5px]" />
              </div>

              {/* Content */}
              <div
                className={`flex-1 md:pl-8 py-6 border-b border-stone-800/50 ${i === TIMELINE.length - 1 ? 'border-b-0' : ''}`}
              >
                <span className="text-amber-400 text-xs font-medium md:hidden">
                  {era}
                </span>
                <h3
                  className="text-white text-xl mb-2 group-hover:text-amber-400/90 transition-colors duration-300"
                  style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
                >
                  {title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed max-w-2xl">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HistorySection;
