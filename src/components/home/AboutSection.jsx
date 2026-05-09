const AboutSection = () => (
  <section id="about" className="bg-stone-950 py-28 px-8">
    <div className="  mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Image collage */}
      <div className="relative h-[520px] hidden lg:block">
        <img
          src="https://images.pexels.com/photos/13160487/pexels-photo-13160487.jpeg"
          alt="Lake Tana"
          className="absolute top-0 left-0 w-[65%] h-[60%] object-cover rounded-2xl"
        />
        <img
          src="https://images.pexels.com/photos/16641472/pexels-photo-16641472.jpeg"
          alt="Danakil"
          className="absolute bottom-0 right-0 w-[58%] h-[55%] object-cover rounded-2xl"
        />
        {/* Accent box */}
        <div className="absolute bottom-8 left-0 bg-amber-500 rounded-2xl p-6 w-44 z-10 shadow-2xl">
          <p
            className="text-stone-900 text-4xl font-bold"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            10+
          </p>
          <p className="text-stone-800 text-xs uppercase tracking-widest mt-1">
            Years guiding travelers
          </p>
        </div>
        {/* Decorative flag stripe vertical */}
        <div
          className="absolute top-0 bottom-0 right-[calc(58%-8px)] flex flex-col w-1 rounded-full overflow-hidden"
          style={{ height: '40%', top: '30%' }}
        >
          <div className="flex-1 bg-[#1a7a3c]" />
          <div className="flex-1 bg-[#d4a017]" />
          <div className="flex-1 bg-[#b22222]" />
        </div>
      </div>

      {/* Text */}
      <div>
        <p className="text-amber-400 text-xs tracking-[4px] uppercase mb-4">
          Who We Are
        </p>
        <h2
          className="text-white mb-6 leading-tight"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400,
          }}
        >
          We are Ethiopia's premier travel experience
        </h2>
        <p className="text-stone-400 leading-relaxed mb-5 text-[15px]">
          Founded by Ethiopians with a deep love for their homeland, Explore
          Abyssinia connects curious travelers with the authentic soul of this
          ancient land — its people, its landscapes, and its 3,000-year-old
          civilization.
        </p>
        <p className="text-stone-400 leading-relaxed mb-10 text-[15px]">
          We believe travel is transformative. Every itinerary we craft is
          rooted in local knowledge, cultural respect, and a commitment to
          sustainable tourism that benefits the communities you visit.
        </p>
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: 'Local Guides', value: '40+' },
            { label: 'Destinations Covered', value: '60+' },
            { label: 'Happy Travelers', value: '12K+' },
            { label: 'Custom Itineraries', value: '500+' },
          ].map(({ label, value }) => (
            <div key={label} className="border-l-2 border-amber-500/40 pl-4">
              <p
                className="text-amber-400 text-2xl font-semibold"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {value}
              </p>
              <p className="text-stone-500 text-xs uppercase tracking-wider mt-0.5">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
