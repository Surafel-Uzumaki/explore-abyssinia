import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { getAllDestinations, createBooking } from '../api/api';

// ── Toast ─────────────────────────────────────────────────────
const Toast = ({ msg, type, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-medium transition-all
      ${type === 'success' ? 'bg-[#1a7a3c] text-white' : type === 'warning' ? 'bg-amber-500 text-stone-900' : 'bg-red-700 text-white'}`}
    >
      <span>{type === 'success' ? '✓' : type === 'warning' ? '⚠' : '✕'}</span>
      {msg}
    </div>
  );
};

// ── Calendar Range Picker ─────────────────────────────────────
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const toKey = (d) =>
  d ? `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` : '';
const sameDay = (a, b) => a && b && toKey(a) === toKey(b);
const isBetween = (d, start, end) => start && end && d > start && d < end;
const isBefore = (a, b) => a && b && a < b;

const CalendarRangePicker = ({ departure, returnDate, onChange }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [hovered, setHovered] = useState(null);
  // picking: 'start' → next click sets departure; 'end' → next click sets return
  const [picking, setPicking] = useState(departure ? 'end' : 'start');

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else setViewMonth((m) => m + 1);
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : new Date(viewYear, viewMonth, i - firstDay + 1),
  );

  const handleClick = (day) => {
    if (!day || day < today) return;
    if (picking === 'start' || !departure) {
      onChange(day, null);
      setPicking('end');
    } else {
      if (isBefore(day, departure) || sameDay(day, departure)) {
        onChange(day, null);
        setPicking('end');
      } else {
        onChange(departure, day);
        setPicking('start');
      }
    }
  };

  const effectiveEnd =
    picking === 'end' && hovered && departure && hovered > departure
      ? hovered
      : returnDate;

  const nights =
    departure && returnDate
      ? Math.round((returnDate - departure) / 86400000)
      : null;

  return (
    <div>
      {/* Selected range display */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`flex-1 rounded-xl px-3 py-2.5 border text-center transition-colors ${picking === 'start' ? 'border-amber-500 bg-amber-500/10' : 'border-stone-700 bg-stone-900'}`}
        >
          <p className="text-stone-500 text-[10px] uppercase tracking-widest mb-0.5">
            Departure
          </p>
          <p
            className={`text-sm font-medium ${departure ? 'text-white' : 'text-stone-600'}`}
          >
            {departure
              ? `${MONTHS[departure.getMonth()].slice(0, 3)} ${departure.getDate()}, ${departure.getFullYear()}`
              : 'Select'}
          </p>
        </div>
        <div className="text-stone-600 flex flex-col items-center">
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path
              d="M1 6h18M13 1l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {nights && (
            <span className="text-[10px] text-amber-400 mt-0.5">{nights}n</span>
          )}
        </div>
        <div
          className={`flex-1 rounded-xl px-3 py-2.5 border text-center transition-colors ${picking === 'end' && departure ? 'border-amber-500 bg-amber-500/10' : 'border-stone-700 bg-stone-900'}`}
        >
          <p className="text-stone-500 text-[10px] uppercase tracking-widest mb-0.5">
            Return <span className="text-stone-700 normal-case">(opt)</span>
          </p>
          <p
            className={`text-sm font-medium ${returnDate ? 'text-white' : 'text-stone-600'}`}
          >
            {returnDate
              ? `${MONTHS[returnDate.getMonth()].slice(0, 3)} ${returnDate.getDate()}, ${returnDate.getFullYear()}`
              : 'Select'}
          </p>
        </div>
      </div>

      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-white bg-transparent border-none cursor-pointer rounded-lg hover:bg-stone-800 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 2L4 7l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="text-white text-sm font-medium">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-white bg-transparent border-none cursor-pointer rounded-lg hover:bg-stone-800 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 2l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] text-stone-600 uppercase tracking-wider py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const isPast = day < today;
          const isStart = sameDay(day, departure);
          const isEnd = sameDay(day, returnDate);
          const inRange = isBetween(day, departure, effectiveEnd);
          const isHoverEnd =
            picking === 'end' &&
            departure &&
            sameDay(day, hovered) &&
            hovered > departure;

          return (
            <div
              key={i}
              onClick={() => handleClick(day)}
              onMouseEnter={() => setHovered(day)}
              onMouseLeave={() => setHovered(null)}
              className={`
                relative h-8 flex items-center justify-center text-xs cursor-pointer select-none transition-colors
                ${isPast ? 'text-stone-700 cursor-not-allowed' : ''}
                ${isStart || isEnd ? 'text-stone-900 font-semibold z-10' : ''}
                ${inRange ? 'bg-amber-500/15 text-amber-200' : ''}
                ${isHoverEnd && !returnDate ? 'text-stone-900 font-semibold' : ''}
                ${!isStart && !isEnd && !inRange && !isPast && !isHoverEnd ? 'text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg' : ''}
              `}
              style={{
                borderRadius: isStart
                  ? '8px 0 0 8px'
                  : isEnd
                    ? '0 8px 8px 0'
                    : undefined,
              }}
            >
              {/* Amber circle for start/end/hoverEnd */}
              {(isStart || isEnd || isHoverEnd) && (
                <span className="absolute inset-0 bg-amber-500 rounded-lg z-[-1]" />
              )}
              {day.getDate()}
            </div>
          );
        })}
      </div>

      {/* Reset link */}
      {(departure || returnDate) && (
        <button
          onClick={() => {
            onChange(null, null);
            setPicking('start');
          }}
          className="mt-3 text-stone-600 hover:text-stone-400 text-xs bg-transparent border-none cursor-pointer p-0 transition-colors"
        >
          Clear dates
        </button>
      )}
    </div>
  );
};

// ── Booking Modal ─────────────────────────────────────────────
const BookingModal = ({ dest, onClose, onConfirm }) => {
  const [departure, setDeparture] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [people, setPeople] = useState(1);
  const total = (dest.price * people).toFixed(2);

  const handleRangeChange = (dep, ret) => {
    setDeparture(dep);
    setReturnDate(ret);
  };
  const toISO = (d) => (d ? d.toISOString().split('T')[0] : '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-stone-950 border border-stone-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        {/* Header image */}
        <div
          className="relative h-32 bg-cover bg-center flex-shrink-0"
          style={{
            backgroundImage: `url(${dest.image_url || `https://picsum.photos/id/${dest.id}/800/600`})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors border-none cursor-pointer text-lg leading-none"
          >
            ×
          </button>
          <div className="absolute bottom-4 left-6">
            <p className="text-amber-400 text-xs tracking-[3px] uppercase mb-0.5">
              Booking
            </p>
            <h3
              className="text-white text-lg font-medium"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {dest.title}
            </h3>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Range calendar */}
          <div>
            <p className="text-stone-500 text-xs uppercase tracking-widest mb-3">
              Select Your Dates
            </p>
            <CalendarRangePicker
              departure={departure}
              returnDate={returnDate}
              onChange={handleRangeChange}
            />
          </div>

          {/* Travelers */}
          <div className="border-t border-stone-800 pt-5">
            <p className="text-stone-500 text-xs uppercase tracking-widest mb-3">
              Travelers
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPeople((p) => Math.max(1, p - 1))}
                className="w-10 h-10 rounded-full border border-stone-700 text-white bg-transparent hover:border-amber-500 hover:text-amber-400 transition-colors cursor-pointer text-lg flex items-center justify-center"
              >
                −
              </button>
              <span
                className="text-white text-xl font-medium w-8 text-center"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {people}
              </span>
              <button
                onClick={() => setPeople((p) => p + 1)}
                className="w-10 h-10 rounded-full border border-stone-700 text-white bg-transparent hover:border-amber-500 hover:text-amber-400 transition-colors cursor-pointer text-lg flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Total + confirm */}
          <div className="border-t border-stone-800 pt-5 flex items-center justify-between">
            <div>
              <p className="text-stone-500 text-xs uppercase tracking-widest">
                Total
              </p>
              <p
                className="text-amber-400 text-3xl font-semibold mt-0.5"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                ${total}
              </p>
              <p className="text-stone-600 text-xs mt-0.5">
                {people} person{people > 1 ? 's' : ''} × ${dest.price}
              </p>
            </div>
            <button
              onClick={() =>
                onConfirm(
                  {
                    departure_date: toISO(departure),
                    return_date: toISO(returnDate),
                    people,
                  },
                  total,
                )
              }
              className="bg-amber-500 hover:bg-amber-400 active:scale-[0.97] text-stone-900 font-semibold text-sm px-7 py-3 rounded-full transition-all cursor-pointer border-none"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Destination Card ──────────────────────────────────────────
