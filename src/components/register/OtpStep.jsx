import { useRef } from 'react';

const OtpStep = ({
  phone,
  otp,
  setOtp,
  onVerify,
  onBack,
  onResend,
  countdown,
  error,
  loading,
}) => {
  const refs = useRef([]);

  const handleChange = (i, val) => {
    if (val.length > 1) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };

  return (
    <form onSubmit={onVerify} className="space-y-6">
      <div className="text-center">
        <p className="text-stone-400 text-sm">Code sent to</p>
        <p className="text-amber-300 font-semibold text-lg">{phone}</p>
      </div>

      <div className="flex justify-center gap-2">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (refs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`w-11 h-13 text-center text-xl font-bold rounded-xl bg-black/40 border-2 outline-none text-white transition-all
              ${digit ? 'border-amber-400 shadow-amber-500/30 shadow-md' : 'border-white/20 focus:border-amber-500'}`}
          />
        ))}
      </div>

      <div className="text-center text-sm">
        <span className="text-stone-500">Didn't receive it? </span>
        <button
          type="button"
          onClick={onResend}
          disabled={countdown > 0}
          className={`font-medium transition-colors ${countdown > 0 ? 'text-stone-600' : 'text-amber-400 hover:text-amber-300 cursor-pointer'}`}
        >
          Resend {countdown > 0 && `(${countdown}s)`}
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-900/20 p-3 rounded-xl border border-red-500/20">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-900 font-bold py-3 rounded-xl transition-all"
      >
        {loading ? 'Verifying…' : 'Verify & Continue'}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="w-full text-stone-500 text-sm hover:text-stone-300 transition-colors"
      >
        ← Back to registration
      </button>
    </form>
  );
};

export default OtpStep;
