const SERVICES = [
  {
    icon: '☕',
    title: 'Origin of Coffee',
    desc: 'Walk the highlands of Kaffa where Arabica coffee was born. Visit traditional coffee ceremonies and single-origin farms.',
    tag: 'Cultural',
  },
  {
    icon: '🏛️',
    title: 'Ancient Wonders',
    desc: "Lalibela's rock-hewn churches, Axum's obelisks, and Gondar's castles await — UNESCO heritage at every turn.",
    tag: 'Heritage',
  },
  {
    icon: '🏔️',
    title: 'Wild Landscapes',
    desc: "From the Simien Mountains to the Danakil Depression — Earth's most dramatic contrasts in a single country.",
    tag: 'Adventure',
  },
  {
    icon: '🦁',
    title: 'Wildlife Safaris',
    desc: 'Spot the Gelada baboon, Ethiopian wolf, and rare endemic species found nowhere else on the planet.',
    tag: 'Nature',
  },
  {
    icon: '🍽️',
    title: 'Culinary Journeys',
    desc: "Injera, tibs, kitfo — Ethiopian cuisine is among the world's most unique. Eat with locals, not menus.",
    tag: 'Food',
  },
  {
    icon: '🛕',
    title: 'Spiritual Trails',
    desc: 'Walk pilgrimage routes, attend ancient Orthodox ceremonies, and experience the spiritual heartbeat of Africa.',
    tag: 'Spirit',
  },
];

const ServicesSection = () => (
  <section id="services" className="bg-[#0c0c0a] py-28 px-8">
    <div className="  mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <p className="text-amber-400 text-xs tracking-[4px] uppercase mb-3">
            What We Offer
          </p>
          <h2
            className="text-white leading-tight"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
            }}
          >
            Experiences crafted
            <br />
            for the curious soul
          </h2>
        </div>
        <p className="text-stone-500 text-sm max-w-sm leading-relaxed md:text-right">
          Every experience is designed with local expertise, cultural
          sensitivity, and a deep love for Ethiopia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-800/40">
        {SERVICES.map(({ icon, title, desc, tag }) => (
          <div
            key={title}
            className="bg-[#0c0c0a] p-8 group hover:bg-stone-900/80 transition-colors duration-300 cursor-pointer relative overflow-hidden"
          >
            {/* Hover accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/60 transition-all duration-500" />

            <div className="flex items-start justify-between mb-6">
              <span className="text-3xl">{icon}</span>
              <span className="text-[10px] tracking-[2px] uppercase text-stone-600 group-hover:text-amber-500/60 transition-colors">
                {tag}
              </span>
            </div>
            <h3
              className="text-white text-xl mb-3 group-hover:text-amber-400 transition-colors duration-300"
              style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
            >
              {title}
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
            <div className="mt-6 flex items-center gap-2 text-amber-500/0 group-hover:text-amber-400/70 transition-all duration-300 text-xs tracking-wider uppercase">
              <span className="w-0 group-hover:w-5 h-px bg-amber-400/70 transition-all duration-300" />
              Learn more
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