const DestCard = ({ dest, onBook }) => (
  <div className="group bg-stone-900/50 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 flex flex-col">
    <div className="relative h-56 overflow-hidden">
      <img
        src={dest.image_url || `https://picsum.photos/id/${dest.id}/800/600`}
        alt={dest.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
      {/* Duration pill */}
      <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-amber-400 text-xs px-3 py-1 rounded-full tracking-wide">
        {dest.duration}
      </span>
    </div>

    <div className="p-6 flex flex-col flex-1">
      <p className="text-stone-500 text-xs tracking-widest uppercase mb-1">
        {dest.location}
      </p>
      <h3
        className="text-white text-xl mb-3 group-hover:text-amber-400 transition-colors duration-300"
        style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
      >
        {dest.title}
      </h3>
      <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 flex-1">
        {dest.description}
      </p>

      <div className="flex items-end justify-between mt-6 pt-5 border-t border-stone-800">
        <div>
          <span
            className="text-amber-400 text-2xl font-semibold"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            ${dest.price}
          </span>
          <span className="text-stone-600 text-xs ml-1">/ person</span>
        </div>
        <button
          onClick={() => onBook(dest)}
          className="bg-transparent border border-amber-500/50 hover:bg-amber-500 hover:border-amber-500 text-amber-400 hover:text-stone-900 font-medium text-xs px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
);

// ── Skeleton loader ───────────────────────────────────────────
const Skeleton = () => (
  <div className="bg-stone-900/50 border border-stone-800 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-56 bg-stone-800" />
    <div className="p-6 space-y-3">
      <div className="h-3 w-20 bg-stone-800 rounded" />
      <div className="h-5 w-3/4 bg-stone-800 rounded" />
      <div className="h-3 w-full bg-stone-800 rounded" />
      <div className="h-3 w-5/6 bg-stone-800 rounded" />
      <div className="h-3 w-2/3 bg-stone-800 rounded" />
    </div>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────
const Destinations = () => {
  const { user } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => setToast({ msg, type });

  useEffect(() => {
    getAllDestinations()
      .then((res) => setDestinations(res.data))
      .catch(() => showToast('Failed to load destinations', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const openModal = (dest) => {
    if (!user)
      return showToast('Please login to book a destination', 'warning');
    setSelected(dest);
  };

  const handleConfirm = async (form, total) => {
    if (!form.departure_date)
      return showToast('Please select a departure date', 'error');
    try {
      await createBooking({
        destination_id: selected.id,
        departure_date: form.departure_date,
        return_date: form.return_date || null,
        people: form.people,
        total_price: parseFloat(total),
        user_id: user.id,
      });
      setSelected(null);
      showToast('Booking confirmed! SMS sent to your phone.', 'success');
    } catch {
      showToast('Booking failed. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-stone-950">
      <Navbar />

      {/* Page header */}
      <div className="relative overflow-hidden border-b border-stone-800/60">
        <div className="  mx-auto px-8 py-20">
          <p className="text-amber-400 text-xs tracking-[4px] uppercase mb-4">
            Where to Go
          </p>
          <h1
            className="text-white leading-none mb-4"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 400,
            }}
          >
            Discover Ethiopia
          </h1>
          <p className="text-stone-500 text-base max-w-lg leading-relaxed">
            Cradle of Mankind · Ancient Wonders · 9 UNESCO Heritage Sites. Every
            destination tells a story older than civilization itself.
          </p>
        </div>
        {/* Decorative */}
        <p
          className="absolute right-8 top-1/2 -translate-y-1/2 text-stone-900 select-none pointer-events-none hidden lg:block"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '9rem',
            fontWeight: 700,
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          ET
        </p>
      </div>

      {/* Grid */}
      <div className="  mx-auto px-8 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-stone-600 text-5xl mb-4">🌍</p>
            <p className="text-stone-500">No destinations found yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <DestCard key={dest.id} dest={dest} onBook={openModal} />
            ))}
          </div>
        )}
      </div>

      {/* Flag stripe footer accent */}
      <div className="flex h-1">
        <div className="flex-1 bg-[#1a7a3c]" />
        <div className="flex-1 bg-[#d4a017]" />
        <div className="flex-1 bg-[#b22222]" />
      </div>

      {selected && (
        <BookingModal
          dest={selected}
          onClose={() => setSelected(null)}
          onConfirm={handleConfirm}
        />
      )}

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

export default Destinations;
