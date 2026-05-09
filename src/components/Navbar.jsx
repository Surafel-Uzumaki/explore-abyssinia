import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/destinations', label: 'Destinations' },
  { path: '/about', label: 'About Ethiopia' },
];

// ── Icons ──────────────────────────────────────────────────────
const Icon = ({ d, size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const ICONS = {
  profile: 'M8 7a3 3 0 100-6 3 3 0 000 6zM2 14a6 6 0 0112 0',
  bookings:
    'M3 3h10a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zM5 7h6M5 10h4',
  settings:
    'M8 10a2 2 0 100-4 2 2 0 000 4zM8 1v1M8 14v1M1 8h1M14 8h1M3.22 3.22l.7.7M12.08 12.08l.7.7M3.22 12.78l.7-.7M12.08 3.92l.7-.7',
  help: 'M8 1a7 7 0 100 14A7 7 0 008 1zM8 11v.5M8 5a2 2 0 011.94 2.5C9.6 8.6 8 9 8 10',
  logout: 'M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6',
  chevron: 'M5 7l3 3 3-3',
};

// ── User Dropdown ──────────────────────────────────────────────
const UserDropdown = ({ user, logout, navigate }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials =
    user.full_name
      ?.split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase() ?? '?';
  const firstName = user.full_name?.split(' ')[0] ?? 'Traveler';

  const menuItems = [
    {
      icon: 'profile',
      label: 'My Profile',
      sub: 'View & edit your info',
      action: () => navigate('/profile'),
    },
    {
      icon: 'bookings',
      label: 'My Bookings',
      sub: 'Trips you have booked',
      action: () => navigate('/bookings'),
    },
    {
      icon: 'settings',
      label: 'Settings',
      sub: 'Preferences & account',
      action: () => navigate('/settings'),
    },
    {
      icon: 'help',
      label: 'Help & Support',
      sub: 'Get assistance',
      action: () => navigate('/help'),
    },
  ];

  return (
    <div ref={ref} className="relative">
      {/* Trigger pill */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full border transition-all duration-150 cursor-pointer bg-transparent
          ${
            open
              ? 'border-amber-500/60 bg-stone-800/60'
              : 'border-white/10 hover:border-white/20 hover:bg-stone-800/40'
          }`}
      >
        {/* Avatar */}
        <div className="w-7 h-7 rounded-full bg-[#1a7a3c] text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0 ring-2 ring-amber-500/30">
          {initials}
        </div>
        <span className="text-[13px] font-medium text-stone-200 hidden sm:block">
          {firstName}
        </span>
        <span
          className={`text-stone-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <Icon d={ICONS.chevron} size={13} />
        </span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-64 bg-stone-900 border border-stone-700/80 rounded-2xl shadow-2xl overflow-hidden z-50">
          {/* User header */}
          <div className="px-4 pt-4 pb-3 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a7a3c] text-white text-sm font-semibold flex items-center justify-center ring-2 ring-amber-500/20 flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-white text-[13px] font-medium truncate">
                  {user.full_name}
                </p>
                <p className="text-stone-500 text-[11px] truncate">
                  {user.phone || user.email || 'Traveler'}
                </p>
              </div>
            </div>
            {/* Flag accent */}
            <div className="flex mt-3 h-[2px] rounded-full overflow-hidden">
              <div className="flex-1 bg-[#1a7a3c]" />
              <div className="flex-1 bg-[#d4a017]" />
              <div className="flex-1 bg-[#b22222]" />
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1.5">
            {menuItems.map(({ icon, label, sub, action }) => (
              <button
                key={label}
                onClick={() => {
                  action();
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-stone-800/70 transition-colors cursor-pointer bg-transparent border-none text-left group"
              >
                <span className="text-stone-500 group-hover:text-amber-400 transition-colors flex-shrink-0">
                  <Icon d={ICONS[icon]} />
                </span>
                <div className="min-w-0">
                  <p className="text-stone-200 text-[13px] font-medium group-hover:text-white transition-colors">
                    {label}
                  </p>
                  <p className="text-stone-600 text-[11px]">{sub}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-stone-800 py-1.5">
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-950/40 transition-colors cursor-pointer bg-transparent border-none text-left group"
            >
              <span className="text-stone-600 group-hover:text-red-400 transition-colors flex-shrink-0">
                <Icon d={ICONS.logout} />
              </span>
              <p className="text-stone-400 text-[13px] font-medium group-hover:text-red-300 transition-colors">
                Sign out
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Navbar ─────────────────────────────────────────────────────
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="bg-stone-950 border-b border-stone-800/60 sticky top-0 z-50">
      {/* Ethiopian flag stripe */}
      <div className="flex h-[3px]">
        <div className="flex-1 bg-[#1a7a3c]" />
        <div className="flex-1 bg-[#d4a017]" />
        <div className="flex-1 bg-[#b22222]" />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 h-[60px] flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer border-none bg-transparent"
        >
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#1a7a3c] via-[#d4a017] to-[#b22222] flex items-center justify-center text-xl flex-shrink-0">
            🇪🇹
          </div>
          <div className="leading-none text-left">
            <span
              className="block text-[15px] font-medium text-stone-100 tracking-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Explore Abyssinia
            </span>
            <span className="block text-[10px] text-stone-500 uppercase tracking-widest">
              Land of Origins
            </span>
          </div>
        </button>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ path, label }) => (
            <a
              key={path}
              href={path}
              className={`text-[13px] px-3.5 py-1.5 rounded-lg transition-colors no-underline whitespace-nowrap
                ${
                  pathname === path
                    ? 'text-amber-400 font-medium bg-amber-500/10'
                    : 'text-stone-400 hover:bg-stone-800 hover:text-stone-100'
                }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {user ? (
            <UserDropdown user={user} logout={logout} navigate={navigate} />
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-[13px] font-medium text-stone-400 px-3.5 py-1.5 rounded-lg border border-stone-700 bg-transparent hover:bg-stone-800 hover:text-stone-100 transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="text-[13px] font-medium text-stone-900 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 border-none transition-colors cursor-pointer"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
