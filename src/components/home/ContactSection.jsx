import { useState } from 'react';

const inputCls = `
  w-full bg-transparent border-b border-stone-700 focus:border-amber-500
  text-white placeholder-stone-600 py-3 text-sm outline-none transition-colors duration-200
`;

const ContactSection = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire to your API here
    setSent(true);
  };

  return (
    <section id="contact" className="bg-[#0c0c0a] py-28 px-8">
      <div className="  mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left */}
        <div>
          <p className="text-amber-400 text-xs tracking-[4px] uppercase mb-4">
            Get In Touch
          </p>
          <h2
            className="text-white leading-tight mb-6"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
            }}
          >
            Plan your journey
            <br />
            with our experts
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed mb-12 max-w-sm">
            Our local guides are ready to craft a bespoke Ethiopian experience
            just for you. Reach out and we'll respond within 24 hours.
          </p>

          <div className="space-y-6">
            {[
              {
                icon: '📍',
                label: 'Address',
                value: 'Bole Road, Addis Ababa, Ethiopia',
              },
              { icon: '📞', label: 'Phone', value: '+251 91 123 4567' },
              {
                icon: '✉️',
                label: 'Email',
                value: 'hello@exploreabyssinia.et',
              },
              { icon: '🕐', label: 'Hours', value: 'Mon – Sat, 8am – 6pm EAT' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="text-lg mt-0.5">{icon}</span>
                <div>
                  <p className="text-stone-600 text-xs uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <p className="text-stone-300 text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div>
          {sent ? (
            <div className="border border-amber-500/20 rounded-2xl p-10 text-center">
              <p className="text-4xl mb-4">🇪🇹</p>
              <p
                className="text-amber-400 text-lg mb-2"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {' '}
                እናመሰግናለን!
              </p>
              <p className="text-stone-400 text-sm">
                Thank you for reaching out. We'll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="text-stone-600 text-xs uppercase tracking-widest block mb-1">
                    Name
                  </label>
                  <input
                    required
                    placeholder="Your full name"
                    className={inputCls}
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="text-stone-600 text-xs uppercase tracking-widest block mb-1">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    className={inputCls}
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-stone-600 text-xs uppercase tracking-widest block mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your dream Ethiopian trip…"
                  className={`${inputCls} resize-none`}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                />
              </div>
              <button
                type="submit"
                className="group flex items-center gap-4 cursor-pointer bg-transparent border-none p-0"
              >
                <span className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold text-sm px-8 py-3.5 rounded-full transition-colors">
                  Send Message
                </span>
                <span className="text-stone-600 text-xs tracking-widest uppercase group-hover:text-amber-400 transition-colors">
                  We'll reply in 24h
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
