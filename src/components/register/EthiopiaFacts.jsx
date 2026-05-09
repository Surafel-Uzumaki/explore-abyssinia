const FACTS = [
  { icon: '🦁', text: 'Ethiopia is the only African country never colonized.' },
  { icon: '☕', text: "Coffee originated in Ethiopia's Kaffa region." },
  { icon: '🏛️', text: 'Ethiopia has 9 UNESCO World Heritage sites.' },
  {
    icon: '📅',
    text: 'The Ethiopian calendar is 7–8 years behind the Gregorian one.',
  },
  {
    icon: '🦴',
    text: 'Lucy, the famous hominid fossil, was found in Ethiopia in 1974.',
  },
  { icon: '🏃', text: 'Ethiopian runners have won 50+ Olympic gold medals.' },
  {
    icon: '👑',
    text: 'The ancient city of Axum was home to the Queen of Sheba.',
  },
];

const EthiopiaFacts = ({ factIndex }) => (
  <div className="mb-5 bg-black/40 backdrop-blur-md rounded-2xl p-3.5 border border-amber-500/20">
    <div className="flex items-center gap-3">
      <span className="text-2xl">{FACTS[factIndex % FACTS.length].icon}</span>
      <p className="text-amber-100/80 text-xs flex-1 leading-relaxed">
        {FACTS[factIndex % FACTS.length].text}
      </p>
    </div>
    <div className="mt-2 flex gap-1">
      {FACTS.map((_, i) => (
        <div
          key={i}
          className={`h-0.5 rounded-full transition-all duration-500 ${
            i === factIndex % FACTS.length
              ? 'w-5 bg-amber-400'
              : 'w-1.5 bg-white/20'
          }`}
        />
      ))}
    </div>
  </div>
);

export { FACTS };
export default EthiopiaFacts;
