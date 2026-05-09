const SuccessModal = ({ onClose, onStay }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
    <div className="bg-gradient-to-br from-stone-900 to-stone-950 rounded-3xl max-w-sm w-full p-8 border border-amber-500/20 shadow-2xl text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h3 className="text-2xl font-bold text-amber-400 mb-2 font-serif">
        እንኳን ደህና መጣህ!
      </h3>
      <p className="text-stone-400 text-sm mb-6">
        Welcome to Explore Abyssinia! Your Ethiopian adventure begins now.
      </p>
      <div className="flex justify-center gap-2 mb-6">
        {['bg-red-500', 'bg-amber-400', 'bg-green-500'].map((c, i) => (
          <div
            key={i}
            className={`w-2 h-2 ${c} rounded-full animate-pulse`}
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
      <button
        onClick={onClose}
        className="w-full bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold py-3 rounded-xl transition-all mb-2"
      >
        Continue to Login
      </button>
      <button
        onClick={onStay}
        className="w-full text-stone-500 py-2 text-sm hover:text-stone-300 transition-colors"
      >
        Stay on this page
      </button>
    </div>
  </div>
);

export default SuccessModal;
