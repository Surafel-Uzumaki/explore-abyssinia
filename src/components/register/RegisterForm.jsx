import { useState } from 'react';

// ── Validation ────────────────────────────────────────────────
const validators = {
  firstName: (v) =>
    !v.trim()
      ? 'First name is required'
      : v.length < 2
        ? 'Min 2 characters'
        : '',
  lastName: (v) =>
    !v.trim()
      ? 'Last name is required'
      : v.length < 2
        ? 'Min 2 characters'
        : '',
  phone: (v) => {
    // Must match +251XXXXXXXXX (9 digits after +251)
    if (!v) return 'Phone number is required';
    if (!/^\+251[79]\d{8}$/.test(v))
      return 'Format: +251911234567 (9 digits after +251)';
    return '';
  },
  email: (v) =>
    v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Invalid email' : '',
  password: (v) =>
    !v
      ? 'Required'
      : v.length < 6
        ? 'Min 6 characters'
        : !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v)
          ? 'Need uppercase, lowercase & number'
          : '',
  confirmPassword: (v, pw) =>
    !v ? 'Required' : v !== pw ? "Passwords don't match" : '',
};

const Field = ({ error, children }) => (
  <div>
    {children}
    {error && <p className="text-red-400 text-xs mt-1 pl-1">{error}</p>}
  </div>
);

const inputCls =
  'w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white placeholder-stone-500 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 outline-none text-sm transition-all';

const EyeIcon = ({ show }) => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {show ? (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </>
    ) : (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
        />
      </>
    )}
  </svg>
);

// ── Component ─────────────────────────────────────────────────
const RegisterForm = ({ onSuccess, error: apiError, loading }) => {
  const [data, setData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '+251',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errs, setErrs] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);

  const set = (field, val) => {
    setData((d) => ({ ...d, [field]: val }));
    if (errs[field]) setErrs((e) => ({ ...e, [field]: '' }));
  };

  const handlePhoneChange = (val) => {
    // Always keep +251 prefix
    if (!val.startsWith('+251')) return;
    // Only allow digits after prefix, max 9 digits
    const suffix = val.slice(4).replace(/\D/g, '').slice(0, 9);
    set('phone', '+251' + suffix);
  };

  const validate = () => {
    const e = {
      firstName: validators.firstName(data.firstName),
      lastName: validators.lastName(data.lastName),
      phone: validators.phone(data.phone),
      email: validators.email(data.email),
      password: validators.password(data.password),
      confirmPassword: validators.confirmPassword(
        data.confirmPassword,
        data.password,
      ),
    };
    setErrs(e);
    return Object.values(e).every((v) => !v);
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const fullName = [data.firstName, data.middleName, data.lastName]
      .filter(Boolean)
      .join(' ');
    onSuccess({ ...data, fullName });
  };

  return (
    <form onSubmit={submit} className="space-y-3.5">
      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <Field error={errs.firstName}>
          <input
            placeholder="First name"
            className={inputCls}
            value={data.firstName}
            onChange={(e) => set('firstName', e.target.value)}
          />
        </Field>
        <Field error={errs.lastName}>
          <input
            placeholder="Last name"
            className={inputCls}
            value={data.lastName}
            onChange={(e) => set('lastName', e.target.value)}
          />
        </Field>
      </div>

      <input
        placeholder="Middle name (optional)"
        className={inputCls}
        value={data.middleName}
        onChange={(e) => set('middleName', e.target.value)}
      />

      {/* Phone */}
      <Field error={errs.phone}>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 text-sm font-medium pointer-events-none">
            🇪🇹
          </span>
          <input
            placeholder="+251911234567"
            className={`${inputCls} pl-9`}
            value={data.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            inputMode="tel"
          />
        </div>
      </Field>

      {/* Email */}
      <Field error={errs.email}>
        <input
          type="email"
          placeholder="Email (optional)"
          className={inputCls}
          value={data.email}
          onChange={(e) => set('email', e.target.value)}
        />
      </Field>

      {/* Password */}
      <Field error={errs.password}>
        <div className="relative">
          <input
            type={showPw ? 'text' : 'password'}
            placeholder="Password"
            className={`${inputCls} pr-10`}
            value={data.password}
            onChange={(e) => set('password', e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPw((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-400 transition-colors"
          >
            <EyeIcon show={showPw} />
          </button>
        </div>
      </Field>

      {/* Confirm Password */}
      <Field error={errs.confirmPassword}>
        <div className="relative">
          <input
            type={showCPw ? 'text' : 'password'}
            placeholder="Confirm password"
            className={`${inputCls} pr-10`}
            value={data.confirmPassword}
            onChange={(e) => set('confirmPassword', e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowCPw((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-400 transition-colors"
          >
            <EyeIcon show={showCPw} />
          </button>
        </div>
      </Field>

      {apiError && (
        <p className="text-red-400 text-sm bg-red-900/20 p-3 rounded-xl border border-red-500/20">
          {apiError}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-500 hover:bg-amber-400 active:scale-[0.98] disabled:opacity-50 text-stone-900 font-bold py-3 rounded-xl transition-all mt-1"
      >
        {loading ? 'Creating account…' : 'Create Account'}
      </button>

      <p className="text-center text-xs text-stone-600 mt-2">
        By registering you agree to our Terms & Privacy Policy
      </p>
    </form>
  );
};

export default RegisterForm;
