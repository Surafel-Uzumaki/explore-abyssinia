import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { updateProfile } from '../api/api';
import {
  FiArrowLeft,
  FiEdit2,
  FiSave,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';

// ── Reusable input field ───────────────────────────────────────
const Field = ({ label, icon: Icon, error, children }) => (
  <div>
    <label className="flex items-center gap-1.5 text-stone-500 text-xs uppercase tracking-widest mb-2">
      <Icon size={11} />
      {label}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1.5 pl-1">{error}</p>}
  </div>
);

const inputCls = (disabled) =>
  `w-full bg-black/30 border rounded-xl px-4 py-3 text-sm outline-none transition-all text-white placeholder-stone-600
  ${
    disabled
      ? 'border-white/5 text-stone-500 cursor-not-allowed opacity-60'
      : 'border-white/10 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30'
  }`;

// ── Toast ──────────────────────────────────────────────────────
const Toast = ({ msg, type, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-medium
      ${type === 'success' ? 'bg-[#1a7a3c] text-white' : 'bg-red-700 text-white'}`}
    >
      {type === 'success' ? '✓' : '✕'} {msg}
    </div>
  );
};

// ── Profile Page ───────────────────────────────────────────────
const Profile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showPwSection, setShowPwSection] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    full_name: user?.full_name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
  });
  const [newPassword, setNewPassword] = useState('');

  const initials =
    user?.full_name
      ?.split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase() ?? '?';

  const validate = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = 'Full name is required';
    if (!form.phone) e.phone = 'Phone number is required';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Invalid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await updateProfile(form);
      const updatedUser = { ...user, ...res.data.user };
      login(updatedUser, localStorage.getItem('accessToken'));
      setToast({ msg: 'Profile updated successfully!', type: 'success' });
      setIsEditing(false);
    } catch (err) {
      setToast({
        msg: err.response?.data?.message || 'Failed to update profile',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setErrors({});
    setForm({
      full_name: user?.full_name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    });
  };

  if (!user)
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-950">
      <Navbar />

      {/* Page header */}
      <div className="border-b border-stone-800/60">
        <div className="max-w-2xl mx-auto px-6 py-10 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-stone-500 hover:text-white text-sm border border-stone-800 hover:border-stone-600 px-3 py-2 rounded-xl bg-transparent transition-colors cursor-pointer"
          >
            <FiArrowLeft size={14} /> Back
          </button>
          <div>
            <p className="text-amber-400 text-xs tracking-[3px] uppercase mb-0.5">
              Account
            </p>
            <h1
              className="text-white text-2xl"
              style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
            >
              My Profile
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
        {/* ── Avatar card ── */}
        <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 flex items-center gap-5">
          <div className="relative flex-shrink-0">
            <div
              className="w-20 h-20 rounded-2xl bg-[#1a7a3c] text-white text-2xl font-semibold flex items-center justify-center ring-2 ring-amber-500/20"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {initials}
            </div>
            {/* Flag stripe on avatar */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex h-1 w-12 rounded-full overflow-hidden">
              <div className="flex-1 bg-[#1a7a3c]" />
              <div className="flex-1 bg-[#d4a017]" />
              <div className="flex-1 bg-[#b22222]" />
            </div>
          </div>
          <div className="min-w-0">
            <h2
              className="text-white text-xl font-medium truncate"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {user.full_name}
            </h2>
            <p className="text-stone-500 text-sm mt-0.5 truncate">
              {user.email || user.phone}
            </p>
            <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-amber-400/70 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              🇪🇹 Ethiopian Traveler
            </span>
          </div>
        </div>

        {/* ── Profile form card ── */}
        <div className="bg-stone-900/50 border border-stone-800 rounded-2xl overflow-hidden">
          {/* Card header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800">
            <div className="flex items-center gap-2 text-stone-300 text-sm font-medium">
              <FiUser size={14} className="text-amber-400" />
              Personal Information
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 border border-amber-500/30 hover:border-amber-400/50 px-3 py-1.5 rounded-lg bg-transparent transition-colors cursor-pointer"
              >
                <FiEdit2 size={11} /> Edit
              </button>
            )}
          </div>

          <form onSubmit={handleUpdate} className="p-6 space-y-5">
            <Field label="Full Name" icon={FiUser} error={errors.full_name}>
              <input
                className={inputCls(!isEditing)}
                value={form.full_name}
                disabled={!isEditing}
                onChange={(e) =>
                  setForm((f) => ({ ...f, full_name: e.target.value }))
                }
                placeholder="Your full name"
              />
            </Field>

            <Field label="Email Address" icon={FiMail} error={errors.email}>
              <input
                type="email"
                className={inputCls(!isEditing)}
                value={form.email}
                disabled={!isEditing}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="your@email.com (optional)"
              />
            </Field>

            <Field label="Phone Number" icon={FiPhone} error={errors.phone}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none text-sm">
                  🇪🇹
                </span>
                <input
                  className={`${inputCls(!isEditing)} pl-9`}
                  value={form.phone}
                  disabled={!isEditing}
                  onChange={(e) => {
                    let v = e.target.value;
                    if (!v.startsWith('+251')) v = '+251';
                    const suffix = v.slice(4).replace(/\D/g, '').slice(0, 9);
                    setForm((f) => ({ ...f, phone: '+251' + suffix }));
                  }}
                  placeholder="+251911234567"
                />
              </div>
            </Field>

            {isEditing && (
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex-1 flex items-center justify-center gap-2 text-sm text-stone-400 border border-stone-700 hover:border-stone-500 hover:text-stone-200 py-2.5 rounded-xl bg-transparent transition-colors cursor-pointer"
                >
                  <FiX size={14} /> Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-stone-900 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 py-2.5 rounded-xl transition-colors cursor-pointer border-none"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <FiSave size={14} /> Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* ── Security card ── */}
        <div className="bg-stone-900/50 border border-stone-800 rounded-2xl overflow-hidden">
          <div
            className="flex items-center justify-between px-6 py-4 border-b border-stone-800 cursor-pointer"
            onClick={() => setShowPwSection((p) => !p)}
          >
            <div className="flex items-center gap-2 text-stone-300 text-sm font-medium">
              <FiShield size={14} className="text-amber-400" />
              Security
            </div>
            <span
              className={`text-stone-600 transition-transform duration-200 ${showPwSection ? 'rotate-180' : ''}`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M6 9l6 6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {showPwSection && (
            <div className="p-6 space-y-4">
              <p className="text-stone-500 text-xs">
                Enter a new password below. Must be at least 6 characters with
                uppercase, lowercase, and a number.
              </p>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="New password"
                  className={`${inputCls(false)} pr-10`}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-400 bg-transparent border-none cursor-pointer transition-colors"
                >
                  {showPw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
              <button
                onClick={() =>
                  setToast({
                    msg: 'Change password feature coming soon',
                    type: 'success',
                  })
                }
                className="text-sm font-medium text-stone-900 bg-amber-500 hover:bg-amber-400 px-5 py-2.5 rounded-xl border-none cursor-pointer transition-colors"
              >
                Update Password
              </button>
            </div>
          )}
        </div>

        {/* Amharic footer */}
        <p className="text-center text-stone-700 text-xs pb-4">
          ሰላም ለኢትዮጵያ · Explore Abyssinia
        </p>
      </div>

      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Profile;
