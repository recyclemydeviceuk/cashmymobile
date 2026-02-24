import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, AlertCircle, ArrowLeft, RefreshCw, ShieldCheck } from 'lucide-react';

const ADMIN_EMAIL = 'recyclemydeviceuk@gmail.com';
const MOCK_OTP = '123456';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const startResendTimer = () => {
    setResendTimer(30);
    timerRef.current = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) { clearInterval(timerRef.current!); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      setError('This email is not authorised to access the admin panel.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setStep('otp');
    startResendTimer();
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    setError('');
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (text.length === 6) {
      setOtp(text.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter the full 6-digit code.'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    if (code === MOCK_OTP) {
      localStorage.setItem('admin_auth', 'true');
      navigate('/admin-cashmymobile');
    } else {
      setError('Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    }
    setLoading(false);
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setOtp(['', '', '', '', '', '']);
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    startResendTimer();
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://res.cloudinary.com/dn2sab6qc/image/upload/v1771700003/Cashmymobile_logo_y7ndez.png"
              alt="Cash My Mobile"
              className="h-10 w-auto object-contain brightness-0 invert mb-4"
            />
            <p className="text-sm text-gray-500">
              {step === 'email' ? 'Sign in with your email OTP' : 'Enter the code we sent you'}
            </p>
          </div>

          {/* ── Step 1: Email ── */}
          {step === 'email' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                    placeholder="Enter your admin email"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-900/20 border border-red-800/40 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /> Sending OTP...</>
                ) : (
                  <><Mail className="w-4 h-4" /> Send OTP</>
                )}
              </button>
            </form>
          )}

          {/* ── Step 2: OTP ── */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <button type="button" onClick={() => { setStep('email'); setError(''); setOtp(['', '', '', '', '', '']); }} className="text-gray-500 hover:text-gray-300 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <p className="text-sm text-gray-400">
                    Code sent to <span className="text-white font-semibold">{email}</span>
                  </p>
                </div>

                {/* 6-digit OTP boxes */}
                <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => { inputRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      className={`w-11 h-13 text-center text-xl font-bold bg-gray-800 border rounded-xl text-white focus:outline-none transition-all
                        ${digit ? 'border-red-500 bg-gray-700' : 'border-gray-700'}
                        focus:border-red-500 focus:ring-2 focus:ring-red-500/20`}
                      style={{ height: '52px' }}
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-900/20 border border-red-800/40 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || otp.join('').length < 6}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /> Verifying...</>
                ) : (
                  <><ShieldCheck className="w-4 h-4" /> Verify & Sign In</>
                )}
              </button>

              {/* Resend */}
              <p className="text-center text-xs text-gray-500">
                Didn't receive the code?{' '}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                  className={`font-semibold transition-colors ${resendTimer > 0 ? 'text-gray-600 cursor-not-allowed' : 'text-red-500 hover:text-red-400'}`}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                </button>
              </p>
            </form>
          )}

          <p className="text-center text-xs text-gray-700 mt-6">
            Demo OTP: <span className="font-mono text-gray-500">123456</span>
          </p>
        </div>
      </div>
    </div>
  );
}
