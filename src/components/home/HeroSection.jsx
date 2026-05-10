import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/img22.jpg';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto px-8 pb-10 w-full">
        <p className="text-amber-400 text-sm font-medium tracking-[4px] uppercase mb-4">
          Land of Origins
        </p>

        <h1
          className="text-white mb-6 leading-none"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            fontWeight: 400,
            letterSpacing: '-1px',
          }}
        >
          Explore
          <br />
          <em
            className="text-amber-400 not-italic"
            style={{ fontStyle: 'italic' }}
          >
            Abyssinia
          </em>
        </h1>

        <p className="text-stone-300 text-lg mb-10 max-w-xl leading-relaxed">
          From the rock-hewn churches of Lalibela to the volcanic wonders of
          Danakil — discover a civilization older than time.
        </p>

        <div className="flex flex-wrap gap-4 items-center">
          <button
            onClick={() => navigate('/destinations')}
            className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm tracking-wide cursor-pointer border-none"
          >
            Explore Destinations
          </button>

          <a
            href="#about"
            className="text-white/70 hover:text-white text-sm tracking-wide flex items-center gap-2 transition-colors no-underline group"
          >
            <span className="w-8 h-px bg-white/40 group-hover:w-12 group-hover:bg-white transition-all duration-300" />
            Our Story
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-16 flex flex-wrap gap-10">
          {[
            { n: '9', label: 'UNESCO Sites' },
            { n: '3,000+', label: 'Years of History' },
            { n: '80+', label: 'Languages Spoken' },
            { n: '50+', label: 'Olympic Gold Medals' },
          ].map(({ n, label }) => (
            <div key={label}>
              <p
                className="text-amber-400 text-2xl font-semibold"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {n}
              </p>
              <p className="text-stone-400 text-xs tracking-widest uppercase mt-0.5">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-amber-400/60" />
        <p className="text-stone-500 text-[10px] tracking-[3px] uppercase rotate-90 origin-center translate-x-4">
          Scroll
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
