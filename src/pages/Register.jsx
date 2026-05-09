import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, verifyOtp } from '../api/api';
import RegisterForm from '../components/register/RegisterForm';
import OtpStep from '../components/register/OtpStep';
import SuccessModal from '../components/register/SuccessModal';
import EthiopiaFacts from '../components/register/EthiopiaFacts';

// High-quality Ethiopian background images (rotate every 8s)
const BG_IMAGES = [
  'https://images.pexels.com/photos/3263784/pexels-photo-3263784.jpeg', // Lalibela
  'https://images.pexels.com/photos/17917322/pexels-photo-17917322.jpeg', // Simien Mts
  'https://images.pexels.com/photos/16641472/pexels-photo-16641472.jpeg', // Danakil
  'https://images.pexels.com/photos/13160487/pexels-photo-13160487.jpeg', // Lake Tana
];

const BG_LABELS = [
  'Lalibela',
  'Simien Mountains',
  'Danakil Depression',
  'Lake Tana',
];

export default function Register() {
  const [step, setStep] = useState('form'); // 'form' | 'otp'
  const [formData, setFormData] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

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

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Called by RegisterForm on valid submit
  const handleFormSuccess = async (data) => {
    setLoading(true);
    setError('');
    try {
      await registerUser({
        full_name: data.fullName,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });
      setFormData(data);
      setStep('otp');
      setCountdown(60);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) return setError('Enter the 6-digit code');
    setLoading(true);
    setError('');
    try {
      await verifyOtp({
        phone: formData.phone,
        otp: code,
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      setShowSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setOtp(['', '', '', '', '', '']);
    setLoading(true);
    try {
      await registerUser({
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });
      setCountdown(60);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* ── Full-page background image ── */}
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
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-stone-900/70" />

      {/* Location label */}
      <div className="absolute top-5 left-5 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 border border-amber-500/20">
        <div className="flex gap-1">
          {['bg-red-500', 'bg-amber-400', 'bg-green-500'].map((c, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${c}`} />
          ))}
        </div>
        <span className="text-amber-200/80 text-xs font-medium">
          {BG_LABELS[bgIndex]}
        </span>
      </div>

      {/* ── Main card ── */}
      <div className="relative z-10 w-full max-w-md mx-4 my-8">
        <EthiopiaFacts factIndex={factIndex} />

        <div className="bg-stone-950/70 backdrop-blur-xl rounded-3xl border border-amber-500/15 shadow-2xl overflow-hidden">
          {/* Decorative top bar — Ethiopian flag stripe */}
          <div className="flex h-1">
            <div className="flex-1 bg-red-600" />
            <div className="flex-1 bg-amber-400" />
            <div className="flex-1 bg-green-600" />
          </div>

          <div className="p-7 sm:p-9">
            {/* Header */}
            <div className="text-center mb-7">
              <h1
                className="text-3xl font-bold text-amber-400 tracking-tight"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Explore Abyssinia
              </h1>
              <p className="text-stone-400 text-sm mt-1">
                {step === 'form'
                  ? 'Begin your Ethiopian journey'
                  : 'Verify your identity'}
              </p>
            </div>

            {step === 'form' ? (
              <RegisterForm
                onSuccess={handleFormSuccess}
                error={error}
                loading={loading}
              />
            ) : (
              <OtpStep
                phone={formData?.phone}
                otp={otp}
                setOtp={setOtp}
                onVerify={handleVerify}
                onBack={() => {
                  setStep('form');
                  setOtp(['', '', '', '', '', '']);
                  setError('');
                }}
                onResend={handleResend}
                countdown={countdown}
                error={error}
                loading={loading}
              />
            )}
          </div>
        </div>

        <p className="text-center text-stone-600 text-xs mt-5">
          ሰላም ለኢትዮጵያ · Welcome to the Land of Origins
        </p>
      </div>

      {showSuccess && (
        <SuccessModal
          onClose={() => {
            setShowSuccess(false);
            navigate('/login');
          }}
          onStay={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}
