import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/api';
import EthiopiaFacts from '../components/register/EthiopiaFacts';

const BG_IMAGES = [
  'https://images.pexels.com/photos/16641472/pexels-photo-16641472.jpeg', // Danakil
  'https://images.pexels.com/photos/3263784/pexels-photo-3263784.jpeg', // Lalibela
  'https://images.pexels.com/photos/17917322/pexels-photo-17917322.jpeg', // Simien
  'https://images.pexels.com/photos/13160487/pexels-photo-13160487.jpeg', // Lake Tana
];
const BG_LABELS = [
  'Danakil Depression',
  'Lalibela',
  'Simien Mountains',
  'Lake Tana',
];

// ── Eye icon ──────────────────────────────────────────────────
const EyeIcon = ({ show }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {show ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" />
      </>
    )}
  </svg>
);

// ── Phone icon ────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
  </svg>
);

// ── Mail icon ─────────────────────────────────────────────────
const MailIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// ── Login Page ─────────────────────────────────────────────────
const Login = () => {
  const [mode, setMode] = useState('phone'); // 'phone' | 'email'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setFactIndex((i) => i + 1), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setBgIndex((i) => (i + 1) % BG_IMAGES.length),
      8000,
    );
    return () => clearInterval(t);
  }, []);

  // Reset identifier when toggling mode
  const switchMode = (m) => {
    setMode(m);
    setIdentifier('');
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier.trim())
      return setError(
        mode === 'phone' ? 'Enter your phone number' : 'Enter your email',
      );
    if (!password) return setError('Enter your password');
    setLoading(true);
    setError('');
    try {
      const res = await loginUser({ identifier, password });
      authLogin(res.data.user, res.data.accessToken);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Invalid credentials. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    'w-full bg-black/30 border border-white/10 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 text-white placeholder-stone-500 rounded-xl py-3 text-sm outline-none transition-all';

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background images */}
      {BG_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms]"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === bgIndex ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-stone-900/70" />

      {/* Location label */}
      <div className="absolute top-5 left-5 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 border border-amber-500/20">
        <div className="flex gap-1">
          {['bg-[#1a7a3c]', 'bg-[#d4a017]', 'bg-[#b22222]'].map((c, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${c}`} />
          ))}
        </div>
        <span className="text-amber-200/80 text-xs font-medium">
          {BG_LABELS[bgIndex]}
        </span>
      </div>

      {/* Back to home */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-5 right-5 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 hover:border-amber-500/30 text-stone-300 hover:text-white text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer"
      >
        ← Home
      </button>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm mx-4 my-8">
        <EthiopiaFacts factIndex={factIndex} />

        <div className="bg-stone-950/70 backdrop-blur-xl rounded-3xl border border-amber-500/15 shadow-2xl overflow-hidden">
          {/* Flag stripe */}
          <div className="flex h-1">
            <div className="flex-1 bg-[#1a7a3c]" />
            <div className="flex-1 bg-[#d4a017]" />
            <div className="flex-1 bg-[#b22222]" />
          </div>

          <div className="p-7">
            {/* Header */}
            <div className="text-center mb-7">
              <h1
                className="text-3xl text-amber-400 tracking-tight"
                style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
              >
                Welcome Back
              </h1>
              <p className="text-stone-500 text-sm mt-1">
                Sign in to continue your journey
              </p>
            </div>

            {/* Phone / Email toggle */}
            <div className="flex bg-black/30 rounded-xl p-1 mb-6 border border-white/5">
              {[
                { key: 'phone', label: 'Phone', Icon: PhoneIcon },
                { key: 'email', label: 'Email', Icon: MailIcon },
              ].map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => switchMode(key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer border-none
                    ${
                      mode === key
                        ? 'bg-amber-500 text-stone-900 shadow-sm'
                        : 'bg-transparent text-stone-500 hover:text-stone-300'
                    }`}
                >
                  <Icon />
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Identifier field */}
              {mode === 'phone' ? (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none text-sm">
                    🇪🇹
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="+251911234567"
                    className={`${inputCls} pl-9 pr-4`}
                    value={identifier}
                    onChange={(e) => {
                      let v = e.target.value;
                      if (!v.startsWith('+251')) v = '+251';
                      const suffix = v.slice(4).replace(/\D/g, '').slice(0, 9);
                      setIdentifier('+251' + suffix);
                    }}
                  />
                </div>
              ) : (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none">
                    <MailIcon />
                  </span>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={`${inputCls} pl-9 pr-4`}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              )}

              {/* Password */}
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Password"
                  className={`${inputCls} px-4 pr-10`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer p-0"
                >
                  <EyeIcon show={showPw} />
                </button>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs text-stone-500 hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer p-0"
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-900/20 px-4 py-3 rounded-xl border border-red-500/20">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 active:scale-[0.98] disabled:opacity-50 text-stone-900 font-bold py-3 rounded-xl transition-all mt-1 cursor-pointer border-none"
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            {/* Register link */}
            <p className="text-center text-stone-600 text-xs mt-6">
              No account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-amber-400 hover:text-amber-300 transition-colors bg-transparent border-none cursor-pointer p-0 text-xs"
              >
                Create one →
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-stone-700 text-xs mt-5">
          ሰላም ለኢትዮጵያ · Welcome to the Land of Origins
        </p>
      </div>
    </div>
  );
};

export default Login;
